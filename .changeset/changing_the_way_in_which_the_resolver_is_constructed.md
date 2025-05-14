---
wit-resolver-ts: minor
---

# Resolver construction using `Resolver.create()`

In the previous version, the `Resolver` had to be constructed like this:

```typescript
const resolver = Resolver();
```

In the latest version, this shifted to:

```typescript
const resolver = Resolver.create();
```
