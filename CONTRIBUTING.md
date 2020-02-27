# Contributing

## Branch Naming

```text
type/humanFriendlyDescription
```

Example:

```text
chore/upgradeLodashToLatestVersion
```

## Commit Format

Commit message is validated with
<https://github.com/conventional-changelog/commitlint#readme>
on commit via git hook.

Message structure must be:

```text
type(scope?): subject
```

Valid types are:

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Real world examples can look like this:

```text
chore: upgrade lodash to latest version
```

```text
feat(blog): add comment section
```

## Code Quality and Security Audit

Your changes will be validated by a CI pipeline anyway,
but you may want to lint your files and audit packages before pushing:

```sh
npm run lint
npm run audit-security
```
