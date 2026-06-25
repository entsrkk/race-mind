---
name: suggest-commit-message
description: เสนอข้อความ commit แบบ Conventional Commits จาก git diff หรือไฟล์ที่เปลี่ยนแปลง โดย subject line เป็นภาษาอังกฤษและเพิ่ม body เมื่อจำเป็น ใช้สกิลนี้ทุกครั้งที่ผู้ใช้ขอให้เขียน เสนอ หรือสรุปข้อความ commit, พูดถึง "commit message", "commit", "เขียน commit ให้หน่อย", "ช่วยตั้งชื่อ commit" หรือเมื่อผู้ใช้ stage การเปลี่ยนแปลงไว้แล้วต้องการประโยคสรุปการเปลี่ยนแปลง แม้ผู้ใช้จะไม่ได้พูดคำว่า "commit message" ตรงๆ ก็ตาม
---

# Suggest Commit Message

This skill produces commit messages that make it immediately clear *what* a change does and, when relevant, *why* — following the Conventional Commits standard.

## Workflow

1. **Get the diff** — Always run `git diff --staged` first, since that is what will actually be committed.
   - If nothing is staged, run `git diff` (unstaged) and tell the user you are looking at unstaged changes.
   - If the user already pasted a diff or described the change in chat, use that directly — no need to run git.
2. **Understand intent** — Interpret *why* the code changed, not just which files were touched. A rename, removing dead code, and adding a feature all signal different intent.
3. **Check atomicity** — If the diff mixes unrelated changes (e.g. a bug fix plus a new feature), warn the user that these should be separate commits and propose one message per logical group.
4. **Propose the message** in the format below. If multiple readings are reasonable (e.g. it could be `refactor` or `perf`), offer the options with a brief rationale.

## Format: Conventional Commits

```
<type>: <subject>

<body — when needed>

<footer — when needed>
```

**Do NOT use a scope in parentheses after the type.** Write `style: ...`, never `style(claims-motor): ...`. The type alone is enough; put any module or area context into the subject text instead if it helps.

### Types

| type | use when |
|------|----------|
| `feat` | a new user-facing feature |
| `fix` | a bug fix |
| `docs` | documentation-only changes |
| `style` | formatting with no logic impact (whitespace, semicolons) |
| `refactor` | restructuring code without adding features or fixing bugs |
| `perf` | improving speed or resource usage |
| `test` | adding or fixing tests |
| `build` | build system or dependency changes |
| `ci` | CI config or script changes |
| `chore` | general maintenance that fits no other type |

### Subject line rules (English)

- Use the **imperative mood**, like a command: "add", "fix", "remove" — not "added" / "adds".
- Start lowercase, no trailing period.
- Keep it concise, under ~50 characters.
- Describe *what the change does*, not *which file changed*.
- No scope in parentheses — see the format note above.

### When to include a body

Add a body (after one blank line below the subject) when the subject alone is not enough — especially to explain **why**, or context a reviewer should know: the reasoning behind a decision, the impact, or a trade-off. If the change is self-explanatory, skip the body.

Write the body in imperative or prose; wrap lines around 72 characters.

### Breaking changes

For a breaking change, add `!` after the type and explain it in the footer:

```
feat!: change auth token format to JWT

BREAKING CHANGE: clients must re-authenticate; old session tokens are rejected.
```

## Examples

**Example 1 — simple change, no body needed**

Change: reject signup when the email is already registered
```
feat: reject signup with already-registered email
```

**Example 2 — body needed to explain "why"**

Change: move the session cache from in-memory to Redis
```
refactor: move session cache to Redis

In-memory cache did not survive deploys and broke logins during
rolling restarts. Redis keeps sessions shared across instances.
```

**Example 3 — warn to split commits**

If the diff contains both a login bug fix and a new settings page, tell the user:
"This diff mixes two unrelated changes — I'd suggest splitting them into two commits:"
```
fix: handle expired token on refresh
feat: add notification preferences page
```

## Notes

- Propose the *message* for the user to apply themselves — do not run `git commit` unless the user explicitly asks.
- If the diff is very large and hard to summarize, focus on the primary change and tell the user which minor parts you skipped.
