#!/usr/bin/env node

/**
 * 학습 진행률 계산기
 * CLAUDE.md 파일을 읽어서 완료된 모듈 수를 계산합니다
 */

const fs = require('fs');
const path = require('path');

function calculateProgress() {
    // CLAUDE.md 파일 읽기
    const claudeFile = path.join(__dirname, 'CLAUDE.md');
    const content = fs.readFileSync(claudeFile, 'utf-8');

    // 체크박스 찾기
    const lines = content.split('\n');
    let totalModules = 0;
    let completedModules = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // "- [ ]" 또는 "- [x]" 패턴 찾기
        if (line.includes('- [ ] Module')) {
            totalModules++;
        } else if (line.includes('- [x] Module')) {
            totalModules++;
            completedModules++;
        }
    }

    // 진행률 계산
    // totalModules가 0인 경우 처리
    if (totalModules === 0) {
        console.log('=== 학습 진행 상황 ===');
        console.log('모듈 정보를 찾을 수 없습니다.');
        return;
    }

    const percentage = (completedModules / totalModules) * 100;

    console.log('=== 학습 진행 상황 ===');
    console.log(`완료: ${completedModules}/${totalModules} 모듈`);
    console.log(`진행률: ${percentage.toFixed(2)}%`);

    // 격려 메시지
    if (percentage === 100) {
        console.log('축하합니다! 모든 모듈을 완료했습니다!');
    } else if (percentage >= 50) {
        console.log('절반 이상 완료했어요! 계속 화이팅!');
    } else {
        console.log('좋은 시작이에요! 꾸준히 학습해봅시다.');
    }
}

// 실행
calculateProgress();
