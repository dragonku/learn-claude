# Claude Code 팀 온보딩 가이드

> 새로운 팀원을 위한 Claude Code 시작 가이드입니다.

## 🚀 Claude Code 설치 방법

### 1. 시스템 요구사항
- Node.js 18 이상
- Git
- WSL2 (Windows 사용자)

### 2. 설치 단계

```bash
# 1. Claude Code CLI 설치
npm install -g @anthropic/claude-code

# 2. 버전 확인
claude --version

# 3. 인증 설정
claude auth login

# 4. 프로젝트 디렉토리로 이동
cd /path/to/learn-claude

# 5. Claude Code 시작
claude
```

### 3. 초기 설정 확인

```bash
# .claude 디렉토리 구조 확인
ls -la .claude/

# 출력 예시:
# .claude/
# ├── settings.json          # 팀 공유 설정
# ├── settings.local.json    # 개인 설정 (Git 무시)
# ├── mcp.json              # MCP 서버 설정
# └── commands/             # 커스텀 슬래시 커맨드
#     ├── learn.md
#     ├── practice.md
#     ├── tips.md
#     └── review.md
```

---

## 📋 프로젝트의 커스텀 커맨드

### `/learn [모듈번호]` - 학습 가이드
Claude Code를 단계별로 학습할 수 있는 커리큘럼을 제공합니다.

**사용 예시:**
```
/learn 1          # Module 1: 기초 설정
/learn 5          # Module 5: 확장 기능
/learn status     # 현재 진행 상황 확인
/learn quiz       # 이해도 확인 퀴즈
```

**모듈 구성:**
- Module 1: 기초 설정
- Module 2: 핵심 기능
- Module 3: 컨텍스트 관리
- Module 4: 고급 기능
- Module 5: 확장 기능
- Module 6: 팀 도입 전략

### `/practice [타입]` - 실습 과제
실무에서 바로 활용할 수 있는 실습 과제를 제공합니다.

**사용 예시:**
```
/practice file         # 파일 생성/수정 실습
/practice debug        # 디버깅 실습
/practice git          # Git 워크플로우 실습
/practice refactor     # 리팩토링 실습
/practice test         # 테스트 작성 실습
/practice random       # 랜덤 과제
```

### `/tips [카테고리]` - 사용 팁
Claude Code를 효과적으로 사용하는 방법을 안내합니다.

**사용 예시:**
```
/tips shortcut      # 단축키 및 핫키
/tips prompt        # 효과적인 프롬프트 작성법
/tips workflow      # 추천 워크플로우
/tips debug         # 디버깅 팁
/tips daily         # 오늘의 랜덤 팁
```

### `/review` - 코드 리뷰
현재 프로젝트의 코드를 리뷰하고 개선 제안을 제공합니다.

**사용 예시:**
```
/review             # 전체 프로젝트 리뷰
```

**리뷰 내용:**
- 최근 수정된 파일 분석
- 코드 스타일 일관성 체크
- 에러 처리 검증
- 주석 적절성 평가
- 개선 제안 3가지 제시

---

## 🔄 팀의 워크플로우 가이드

### 1. 기본 개발 워크플로우

```
1. 작업 시작
   └─> Claude 실행: claude

2. 기능 개발
   └─> Claude에게 요청: "사용자 인증 기능 추가해줘"
   └─> 필요시 plan 모드 사용

3. 코드 리뷰
   └─> 커맨드 실행: /review
   └─> 개선사항 적용

4. 테스트 실행
   └─> 요청: "테스트 실행하고 결과 알려줘"
   └─> 또는: npm test

5. 커밋 (자동화된 Hook 실행)
   └─> 요청: "커밋해줘"
   └─> PreToolUse Hook: 린트 검사 (npm run lint)
   └─> Git Commit 실행
   └─> PostToolUse Hook: 진행률 계산
```

### 2. Git 커밋 자동화

이 프로젝트는 Git 커밋 시 자동으로 다음 작업을 수행합니다:

**커밋 전 (PreToolUse Hook):**
- ✅ 코드 스타일 검사 (`npm run lint`)
- ✅ 린트 실패 시 커밋 중단

**커밋 후 (PostToolUse Hook):**
- ✅ 학습 진행률 자동 계산 (`node calculate-progress.js`)
- ✅ 진행 상황 콘솔 출력

### 3. MCP 서버 활용

**filesystem 서버:**
- 프로젝트 디렉토리에 대한 파일 시스템 접근
- 파일 읽기/쓰기/검색 최적화

**사용 가능한 MCP 도구:**
- `read_file` - 파일 읽기
- `write_file` - 파일 쓰기
- `list_directory` - 디렉토리 목록
- `search_files` - 파일 검색

---

## 💬 자주 사용하는 프롬프트 예시

### 코드 작성
```
"calculate-progress.js에 에러 핸들링 추가해줘"
"TypeScript로 타입 정의 파일 만들어줘"
"README.md에 사용법 섹션 추가해줘"
```

### 리팩토링
```
"이 함수를 더 읽기 쉽게 리팩토링해줘"
"중복 코드를 제거하고 공통 함수로 만들어줘"
"ES6 최신 문법으로 업데이트해줘"
```

### 디버깅
```
"이 에러의 원인을 찾아줘"
"테스트가 실패하는 이유를 분석해줘"
"메모리 누수가 있는지 확인해줘"
```

### Git 작업
```
"변경사항 커밋해줘"
"PR 생성해줘"
"커밋 메시지를 더 명확하게 수정해줘"
```

### 문서화
```
"이 함수에 JSDoc 주석 추가해줘"
"API 문서 작성해줘"
"CHANGELOG.md 업데이트해줘"
```

### 테스트
```
"이 함수에 대한 유닛 테스트 작성해줘"
"테스트 커버리지 확인하고 부족한 부분 보완해줘"
"엣지 케이스 테스트 추가해줘"
```

---

## 🔧 문제 해결 팁

### 1. Claude가 응답하지 않을 때
```bash
# 세션 재시작
Ctrl + C
claude

# 또는 새 터미널에서 시작
```

### 2. 파일을 찾지 못할 때
```
"현재 디렉토리 구조를 보여줘"
"*.js 파일 목록을 보여줘"
"특정 함수명으로 파일을 검색해줘"
```

### 3. 컨텍스트가 너무 길어질 때
```
"/clear"  # 대화 내역 초기화
또는 새 세션 시작
```

### 4. Git 관련 오류
```bash
# safe directory 추가
git config --global --add safe.directory '/path/to/project'

# 권한 문제 해결
chmod +x .git/hooks/*
```

### 5. MCP 서버 오류
```bash
# MCP 서버 재시작
claude를 종료하고 다시 시작

# MCP 설정 확인
cat .claude/mcp.json
```

### 6. Hook 실행 오류
```bash
# npm 스크립트 존재 확인
npm run lint

# Hook 설정 확인
cat .claude/settings.local.json

# 실행 권한 확인
ls -la calculate-progress.js
```

---

## 📚 추가 학습 리소스

### 공식 문서
- [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/quickstart)
- [Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [MCP Protocol](https://modelcontextprotocol.io/)

### 커뮤니티
- [GitHub Repository](https://github.com/anthropics/claude-code)
- [Discord Community](https://discord.gg/anthropic)
- [Anthropic Academy](https://anthropic.skilljar.com/claude-code-in-action)

### 프로젝트 파일
- `CLAUDE.md` - 학습 커리큘럼 및 진행 상황
- `.claude/settings.local.json` - 개인 설정 (권한, Hook)
- `.claude/mcp.json` - MCP 서버 설정
- `calculate-progress.js` - 진행률 계산 스크립트

---

## ✅ 온보딩 체크리스트

시작하기 전에 다음 항목을 확인하세요:

- [ ] Claude Code CLI 설치 완료
- [ ] 인증 설정 완료 (`claude auth login`)
- [ ] 프로젝트 클론 및 디렉토리 이동
- [ ] `.claude/` 디렉토리 구조 확인
- [ ] `/learn 1` 명령어로 첫 학습 시작
- [ ] 커스텀 커맨드 실행 테스트
- [ ] Git 커밋 워크플로우 이해
- [ ] MCP 서버 작동 확인
- [ ] 이 문서를 북마크 또는 출력

---

## 🎯 첫 주 목표

### Day 1-2: 기본 익히기
- Module 1, 2 완료
- 기본 명령어 숙지
- 첫 번째 커밋 경험

### Day 3-4: 실습
- `/practice` 커맨드로 실습
- 실제 작업에 Claude 활용
- 팀 워크플로우 적응

### Day 5: 고급 기능
- Module 5, 6 학습
- Hook 커스터마이징
- 팀원과 경험 공유

---

## 💡 마지막 팁

**효과적인 Claude 사용법:**
1. **구체적으로 요청하기**: "함수 수정해줘" 보다 "calculate-progress.js의 parseModules 함수에 에러 핸들링 추가해줘"
2. **단계별로 진행하기**: 복잡한 작업은 작은 단위로 나누어 요청
3. **컨텍스트 제공하기**: 파일명, 라인 번호, 함수명 등 명확히 지정
4. **피드백 주기**: Claude의 제안을 검토하고 수정 요청
5. **문서화 습관**: 중요한 워크플로우는 문서로 정리

**질문이 있다면:**
- 팀 리더에게 문의
- `/tips` 커맨드 활용
- 이 문서 참조
- Discord 커뮤니티 질문

---

**환영합니다! 함께 생산적인 개발을 만들어가요! 🚀**
