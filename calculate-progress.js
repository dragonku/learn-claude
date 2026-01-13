#!/usr/bin/env node

/**
 * 학습 진행률 계산기
 * CLAUDE.md 파일을 읽어서 완료된 모듈 수를 계산합니다
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 상수 정의
const THRESHOLD_COMPLETE = 100;
const THRESHOLD_HALF = 50;

/**
 * CLAUDE.md 파일을 읽습니다
 * @returns {string} 파일 내용
 */
function readClaudeFile() {
    const claudeFile = path.join(__dirname, 'CLAUDE.md');
    return fs.readFileSync(claudeFile, 'utf-8');
}

/**
 * 파일 내용에서 모듈 체크박스를 파싱합니다
 * @param {string} content 파일 내용
 * @returns {{totalModules: number, completedModules: number}} 모듈 정보
 */
function parseModules(content) {
    const lines = content.split('\n');
    let totalModules = 0;
    let completedModules = 0;

    for (const line of lines) {
        // "- [ ]" 또는 "- [x]" 패턴 찾기
        if (line.includes('- [ ] Module')) {
            totalModules++;
        } else if (line.includes('- [x] Module')) {
            totalModules++;
            completedModules++;
        }
    }

    return { totalModules, completedModules };
}

/**
 * 진행률을 계산합니다
 * @param {number} completedModules 완료된 모듈 수
 * @param {number} totalModules 전체 모듈 수
 * @returns {number|null} 진행률 (0-100) 또는 null (모듈이 없는 경우)
 */
function calculatePercentage(completedModules, totalModules) {
    if (totalModules === 0) return null;
    return (completedModules / totalModules) * 100;
}

/**
 * 진행률에 따른 격려 메시지를 생성합니다
 * @param {number} percentage 진행률 (0-100)
 * @returns {string} 격려 메시지
 */
function getEncouragementMessage(percentage) {
    if (percentage === THRESHOLD_COMPLETE) {
        return '축하합니다! 모든 모듈을 완료했습니다!';
    } else if (percentage >= THRESHOLD_HALF) {
        return '절반 이상 완료했어요! 계속 화이팅!';
    } else {
        return '좋은 시작이에요! 꾸준히 학습해봅시다.';
    }
}

/**
 * 진행 상황을 화면에 출력합니다
 * @param {number} completedModules 완료된 모듈 수
 * @param {number} totalModules 전체 모듈 수
 * @param {number|null} percentage 진행률 또는 null
 */
function displayProgress(completedModules, totalModules, percentage) {
    console.log('=== 학습 진행 상황 ===');

    if (percentage === null) {
        console.log('모듈 정보를 찾을 수 없습니다.');
        return;
    }

    console.log(`완료: ${completedModules}/${totalModules} 모듈`);
    console.log(`진행률: ${percentage.toFixed(2)}%`);
    console.log(getEncouragementMessage(percentage));
}

/**
 * 메인 함수: 학습 진행률을 계산하고 출력합니다
 */
function main() {
    const content = readClaudeFile();
    const { totalModules, completedModules } = parseModules(content);
    const percentage = calculatePercentage(completedModules, totalModules);
    displayProgress(completedModules, totalModules, percentage);
}

// 스크립트로 직접 실행될 때만 main 실행
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

// Export for testing
export {
    parseModules,
    calculatePercentage,
    getEncouragementMessage,
    displayProgress,
    THRESHOLD_COMPLETE,
    THRESHOLD_HALF
};
