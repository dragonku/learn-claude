#!/usr/bin/env node

/**
 * 학습 통계 분석 스크립트
 * Git 히스토리와 CLAUDE.md를 분석하여 상세한 학습 통계를 생성합니다
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 상수 정의
const MODULE_NAMES = {
  1: 'Module 1: 기초 설정',
  2: 'Module 2: 핵심 기능',
  3: 'Module 3: 컨텍스트 관리',
  4: 'Module 4: 고급 기능',
  5: 'Module 5: 확장 기능',
  6: 'Module 6: 팀 도입 전략',
  7: 'Module 7: Skills 활용',
  8: 'Module 8: Sub-Agent 아키텍처'
};

/**
 * Git 커밋 히스토리에서 모듈 완료 정보 추출
 * @returns {Array<{module: number, date: string, message: string}>}
 */
function getModuleCompletionHistory() {
  try {
    const gitLog = execSync(
      'git log --all --grep="Module" --pretty=format:"%ad|%s" --date=short',
      { encoding: 'utf-8', cwd: __dirname }
    );

    const commits = gitLog.trim().split('\n').filter(Boolean);
    const completions = [];

    for (const commit of commits) {
      const [date, message] = commit.split('|');
      const moduleMatch = message.match(/Module\s+(\d+)/i);

      if (moduleMatch && message.toLowerCase().includes('complete')) {
        completions.push({
          module: parseInt(moduleMatch[1]),
          date: date,
          message: message
        });
      }
    }

    return completions.sort((a, b) => a.module - b.module);
  } catch (error) {
    return [];
  }
}

/**
 * 학습 일수 계산
 * @returns {{totalDays: number, activeDays: number, startDate: string, lastDate: string}}
 */
function calculateLearningDays() {
  try {
    const dates = execSync(
      'git log --all --format="%ad" --date=short | sort -u',
      { encoding: 'utf-8', cwd: __dirname }
    ).trim().split('\n').filter(Boolean);

    if (dates.length === 0) {
      return { totalDays: 0, activeDays: 0, startDate: null, lastDate: null };
    }

    const startDate = new Date(dates[0]);
    const lastDate = new Date(dates[dates.length - 1]);
    const totalDays = Math.ceil((lastDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    return {
      totalDays,
      activeDays: dates.length,
      startDate: dates[0],
      lastDate: dates[dates.length - 1]
    };
  } catch (error) {
    return { totalDays: 0, activeDays: 0, startDate: null, lastDate: null };
  }
}

/**
 * 평균 모듈 완료 시간 계산 (일 단위)
 * @param {Array} completions 모듈 완료 기록
 * @returns {number} 평균 일수
 */
function calculateAverageModuleTime(completions) {
  if (completions.length < 2) return 0;

  const intervals = [];
  for (let i = 1; i < completions.length; i++) {
    const prev = new Date(completions[i - 1].date);
    const curr = new Date(completions[i].date);
    const days = Math.ceil((curr - prev) / (1000 * 60 * 60 * 24));
    intervals.push(days);
  }

  return intervals.length > 0
    ? intervals.reduce((sum, val) => sum + val, 0) / intervals.length
    : 0;
}

/**
 * 완료 예상일 계산
 * @param {number} remainingModules 남은 모듈 수
 * @param {number} avgDays 평균 소요 일수
 * @param {string} lastDate 마지막 활동 날짜
 * @returns {string} 예상 완료일
 */
function estimateCompletionDate(remainingModules, avgDays, lastDate) {
  if (remainingModules === 0) return '완료됨';
  if (avgDays === 0 || !lastDate) return '추정 불가';

  const last = new Date(lastDate);
  const estimatedDays = Math.ceil(remainingModules * avgDays);
  const completionDate = new Date(last.getTime() + estimatedDays * 24 * 60 * 60 * 1000);

  return completionDate.toISOString().split('T')[0];
}

/**
 * 최근 커밋 내역 가져오기
 * @param {number} limit 가져올 커밋 수
 * @returns {Array<{date: string, message: string}>}
 */
function getRecentCommits(limit = 5) {
  try {
    const commits = execSync(
      `git log --all -${limit} --pretty=format:"%ad|%s" --date=short`,
      { encoding: 'utf-8', cwd: __dirname }
    ).trim().split('\n').filter(Boolean);

    return commits.map(commit => {
      const [date, message] = commit.split('|');
      return { date, message };
    });
  } catch (error) {
    return [];
  }
}

/**
 * 진행률별 진행 바 생성
 * @param {number} completed 완료 수
 * @param {number} total 전체 수
 * @param {number} width 진행 바 너비
 * @returns {string} 진행 바 문자열
 */
function createProgressBar(completed, total, width = 20) {
  const percentage = (completed / total) * 100;
  const filledWidth = Math.floor((completed / total) * width);
  const emptyWidth = width - filledWidth;

  const filled = '█'.repeat(filledWidth);
  const empty = '░'.repeat(emptyWidth);

  return `[${filled}${empty}] ${percentage.toFixed(1)}%`;
}

/**
 * 통계 리포트 생성
 */
function generateStatsReport() {
  // 1. CLAUDE.md 파싱
  const claudePath = path.join(__dirname, 'CLAUDE.md');

  if (!fs.existsSync(claudePath)) {
    console.error('오류: CLAUDE.md 파일을 찾을 수 없습니다.');
    process.exit(1);
  }

  const content = fs.readFileSync(claudePath, 'utf-8');
  const lines = content.split('\n');

  let basicCompleted = 0, basicTotal = 0;
  let advancedCompleted = 0, advancedTotal = 0;
  let currentSection = '';

  for (const line of lines) {
    if (line.includes('### 기본 과정')) {
      currentSection = 'basic';
    } else if (line.includes('### 고급 과정')) {
      currentSection = 'advanced';
    }

    if (line.match(/- \[.\] Module/)) {
      const isCompleted = line.includes('[x]');

      if (currentSection === 'basic') {
        basicTotal++;
        if (isCompleted) basicCompleted++;
      } else if (currentSection === 'advanced') {
        advancedTotal++;
        if (isCompleted) advancedCompleted++;
      }
    }
  }

  const totalCompleted = basicCompleted + advancedCompleted;
  const totalModules = basicTotal + advancedTotal;

  // 2. Git 데이터 수집
  const completions = getModuleCompletionHistory();
  const learningDays = calculateLearningDays();
  const avgModuleTime = calculateAverageModuleTime(completions);
  const recentCommits = getRecentCommits(5);
  const remainingModules = totalModules - totalCompleted;
  const estimatedDate = estimateCompletionDate(
    remainingModules,
    avgModuleTime,
    learningDays.lastDate
  );

  // 3. 리포트 출력
  console.log('='.repeat(60));
  console.log('📊 학습 통계 요약 리포트');
  console.log('='.repeat(60));
  console.log();

  // 전체 진행률
  console.log('📈 전체 진행률');
  console.log('-'.repeat(60));
  console.log(`기본 과정:  ${createProgressBar(basicCompleted, basicTotal)}`);
  console.log(`           ${basicCompleted}/${basicTotal} 모듈 완료`);
  console.log();
  console.log(`고급 과정:  ${createProgressBar(advancedCompleted, advancedTotal)}`);
  console.log(`           ${advancedCompleted}/${advancedTotal} 모듈 완료`);
  console.log();
  console.log(`전체:       ${createProgressBar(totalCompleted, totalModules)}`);
  console.log(`           ${totalCompleted}/${totalModules} 모듈 완료`);
  console.log();

  // 완료 모듈 상세
  if (completions.length > 0) {
    console.log('✅ 완료 모듈 상세');
    console.log('-'.repeat(60));

    for (let i = 0; i < completions.length; i++) {
      const completion = completions[i];
      const moduleName = MODULE_NAMES[completion.module] || `Module ${completion.module}`;

      let timeInfo = '';
      if (i > 0) {
        const prev = new Date(completions[i - 1].date);
        const curr = new Date(completion.date);
        const days = Math.ceil((curr - prev) / (1000 * 60 * 60 * 24));
        timeInfo = days === 0 ? ' (당일 완료)' : ` (${days}일 소요)`;
      }

      console.log(`${completion.date} | ${moduleName}${timeInfo}`);
    }
    console.log();
  }

  // 학습 활동 요약
  console.log('📅 학습 활동 요약');
  console.log('-'.repeat(60));
  console.log(`학습 시작일:     ${learningDays.startDate || 'N/A'}`);
  console.log(`마지막 활동일:   ${learningDays.lastDate || 'N/A'}`);
  console.log(`총 학습 기간:    ${learningDays.totalDays}일`);
  console.log(`활동 일수:       ${learningDays.activeDays}일`);

  if (avgModuleTime > 0) {
    console.log(`평균 모듈 소요:  ${avgModuleTime.toFixed(1)}일/모듈`);
  }
  console.log();

  // 다음 학습 목표
  if (remainingModules > 0) {
    console.log('🎯 다음 학습 목표');
    console.log('-'.repeat(60));

    // 다음 미완료 모듈 찾기
    const completedModules = new Set(completions.map(c => c.module));
    let nextModule = null;

    for (let i = 1; i <= 8; i++) {
      if (!completedModules.has(i)) {
        nextModule = i;
        break;
      }
    }

    if (nextModule) {
      console.log(`다음 모듈:       ${MODULE_NAMES[nextModule]}`);

      if (avgModuleTime > 0) {
        console.log(`예상 소요 시간:  약 ${Math.ceil(avgModuleTime)}일`);
      }
    }

    console.log(`남은 모듈:       ${remainingModules}개`);
    console.log();

    // 예상 완료일
    console.log('⏰ 예상 완료일');
    console.log('-'.repeat(60));
    console.log(`현재 페이스 기준: ${estimatedDate}`);
    console.log();
  } else {
    console.log('🎉 축하합니다! 모든 모듈을 완료했습니다!');
    console.log();
  }

  // 최근 활동
  if (recentCommits.length > 0) {
    console.log('🔄 최근 학습 활동 (최근 5개 커밋)');
    console.log('-'.repeat(60));

    recentCommits.forEach(commit => {
      console.log(`${commit.date} | ${commit.message}`);
    });
    console.log();
  }

  console.log('='.repeat(60));
}

// 메인 실행
const isMainModule = process.argv[1] && (
  import.meta.url === `file://${process.argv[1]}` ||
  import.meta.url.endsWith('stats.js')
);

if (isMainModule || import.meta.url.includes('stats.js')) {
  generateStatsReport();
}

export {
  getModuleCompletionHistory,
  calculateLearningDays,
  calculateAverageModuleTime,
  estimateCompletionDate,
  createProgressBar
};
