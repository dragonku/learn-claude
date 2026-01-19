import { describe, test } from 'node:test';
import assert from 'node:assert';
import {
  calculateAverageModuleTime,
  estimateCompletionDate,
  createProgressBar
} from './stats.js';

describe('Stats Calculations', () => {
  describe('calculateAverageModuleTime', () => {
    test('정상 케이스 - 여러 모듈', () => {
      const completions = [
        { module: 1, date: '2026-01-13' },
        { module: 2, date: '2026-01-15' },
        { module: 3, date: '2026-01-18' }
      ];

      const avg = calculateAverageModuleTime(completions);
      assert.strictEqual(avg, 2.5); // (2 + 3) / 2
    });

    test('모듈 1개만 있는 경우', () => {
      const completions = [{ module: 1, date: '2026-01-13' }];
      const avg = calculateAverageModuleTime(completions);
      assert.strictEqual(avg, 0);
    });

    test('빈 배열', () => {
      const completions = [];
      const avg = calculateAverageModuleTime(completions);
      assert.strictEqual(avg, 0);
    });

    test('당일 완료 케이스', () => {
      const completions = [
        { module: 1, date: '2026-01-13' },
        { module: 2, date: '2026-01-13' },
        { module: 3, date: '2026-01-13' }
      ];

      const avg = calculateAverageModuleTime(completions);
      assert.strictEqual(avg, 0); // (0 + 0) / 2 = 0
    });
  });

  describe('estimateCompletionDate', () => {
    test('정상 케이스', () => {
      const result = estimateCompletionDate(2, 3, '2026-01-19');
      // 2 모듈 * 3일 = 6일 후
      assert.strictEqual(result, '2026-01-25');
    });

    test('완료된 경우 (남은 모듈 0)', () => {
      const result = estimateCompletionDate(0, 3, '2026-01-19');
      assert.strictEqual(result, '완료됨');
    });

    test('평균 소요 시간이 0인 경우', () => {
      const result = estimateCompletionDate(2, 0, '2026-01-19');
      assert.strictEqual(result, '추정 불가');
    });

    test('마지막 날짜가 없는 경우', () => {
      const result = estimateCompletionDate(2, 3, null);
      assert.strictEqual(result, '추정 불가');
    });

    test('1일 미만 소요 케이스', () => {
      const result = estimateCompletionDate(1, 0.5, '2026-01-19');
      // 0.5일 -> 올림하여 1일
      assert.strictEqual(result, '2026-01-20');
    });
  });

  describe('createProgressBar', () => {
    test('50% 진행', () => {
      const bar = createProgressBar(4, 8, 20);
      assert.ok(bar.includes('50.0%'), 'Should include percentage');
      assert.ok(bar.includes('█'), 'Should include filled blocks');
      assert.ok(bar.includes('░'), 'Should include empty blocks');
      assert.match(bar, /\[█{10}░{10}\]/); // 정확히 절반
    });

    test('100% 진행', () => {
      const bar = createProgressBar(8, 8, 10);
      assert.ok(bar.includes('100.0%'));
      assert.strictEqual(bar.match(/█/g).length, 10, 'Should have 10 filled blocks');
      assert.ok(!bar.includes('░'), 'Should have no empty blocks');
    });

    test('0% 진행', () => {
      const bar = createProgressBar(0, 8, 10);
      assert.ok(bar.includes('0.0%'));
      assert.ok(!bar.includes('█'), 'Should have no filled blocks');
      assert.strictEqual(bar.match(/░/g).length, 10, 'Should have 10 empty blocks');
    });

    test('진행 바 너비 커스터마이징', () => {
      const bar = createProgressBar(1, 2, 30);
      assert.ok(bar.includes('50.0%'));
      assert.strictEqual(bar.match(/█/g).length, 15, 'Should have 15 filled blocks');
      assert.strictEqual(bar.match(/░/g).length, 15, 'Should have 15 empty blocks');
    });

    test('87.5% 진행 (실제 프로젝트 상황)', () => {
      const bar = createProgressBar(7, 8, 20);
      assert.ok(bar.includes('87.5%'));
      assert.strictEqual(bar.match(/█/g).length, 17, 'Should have 17 filled blocks');
      assert.strictEqual(bar.match(/░/g).length, 3, 'Should have 3 empty blocks');
    });

    test('단일 모듈 완료', () => {
      const bar = createProgressBar(1, 8, 20);
      assert.ok(bar.includes('12.5%'));
      assert.strictEqual(bar.match(/█/g).length, 2, 'Should have 2 filled blocks');
    });
  });
});
