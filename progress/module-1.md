# Module 1: 기초 설정 - 학습 노트

## 학습 일자
- 시작일: 2026-01-13
- 완료일: 2026-01-13

## 완료한 실습
- [x] 프로젝트 구조 파악
- [x] 파일 검색 연습
- [x] Todo 작성 실습
- [x] File Operations: progress/ 디렉토리 및 파일 생성
- [x] Debugging: calculate-progress.js 버그 수정 (할당 연산자, NaN 처리)
- [x] Git Workflow: 저장소 초기화, 커밋 생성
- [x] Refactoring: 함수 분리, SRP 적용, JSDoc 추가
- [x] Test Writing: 19개 단위 테스트 작성 및 통과

## 배운 내용

### 1. Claude Code 도구 시스템
- **Read**: 파일 읽기 (라인 번호 표시)
- **Write**: 새 파일 생성
- **Edit**: 기존 파일 수정 (old_string → new_string)
- **Glob**: 파일 패턴 검색 (`**/*.js`)
- **Grep**: 코드 내용 검색
- **Bash**: 터미널 명령 실행
- **TodoWrite**: 작업 추적 및 관리

### 2. 효율적인 워크플로우
- 병렬 도구 실행으로 성능 최적화
- Todo 리스트로 작업 추적 (pending → in_progress → completed)
- 한 번에 하나의 작업만 in_progress 유지

### 3. Git 워크플로우
- `git init`: 저장소 초기화
- `git config`: 사용자 정보 설정
- `git add`, `git commit`: 변경사항 커밋
- Claude Code 자동 커밋 메시지 생성
- 체계적인 커밋 히스토리 관리

### 4. 리팩토링 원칙
- **단일 책임 원칙 (SRP)**: 각 함수는 하나의 역할만
- **함수 분해**: 큰 함수를 작은 함수로 분리
- **순수 함수**: 입력 → 출력, 부작용 최소화
- **매직 넘버 제거**: 상수로 추출
- **JSDoc 문서화**: 함수 입출력 명시

### 5. 테스트 작성
- Node.js 내장 테스트 러너 (`node:test`)
- 단위 테스트 구조: describe, test, assert
- 테스트 종류: 정상 케이스, 엣지 케이스, 경계값
- 부동소수점 정밀도 처리
- TDD의 이점: 버그 조기 발견, 리팩토링 안전망

### 6. 디버깅 기법
- Read로 코드 분석
- Edit로 정확한 라인 수정
- 일반적인 버그 패턴 식별 (할당 vs 비교, 0으로 나누기)

## 프로젝트 성과

### 📦 생성한 파일
- `progress/module-1.md`: 학습 노트
- `calculate-progress.js`: 진행률 계산 스크립트 (103줄)
- `calculate-progress.test.js`: 단위 테스트 (139줄)
- `package.json`: 프로젝트 설정
- `.gitignore`: Git 무시 파일

### 🎯 Git 커밋
1. Initial commit: 프로젝트 초기 설정
2. Refactor: 코드 리팩토링
3. Add tests: 단위 테스트 추가

### ✅ 테스트 결과
- 총 19개 테스트
- 3개 테스트 스위트
- 100% 통과율
- 순수 함수 100% 커버리지

## 질문/메모
- Claude Code는 명시적 요청 없이는 커밋하지 않음
- 리팩토링 덕분에 테스트 작성이 매우 쉬워짐
- ES6 모듈 시스템으로 전환하여 최신 JavaScript 사용
- `import.meta.url`로 스크립트 직접 실행 감지

## 다음 단계
- Module 2: 핵심 기능 학습 시작
- Agent 시스템 활용법
- 효과적인 코드 편집 전략
