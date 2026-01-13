#!/bin/bash

# Claude Code 학습 환경 설정 스크립트 (WSL Ubuntu)
# 
# 사용법:
#   chmod +x setup-learning.sh
#   ./setup-learning.sh
#
# 또는 한 줄로:
#   bash <(cat setup-learning.sh)

set -e

echo "🚀 Claude Code 학습 환경을 설정합니다 (WSL Ubuntu)..."
echo ""

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. .claude/commands 디렉토리 생성
echo -e "${BLUE}[1/4]${NC} 커맨드 디렉토리 생성 중..."
mkdir -p .claude/commands

# 2. /learn 커맨드 생성
echo -e "${BLUE}[2/4]${NC} /learn 커맨드 생성 중..."
cat > .claude/commands/learn.md << 'EOF'
# Learn Command

Claude Code 학습 도우미입니다. 단계별로 Claude Code 사용법을 안내합니다.

## 사용 가능한 모듈

$ARGUMENTS 파라미터로 학습할 모듈을 선택하세요:

- `1` 또는 `basics`: 기초 설정
- `2` 또는 `core`: 핵심 기능
- `3` 또는 `context`: 컨텍스트 관리  
- `4` 또는 `advanced`: 고급 기능
- `5` 또는 `extend`: 확장 기능
- `6` 또는 `team`: 팀 도입 전략
- `quiz`: 이해도 확인 퀴즈
- `status`: 현재 진행 상황

## 응답 형식

선택된 모듈에 대해 다음을 제공해주세요:

### 1. 학습 목표 (3줄 이내)
### 2. 핵심 개념 설명 (코드 예시 포함)
### 3. 실습 과제 3개 (현재 프로젝트에서 바로 실행 가능)
### 4. 체크포인트 3개
### 5. 다음 단계 추천

## 참고
- CLAUDE.md 파일에 정의된 커리큘럼을 참조하세요
- `status` 입력 시 CLAUDE.md의 체크박스 상태를 분석하세요
- `quiz` 입력 시 학습 내용에 대한 퀴즈 3문제 출제
EOF

# 3. /practice 커맨드 생성
echo -e "${BLUE}[3/4]${NC} /practice 커맨드 생성 중..."
cat > .claude/commands/practice.md << 'EOF'
# Practice Command

실습 과제를 제공하고 결과를 검증하는 학습 도우미입니다.

## 사용법

$ARGUMENTS로 실습 유형을 선택하세요:

- `file`: 파일 생성/수정 실습
- `debug`: 디버깅 실습
- `git`: Git 워크플로우 실습
- `refactor`: 리팩토링 실습
- `test`: 테스트 작성 실습
- `document`: 문서화 실습
- `random`: 랜덤 실습 과제

## 응답 형식

1. **실습 과제**: 현재 프로젝트에 맞는 구체적 과제
2. **힌트**: 도움이 될 Claude Code 명령어/팁
3. **예상 결과**: 완료 시 나와야 할 결과
4. **검증 방법**: 완료 확인 명령어

## 난이도
`/practice file easy` 또는 `/practice debug hard` 형식으로 난이도 조절 가능

## 주의
- 현재 프로젝트의 실제 파일 구조를 먼저 분석
- 기존 코드를 망가뜨리지 않는 안전한 실습 제안
EOF

# 4. /tips 커맨드 생성
cat > .claude/commands/tips.md << 'EOF'
# Tips Command

Claude Code 사용 팁과 트릭을 제공합니다.

## 카테고리

$ARGUMENTS로 팁 카테고리를 선택하세요:

- `shortcut`: 단축키 및 핫키
- `prompt`: 효과적인 프롬프트 작성법
- `workflow`: 추천 워크플로우
- `debug`: 디버깅 팁
- `performance`: 성능 최적화 팁
- `daily`: 오늘의 랜덤 팁

## 응답 형식

선택된 카테고리에 대해:
1. 핵심 팁 3-5개 (구체적 예시 포함)
2. 실제 사용 시나리오
3. 주의사항 또는 흔한 실수
EOF

# 5. CLAUDE.md 생성 (이미 있으면 백업)
echo -e "${BLUE}[4/4]${NC} CLAUDE.md 생성 중..."
if [ -f "CLAUDE.md" ]; then
    echo -e "${YELLOW}  ⚠️  기존 CLAUDE.md를 CLAUDE.md.backup으로 백업합니다${NC}"
    cp CLAUDE.md CLAUDE.md.backup
fi

cat > CLAUDE.md << 'EOF'
# Claude Code 학습 가이드

> 이 문서는 Claude Code를 체계적으로 학습하기 위한 커리큘럼입니다.

## 📋 학습 진행 상황

- [ ] Module 1: 기초 설정
- [ ] Module 2: 핵심 기능
- [ ] Module 3: 컨텍스트 관리
- [ ] Module 4: 고급 기능
- [ ] Module 5: 확장 기능
- [ ] Module 6: 팀 도입 전략

## 🎯 Quick Start

```bash
# 학습 시작
/learn 1

# 실습하기
/practice file

# 팁 보기
/tips daily

# 진행 상황 확인
/learn status
```

## 📚 참고 자료

- [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/quickstart)
- [Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Anthropic Academy](https://anthropic.skilljar.com/claude-code-in-action)

---

*자세한 커리큘럼은 `/learn` 커맨드로 확인하세요*
EOF

echo ""
echo -e "${GREEN}✅ 설정 완료!${NC}"
echo ""
echo "생성된 파일:"
echo "  📄 CLAUDE.md (학습 가이드)"
echo "  📁 .claude/commands/"
echo "     ├── learn.md (/learn 커맨드)"
echo "     ├── practice.md (/practice 커맨드)"
echo "     └── tips.md (/tips 커맨드)"
echo ""
echo -e "${BLUE}시작하려면:${NC}"
echo "  1. claude 명령어로 Claude Code 실행"
echo "  2. /learn 1 입력하여 학습 시작"
echo ""
echo "Happy Learning! 🎉"
