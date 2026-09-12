# Software Development Life Cycle (SDLC) & Git Workflow

## 1. Branching Strategy

We follow GitHub Flow with strict issue-linked feature branches:

```
main (production-ready code)
  └── feature/issue-1-canteen-qr-order (feature development)
        ├── commit: init repository & docs
        ├── commit: implement OrderContext and sync engine
        ├── commit: build Customer UI & Receipt Card QR generator
        ├── commit: build Kitchen Dashboard with Audio Chime
        └── commit: build Staff Counter QR Scanner & Cash Collect
```

---

## 2. GitHub Issue & PR Lifecycle

1. **Issue Creation**:
   - Title: `[Epic: E6] Canteen Quick-Order & QR Token Fulfillment System (Scan, Pay & Collect)`
   - Labels: `enhancement`, `epic`, `documentation`

2. **Branch Creation**:
   - Command: `git checkout -b feature/issue-1-canteen-qr-order`

3. **Development & Validation**:
   - Incremental commits with semantic commit messages (`feat: ...`, `docs: ...`, `fix: ...`).
   - Pre-commit verification (lint, build).

4. **Pull Request (PR) & Auto-Closure**:
   - Push branch: `git push -u origin feature/issue-1-canteen-qr-order`
   - PR Title: `feat: Implement Canteen Quick-Order & QR Token Fulfillment System (#1)`
   - Description must contain: `Closes #1` or `Fixes #1` to automatically close the associated issue upon PR merge.
   - Merge strategy: Rebase and merge or Squash and merge into `main`.
