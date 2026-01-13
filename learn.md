# Claude Code 학습 가이드 전체 모듈

> 이 문서는 `/learn` 커맨드로 제공되는 모든 학습 모듈을 한 곳에 모아놓은 참고 자료입니다.

## 목차

### 기본 과정
- [Module 1: 기초 설정](#module-1-기초-설정)
- [Module 2: 핵심 기능](#module-2-핵심-기능)
- [Module 3: 컨텍스트 관리](#module-3-컨텍스트-관리)
- [Module 4: 고급 기능](#module-4-고급-기능)
- [Module 5: 확장 기능](#module-5-확장-기능)
- [Module 6: 팀 도입 전략](#module-6-팀-도입-전략)

### 고급 과정
- [Module 7: Skills 활용](#module-7-skills-활용)
- [Module 8: Sub-Agent 아키텍처](#module-8-sub-agent-아키텍처)

---

# Module 1: 기초 설정

## 1. 학습 목표

- Claude Code CLI를 설치하고 기본 설정을 완료합니다
- 프로젝트별 설정 파일(.claude/)의 구조를 이해합니다
- 첫 대화를 시작하고 기본적인 명령어를 익힙니다

## 2. 핵심 개념 설명

### 2.1 Claude Code 설치

```bash
# npm으로 설치
npm install -g @anthropic/claude-code

# 버전 확인
claude --version

# 인증 설정
claude auth login

# Claude Code 시작
claude
```

### 2.2 프로젝트 설정 구조

```
프로젝트/
├── .claude/
│   ├── settings.json          # 팀 공유 설정
│   ├── settings.local.json    # 개인 설정
│   ├── mcp.json              # MCP 서버 설정
│   └── commands/             # 커스텀 슬래시 커맨드
├── .gitignore                # .claude/settings.local.json 포함
└── 프로젝트 파일들...
```

### 2.3 기본 명령어

```bash
# 도움말
/help

# 대화 내역 지우기
/clear

# 종료
/exit 또는 Ctrl+C
```

## 3. 실습 과제

### 과제 1: Claude Code 설치 및 실행
```bash
claude --version
claude auth login
claude
```

### 과제 2: 첫 번째 요청
```
"현재 디렉토리의 파일 목록을 보여줘"
```

### 과제 3: .claude 디렉토리 생성
`.claude/` 디렉토리를 만들고 기본 설정 파일을 준비합니다.

## 4. 체크포인트

- [ ] Claude Code CLI가 정상적으로 설치되었다
- [ ] 인증이 완료되고 Claude와 대화할 수 있다
- [ ] .claude/ 디렉토리 구조를 이해한다

## 5. 다음 단계

Module 2에서 파일 읽기, 쓰기, 편집 등 핵심 기능을 학습합니다.

---

# Module 2: 핵심 기능

## 1. 학습 목표

- 파일 읽기, 쓰기, 편집 등 기본 파일 작업을 수행합니다
- 코드 검색 및 패턴 매칭 기능을 활용합니다
- Git 통합 기능을 이해하고 커밋/PR을 생성합니다

## 2. 핵심 개념 설명

### 2.1 파일 작업

**파일 읽기:**
```
"calculate-progress.js 파일을 읽어줘"
"package.json의 내용을 보여줘"
```

**파일 쓰기:**
```
"새로운 파일 test.js를 만들어줘"
"README.md에 프로젝트 설명을 추가해줘"
```

**파일 편집:**
```
"calculate-progress.js의 10번째 줄을 수정해줘"
"에러 핸들링을 추가해줘"
```

### 2.2 코드 검색

**Glob 패턴:**
```
"모든 .js 파일을 찾아줘"
"src/**/*.ts 파일 목록을 보여줘"
```

**Grep 검색:**
```
"'parseModules' 함수가 있는 파일을 찾아줘"
"TODO 주석이 있는 모든 위치를 찾아줘"
```

### 2.3 Git 통합

**커밋 생성:**
```
"변경사항을 커밋해줘"
"커밋 메시지: Add new feature"
```

**PR 생성:**
```
"PR을 만들어줘"
"제목: Add user authentication"
```

## 3. 실습 과제

### 과제 1: 파일 읽기 및 분석
```
"calculate-progress.js를 읽고 주요 함수를 설명해줘"
```

### 과제 2: 새 파일 생성
```
"utils.js 파일을 만들고 formatDate 함수를 추가해줘"
```

### 과제 3: Git 커밋
```
"지금까지 변경사항을 커밋해줘"
```

## 4. 체크포인트

- [ ] 파일을 읽고, 쓰고, 편집할 수 있다
- [ ] Glob과 Grep으로 코드를 검색할 수 있다
- [ ] Git 커밋과 PR을 Claude를 통해 생성할 수 있다

## 5. 다음 단계

Module 3에서 대화 컨텍스트를 효율적으로 관리하는 방법을 학습합니다.

---

# Module 3: 컨텍스트 관리

## 1. 학습 목표

- 대화 컨텍스트의 개념을 이해하고 효율적으로 관리합니다
- @ 멘션으로 파일과 디렉토리를 참조하는 방법을 익힙니다
- 긴 대화에서 컨텍스트를 최적화하는 전략을 수립합니다

## 2. 핵심 개념 설명

### 2.1 컨텍스트란?

Claude Code는 대화 내역과 파일 내용을 "컨텍스트"로 기억합니다.
- 대화 내역
- 읽은 파일 내용
- 실행한 명령어 결과

### 2.2 @ 멘션 사용

**파일 멘션:**
```
"@calculate-progress.js의 parseModules 함수를 리팩토링해줘"
```

**디렉토리 멘션:**
```
"@.claude/commands/ 디렉토리의 모든 커맨드를 설명해줘"
```

### 2.3 컨텍스트 관리 전략

**1. 필요한 파일만 읽기**
```
"calculate-progress.js만 읽고 분석해줘"
```

**2. 대화 초기화**
```
/clear  # 새로운 작업 시작 시
```

**3. 구체적인 요청**
```
# 좋은 예
"calculate-progress.js:23-50 라인의 코드를 최적화해줘"

# 나쁜 예
"코드를 최적화해줘"
```

## 3. 실습 과제

### 과제 1: @ 멘션 사용
```
"@package.json에 새로운 스크립트를 추가해줘"
```

### 과제 2: 컨텍스트 최적화
긴 파일을 다룰 때 특정 라인 범위만 지정하여 요청하기

### 과제 3: 대화 재시작
새로운 기능을 구현할 때 `/clear`로 컨텍스트를 초기화하기

## 4. 체크포인트

- [ ] @ 멘션으로 파일과 디렉토리를 참조할 수 있다
- [ ] 컨텍스트를 효율적으로 관리할 수 있다
- [ ] 대화를 적절한 시점에 초기화할 수 있다

## 5. 다음 단계

Module 4에서 복잡한 작업을 처리하는 고급 기능을 학습합니다.

---

# Module 4: 고급 기능

## 1. 학습 목표

- Plan 모드를 활용하여 복잡한 작업을 단계별로 계획합니다
- 에이전트를 사용하여 전문화된 작업을 수행합니다
- 백그라운드 작업과 병렬 처리를 이해합니다

## 2. 핵심 개념 설명

### 2.1 Plan 모드

복잡한 작업을 시작하기 전에 계획을 수립합니다.

**사용 시기:**
- 여러 파일을 수정하는 큰 기능 추가
- 아키텍처 변경이 필요한 리팩토링
- 명확하지 않은 요구사항 정리

**사용 방법:**
```
"plan 모드로 사용자 인증 기능을 추가하는 계획을 세워줘"
```

### 2.2 에이전트 활용

특정 작업에 특화된 에이전트를 사용합니다.

**Explore 에이전트:**
```
"코드베이스에서 API 엔드포인트가 어떻게 구현되어 있는지 조사해줘"
```

**Plan 에이전트:**
```
"대규모 리팩토링 계획을 수립해줘"
```

### 2.3 병렬 처리

여러 작업을 동시에 수행합니다.

```
"동시에 다음 작업을 수행해줘:
1. 테스트 실행
2. 린트 검사
3. 빌드"
```

## 3. 실습 과제

### 과제 1: Plan 모드 사용
```
"plan 모드로 새로운 기능을 추가하는 계획을 세워줘"
```

### 과제 2: 에이전트 활용
```
"Explore 에이전트로 현재 프로젝트 구조를 분석해줘"
```

### 과제 3: 병렬 실행
```
"테스트와 린트를 동시에 실행해줘"
```

## 4. 체크포인트

- [ ] Plan 모드를 사용하여 복잡한 작업을 계획할 수 있다
- [ ] 적절한 에이전트를 선택하여 작업을 위임할 수 있다
- [ ] 병렬 처리로 효율을 높일 수 있다

## 5. 다음 단계

Module 5에서 MCP 서버, 커스텀 커맨드, Hooks를 통해 Claude Code를 확장합니다.

---

# Module 5: 확장 기능

## 1. 학습 목표

- MCP (Model Context Protocol) 서버를 이해하고 설치/설정하는 방법을 익힙니다
- 커스텀 슬래시 커맨드와 Hooks를 작성하여 워크플로우를 자동화합니다
- Skills를 활용하여 전문화된 작업을 효율적으로 수행합니다

## 2. 핵심 개념 설명

### 2.1 MCP (Model Context Protocol) 서버

MCP는 Claude Code가 외부 데이터 소스 및 도구와 상호작용할 수 있게 하는 프로토콜입니다.

**설정 예시 (.claude/mcp.json):**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/user/project"
      ],
      "description": "Filesystem access"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token"
      },
      "description": "GitHub API access"
    }
  }
}
```

### 2.2 커스텀 슬래시 커맨드

`.claude/commands/` 디렉토리에 Markdown 파일을 생성하여 재사용 가능한 커맨드를 만듭니다.

**예시 (.claude/commands/test.md):**
```markdown
# Test Command

다음 작업을 수행하세요:
1. npm test 실행
2. 실패한 테스트가 있다면 분석
3. 해결 방법 제안
```

### 2.3 Hooks

특정 이벤트 발생 시 자동으로 실행되는 스크립트입니다.

**설정 예시 (.claude/settings.local.json):**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint",
            "statusMessage": "린트 검사 중..."
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "node calculate-progress.js",
            "statusMessage": "진행률 계산 중..."
          }
        ]
      }
    ]
  }
}
```

## 3. 실습 과제

### 과제 1: MCP 서버 설정
`.claude/mcp.json`에 filesystem 서버 설정 추가

### 과제 2: 커스텀 커맨드 생성
`.claude/commands/review.md` 파일 생성 (코드 리뷰 커맨드)

### 과제 3: Hook 추가
Git 커밋 후 자동으로 진행률을 계산하는 Hook 설정

## 4. 체크포인트

- [ ] MCP 서버를 설정하고 활용할 수 있다
- [ ] 커스텀 슬래시 커맨드를 작성할 수 있다
- [ ] Hook으로 워크플로우를 자동화할 수 있다

## 5. 다음 단계

Module 6에서 팀 전체가 Claude Code를 효과적으로 도입하는 전략을 학습합니다.

---

# Module 6: 팀 도입 전략

## 1. 학습 목표

- 팀 전체가 Claude Code를 효과적으로 도입하고 사용할 수 있는 전략을 수립합니다
- 공유 설정과 베스트 프랙티스를 통해 팀의 생산성을 극대화합니다
- 온보딩 프로세스를 설계하여 새로운 팀원이 빠르게 적응할 수 있도록 합니다

## 2. 핵심 개념 설명

### 2.1 팀 설정 파일 구조

```
프로젝트/
├── .claude/
│   ├── settings.json          # 팀 공유 설정 (Git 커밋)
│   ├── settings.local.json    # 개인 설정 (Git 무시)
│   ├── mcp.json              # 팀 MCP 서버 설정
│   ├── commands/             # 공유 슬래시 커맨드
│   │   ├── review.md
│   │   ├── test.md
│   │   └── deploy.md
│   └── agents/               # 커스텀 에이전트
└── .gitignore                # .claude/settings.local.json 포함
```

### 2.2 팀 공유 설정 예시

**.claude/settings.json:**
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm test)",
      "Bash(npm run lint)",
      "Bash(git add:*)",
      "Bash(git commit:*)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint",
            "statusMessage": "린트 검사 중..."
          }
        ]
      }
    ]
  }
}
```

### 2.3 .gitignore 설정

```gitignore
# Claude Code 개인 설정
.claude/settings.local.json

# 환경 변수
.env.local
.env.*.local
```

### 2.4 팀 온보딩 문서

**CLAUDE_ONBOARDING.md** 파일을 생성하여 팀원에게 가이드 제공:
- Claude Code 설치 방법
- 프로젝트의 커스텀 커맨드 설명
- 팀의 워크플로우 가이드
- 자주 사용하는 프롬프트 예시
- 문제 해결 팁

## 3. 실습 과제

### 과제 1: 팀 공유 설정 파일 생성
`.claude/settings.json` 파일 생성

### 과제 2: 팀 온보딩 문서 작성
`CLAUDE_ONBOARDING.md` 파일 생성

### 과제 3: .gitignore 업데이트
개인 설정 파일을 Git에서 제외

## 4. 체크포인트

- [ ] 팀 공유 설정과 개인 설정을 분리할 수 있다
- [ ] 온보딩 문서를 작성하여 새로운 팀원을 지원할 수 있다
- [ ] 팀 전체가 일관된 워크플로우를 유지하도록 설정했다

## 5. 다음 단계

### 축하합니다! 전체 커리큘럼 완료

모든 모듈을 완료하셨습니다!

**다음 액션:**
1. 실전 프로젝트에 적용
2. 팀원들과 설정 공유
3. 고급 MCP 서버 개발
4. 커뮤니티 참여

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

---

## 💡 효과적인 학습 팁

### 1. 점진적 학습
- 한 번에 한 모듈씩 완료하기
- 각 실습 과제를 반드시 수행하기
- 체크포인트를 통해 이해도 확인하기

### 2. 실전 적용
- 학습한 내용을 실제 프로젝트에 바로 적용
- 작은 작업부터 시작하여 점차 복잡한 작업으로
- 실패를 두려워하지 말고 계속 시도

### 3. 문서화 습관
- 유용한 프롬프트를 기록
- 팀 워크플로우 문서화
- 문제 해결 방법 공유

### 4. 커뮤니티 활용
- 다른 사용자들의 경험 학습
- 질문하고 답변하기
- 유용한 설정과 커맨드 공유

---

# Module 7: Skills 활용

## 1. 학습 목표

- Skills의 개념과 동작 원리를 이해합니다
- 내장 Skills를 효과적으로 활용하는 방법을 익힙니다
- 커스텀 Skills를 작성하여 반복 작업을 자동화합니다

## 2. 핵심 개념 설명

### 2.1 Skills란?

Skills는 특정 도메인이나 작업에 특화된 재사용 가능한 에이전트입니다.
- 전문화된 프롬프트와 도구 조합
- 일관된 작업 수행
- 컨텍스트 최적화

### 2.2 Skills 호출

**Skill 도구 사용:**
```
"pdf skill을 사용해서 이 문서를 분석해줘"
"xlsx skill로 스프레드시트를 처리해줘"
```

**자동 감지:**
Claude가 작업 유형을 인식하면 자동으로 적절한 Skill을 제안합니다.

### 2.3 내장 Skills 예시

**PDF Skill:**
- PDF 파일 읽기 및 분석
- 텍스트 추출 및 구조화
- 다중 페이지 처리

**XLSX Skill:**
- 스프레드시트 데이터 분석
- 차트 및 그래프 해석
- 데이터 변환 및 정리

**Web Research Skill:**
- 웹 검색 및 정보 수집
- 여러 소스 비교 분석
- 요약 및 정리

### 2.4 커스텀 Skill 작성

**Skill 구조 (.claude/skills/custom-skill/):**
```
custom-skill/
├── skill.json          # Skill 메타데이터
├── system-prompt.md    # 시스템 프롬프트
└── tools.json         # 사용 가능한 도구 목록
```

**skill.json 예시:**
```json
{
  "name": "code-reviewer",
  "description": "Automated code review with security checks",
  "version": "1.0.0",
  "model": "claude-sonnet-4-5",
  "tools": ["Read", "Grep", "Bash"]
}
```

**system-prompt.md 예시:**
```markdown
# Code Reviewer Skill

You are an expert code reviewer focusing on:
1. Code quality and best practices
2. Security vulnerabilities
3. Performance optimizations
4. Test coverage

When reviewing code:
- Read the file thoroughly
- Check for common vulnerabilities (XSS, SQL injection, etc.)
- Suggest specific improvements
- Provide code examples
```

## 3. 실습 과제

### 과제 1: 내장 Skill 사용
PDF 또는 스프레드시트 파일이 있다면 해당 Skill을 사용하여 분석

```
"pdf skill로 문서를 분석해줘"
```

### 과제 2: Skill 탐색
사용 가능한 Skills 목록 확인

```
"사용 가능한 skills를 알려줘"
```

### 과제 3: 커스텀 Skill 설계
자신의 프로젝트에 필요한 Skill 설계 (구조만)

**예시:**
- Database Migration Skill
- API Documentation Skill
- Deployment Checklist Skill

## 4. 체크포인트

### ✅ Checkpoint 1: Skills 이해
- [ ] Skills의 개념과 일반 에이전트와의 차이를 이해한다
- [ ] Skills가 어떤 상황에서 유용한지 알고 있다
- [ ] Skill 도구를 사용하여 작업을 수행할 수 있다

### ✅ Checkpoint 2: 내장 Skills 활용
- [ ] 최소 1개의 내장 Skill을 사용해봤다
- [ ] Skill이 자동으로 제안되는 상황을 경험했다
- [ ] Skill 사용의 이점을 이해한다

### ✅ Checkpoint 3: 커스텀 Skill 설계
- [ ] 커스텀 Skill의 구조를 이해한다
- [ ] 자신의 프로젝트에 필요한 Skill을 설계할 수 있다
- [ ] skill.json과 system-prompt.md의 역할을 안다

## 5. 다음 단계

Module 8에서 Sub-Agent 아키텍처를 통해 복잡한 작업을 여러 에이전트로 분산하는 방법을 학습합니다.

---

# Module 8: Sub-Agent 아키텍처

## 1. 학습 목표

- Sub-Agent의 개념과 사용 사례를 이해합니다
- Task 도구를 사용하여 전문화된 에이전트를 실행하는 방법을 익힙니다
- 병렬 처리와 에이전트 간 협업 패턴을 학습합니다

## 2. 핵심 개념 설명

### 2.1 Sub-Agent란?

Sub-Agent는 메인 대화에서 파생된 독립적인 에이전트입니다.
- 전문화된 작업 수행
- 독립적인 컨텍스트
- 백그라운드 실행 가능
- 메인 에이전트에 결과 반환

### 2.2 사용 가능한 Sub-Agent 타입

**general-purpose:**
복잡한 다단계 작업, 코드 검색, 리서치

**Explore:**
코드베이스 탐색, 빠른 파일 검색, 패턴 분석

**Plan:**
구현 계획 수립, 아키텍처 설계, 트레이드오프 분석

**claude-code-guide:**
Claude Code 문서 검색, 기능 설명, API 사용법

### 2.3 Task 도구 사용법

**기본 사용:**
```
"Task 도구를 사용해서 Explore 에이전트로 코드베이스를 분석해줘"
```

**백그라운드 실행:**
```json
{
  "subagent_type": "general-purpose",
  "prompt": "모든 테스트 파일을 찾아서 커버리지를 분석해줘",
  "run_in_background": true
}
```

**결과 조회:**
```
"TaskOutput 도구로 백그라운드 작업 결과를 확인해줘"
```

### 2.4 병렬 처리 패턴

**여러 에이전트 동시 실행:**
```
"동시에 다음 작업을 수행해줘:
1. Explore 에이전트: API 엔드포인트 찾기
2. general-purpose 에이전트: 테스트 커버리지 분석
3. Plan 에이전트: 리팩토링 계획 수립"
```

### 2.5 실전 사용 사례

**대규모 코드베이스 분석:**
```
프롬프트: "Explore 에이전트로 이 프로젝트의 아키텍처를 분석해줘"
- 파일 구조 탐색
- 주요 컴포넌트 식별
- 의존성 관계 파악
```

**복잡한 리팩토링:**
```
프롬프트: "Plan 에이전트로 인증 시스템 리팩토링 계획을 세워줘"
- 현재 구조 분석
- 개선 방안 제안
- 단계별 마이그레이션 계획
```

**문서 검색:**
```
프롬프트: "claude-code-guide 에이전트로 MCP 서버 설정 방법을 찾아줘"
- 공식 문서 검색
- 예시 코드 제공
- 베스트 프랙티스 안내
```

## 3. 실습 과제

### 과제 1: Explore 에이전트 사용
```
"Explore 에이전트를 사용해서 현재 프로젝트의 모든 JavaScript 파일을 찾고 주요 함수들을 나열해줘"
```

### 과제 2: 병렬 에이전트 실행
```
"동시에 다음 작업을 수행해줘:
1. calculate-progress.js 분석
2. 테스트 파일 분석
3. 두 파일의 연관성 파악"
```

### 과제 3: claude-code-guide 에이전트 사용
```
"claude-code-guide 에이전트로 Hook의 모든 타입과 사용 예시를 찾아줘"
```

## 4. 체크포인트

### ✅ Checkpoint 1: Sub-Agent 이해
- [ ] Sub-Agent의 개념과 메인 에이전트와의 차이를 이해한다
- [ ] 각 Sub-Agent 타입의 특징과 용도를 알고 있다
- [ ] Task 도구를 사용하여 에이전트를 실행할 수 있다

### ✅ Checkpoint 2: 병렬 처리
- [ ] 여러 에이전트를 동시에 실행할 수 있다
- [ ] 백그라운드 실행과 결과 조회 방법을 안다
- [ ] 에이전트 간 작업 분배 전략을 이해한다

### ✅ Checkpoint 3: 실전 활용
- [ ] 실제 프로젝트에서 Sub-Agent를 활용할 수 있다
- [ ] 적절한 에이전트 타입을 선택할 수 있다
- [ ] 복잡한 작업을 에이전트로 분산할 수 있다

## 5. 다음 단계

### 🎊 축하합니다! 고급 과정 완료!

**전체 8개 모듈을 완료하셨습니다!**

### 🚀 마스터 레벨 활동

1. **커스텀 Skill 개발**
   - 프로젝트별 전문 Skill 작성
   - 팀과 Skill 공유
   - Skill 마켓플레이스 탐색

2. **에이전트 오케스트레이션**
   - 복잡한 워크플로우를 여러 Sub-Agent로 분산
   - 에이전트 간 통신 패턴 설계
   - 에러 핸들링 및 재시도 로직 구현

3. **프로덕션 적용**
   - CI/CD 파이프라인에 Claude 통합
   - 자동화된 코드 리뷰 시스템
   - 문서 생성 자동화

4. **커뮤니티 기여**
   - 유용한 Skill 공유
   - 에이전트 패턴 문서화
   - 오픈소스 기여

### 💡 고급 학습 자료

**Claude Agent SDK:**
- [Agent SDK Docs](https://github.com/anthropics/anthropic-sdk-typescript)
- 커스텀 에이전트 개발
- 독자적인 에이전트 시스템 구축

**Advanced Patterns:**
- Multi-agent collaboration
- Hierarchical agent systems
- Agent memory and state management

---

**Happy Mastering with Claude Code! 🎓**
