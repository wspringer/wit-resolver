# README

A TypeScript module to deal with WIT files. It exposes a `Resolver` that allows
you to register a number of WIT files and resolve them into a data structure
that is a typed version of the data found in the WIT files.

## Usage

This is work in progress, however, this is how you would typically use it:

```typescript
import { Resolver } from "wit-resolver-ts";

const resolver = Resolver();
resolver.register(
  "test.wit",
  `
  package local:test;

  interface foo {
    bar: func() -> result<string, string>;
  }
`
);
const resolved = resolver.resolver();
```

This produces a `Resolved` object (see the [Type Definitions](#type-definitions)
down below) that in this cases resembles something like this:

```json
{
  "interfaces": [
    {
      "functions": {
        "bar": {
          "kind": "freestanding",
          "name": "bar",
          "params": [],
          "result": 0
        }
      },
      "name": "foo",
      "package": 0,
      "types": {}
    }
  ],
  "packages": [
    {
      "interfaces": {
        "foo": 0
      },
      "name": "local:test",
      "worlds": {}
    }
  ],
  "types": [
    {
      "kind": {
        "result": {
          "err": "string",
          "ok": "string"
        }
      },
      "name": null,
      "owner": null
    }
  ],
  "worlds": []
}
```

<a name="type-definitions"/>
## Type Definitions

```typescript
// Basic type aliases
type TypeId = number;
type InterfaceId = number;
type WorldId = number;
type PackageId = number;

// Basic types
type Type =
  | "bool"
  | "u8"
  | "u16"
  | "u32"
  | "u64"
  | "s8"
  | "s16"
  | "s32"
  | "s64"
  | "f32"
  | "f64"
  | "char"
  | "string"
  | "error-context"
  | TypeId;

type Handle = { own: TypeId } | { borrow: TypeId };

interface Field {
  name: string;
  type: Type;
  docs?: string;
}

interface Flag {
  name: string;
  docs?: string;
}

interface Case {
  name: string;
  type?: Type;
  docs?: string;
}

interface EnumCase {
  name: string;
  docs?: string;
}

type TypeDefKind =
  | { record: { fields: Field[] } }
  | "resource"
  | { handle: Handle }
  | { flags: { flags: Flag[] } }
  | { tuple: { types: Type[] } }
  | { variant: { cases: Case[] } }
  | { enum: { cases: EnumCase[] } }
  | { option: Type }
  | { result: { ok?: Type; err?: Type } }
  | { list: Type }
  | { future: Type | undefined }
  | { stream: Type | undefined }
  | { type: Type };

type TypeOwner = { world: WorldId } | { interface: InterfaceId } | null;

interface TypeDef {
  name: string | null;
  kind: TypeDefKind;
  owner: TypeOwner;
  docs?: string;
  stability?: string;
}

type FunctionKind =
  | "freestanding"
  | "async-freestanding"
  | { method: TypeId }
  | { "async-method": TypeId }
  | { static: TypeId }
  | { "async-static": TypeId }
  | { constructor: TypeId };

interface Function {
  name: string;
  kind: FunctionKind;
  params: Array<{
    name: string;
    type: Type;
  }>;
  result?: Type;
  docs?: string;
  stability?: string;
}

interface Interface {
  name?: string;
  types: Record<string, TypeId>;
  functions: Record<string, Function>;
  docs?: string;
  stability?: string;
  package?: PackageId;
}

type WorldItem =
  | {
      interface: {
        id: InterfaceId;
        stability?: string;
      };
    }
  | { function: Function }
  | { type: TypeId };

interface World {
  name: string;
  imports: Record<string, WorldItem>;
  exports: Record<string, WorldItem>;
  package?: PackageId;
  docs?: string;
  stability?: string;
}

interface Package {
  name: string;
  docs?: string;
  interfaces: Record<string, InterfaceId>;
  worlds: Record<string, WorldId>;
}

interface Resolved {
  worlds: World[];
  interfaces: Interface[];
  types: TypeDef[];
  packages: Package[];
}
```
