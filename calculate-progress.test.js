import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
    parseModules,
    calculatePercentage,
    getEncouragementMessage,
    THRESHOLD_COMPLETE,
    THRESHOLD_HALF
} from './calculate-progress.js';

describe('parseModules', () => {
    test('should parse unchecked modules', () => {
        const content = `
# Test
- [ ] Module 1: Basics
- [ ] Module 2: Advanced
`;
        const result = parseModules(content);
        assert.strictEqual(result.totalModules, 2);
        assert.strictEqual(result.completedModules, 0);
    });

    test('should parse checked modules', () => {
        const content = `
# Test
- [x] Module 1: Basics
- [x] Module 2: Advanced
`;
        const result = parseModules(content);
        assert.strictEqual(result.totalModules, 2);
        assert.strictEqual(result.completedModules, 2);
    });

    test('should parse mixed modules', () => {
        const content = `
# Test
- [x] Module 1: Basics
- [ ] Module 2: Advanced
- [x] Module 3: Expert
- [ ] Module 4: Master
`;
        const result = parseModules(content);
        assert.strictEqual(result.totalModules, 4);
        assert.strictEqual(result.completedModules, 2);
    });

    test('should ignore non-module checkboxes', () => {
        const content = `
# Test
- [ ] Some task
- [x] Another task
- [ ] Module 1: Real module
`;
        const result = parseModules(content);
        assert.strictEqual(result.totalModules, 1);
        assert.strictEqual(result.completedModules, 0);
    });

    test('should handle empty content', () => {
        const result = parseModules('');
        assert.strictEqual(result.totalModules, 0);
        assert.strictEqual(result.completedModules, 0);
    });
});

describe('calculatePercentage', () => {
    test('should calculate 0% for no completed modules', () => {
        const result = calculatePercentage(0, 6);
        assert.strictEqual(result, 0);
    });

    test('should calculate 50% for half completed', () => {
        const result = calculatePercentage(3, 6);
        assert.strictEqual(result, 50);
    });

    test('should calculate 100% for all completed', () => {
        const result = calculatePercentage(6, 6);
        assert.strictEqual(result, 100);
    });

    test('should calculate percentage with decimal', () => {
        const result = calculatePercentage(1, 3);
        // Use assert.ok for floating point comparison
        assert.ok(Math.abs(result - 33.333333) < 0.001);
    });

    test('should return null for zero total modules', () => {
        const result = calculatePercentage(0, 0);
        assert.strictEqual(result, null);
    });

    test('should handle edge case: 1 of 1', () => {
        const result = calculatePercentage(1, 1);
        assert.strictEqual(result, 100);
    });
});

describe('getEncouragementMessage', () => {
    test('should return completion message for 100%', () => {
        const message = getEncouragementMessage(THRESHOLD_COMPLETE);
        assert.strictEqual(message, '축하합니다! 모든 모듈을 완료했습니다!');
    });

    test('should return half-way message for 50%', () => {
        const message = getEncouragementMessage(THRESHOLD_HALF);
        assert.strictEqual(message, '절반 이상 완료했어요! 계속 화이팅!');
    });

    test('should return half-way message for 75%', () => {
        const message = getEncouragementMessage(75);
        assert.strictEqual(message, '절반 이상 완료했어요! 계속 화이팅!');
    });

    test('should return start message for 0%', () => {
        const message = getEncouragementMessage(0);
        assert.strictEqual(message, '좋은 시작이에요! 꾸준히 학습해봅시다.');
    });

    test('should return start message for 25%', () => {
        const message = getEncouragementMessage(25);
        assert.strictEqual(message, '좋은 시작이에요! 꾸준히 학습해봅시다.');
    });

    test('should handle boundary: 49.99%', () => {
        const message = getEncouragementMessage(49.99);
        assert.strictEqual(message, '좋은 시작이에요! 꾸준히 학습해봅시다.');
    });

    test('should handle boundary: 50.01%', () => {
        const message = getEncouragementMessage(50.01);
        assert.strictEqual(message, '절반 이상 완료했어요! 계속 화이팅!');
    });

    test('should handle boundary: 99.99%', () => {
        const message = getEncouragementMessage(99.99);
        assert.strictEqual(message, '절반 이상 완료했어요! 계속 화이팅!');
    });
});
