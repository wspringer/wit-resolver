import { Resolver } from "./resolver.js";
import { describe, it, expect } from "vitest";
import { ResolvedSchema } from "./schema.js";

describe("Resolver", () => {
  const resolve = (
    wit: string
  ): [object, ReturnType<typeof ResolvedSchema.safeParse>] => {
    const resolver = Resolver.create();
    resolver.register("test.wit", wit);
    const raw = resolver.raw();
    return [raw, ResolvedSchema.safeParse(raw)];
  };

  it("should handle an empty interface", () => {
    const [, resolved] = resolve(`
      package local:test;
      interface foo { }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved).toHaveProperty("data");
    expect(resolved.data).toHaveProperty("worlds");
    expect(resolved.data).toMatchSnapshot();
  });

  it("should handle an interface with a function returning unit", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo {
        bar: func();
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should handle an interface with a function returning a string", () => {
    const [, resolved] = resolve(`
      package local:test;
      interface foo {
        bar: func() -> string;
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should handle an interface with a function returning a result", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo {
        bar: func() -> result<string, string>;
      }
    `);
    console.info(raw);
    console.info(resolved.error);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should handle an interface with a function accepting a result", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo {
        bar: func(a: result<string, string>);
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should handle an interface with a resource", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo {
        resource bar {
          constructor(a: string);
        }
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should handle an interface with a resource with a method", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo {
        resource bar {
          baz: func();
        }
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should handle an interface with a resource with a static method", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo {
        resource bar {
          baz: static func();
        }
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should support all of the type definitions (enums, variants, etc.)", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo {
        enum bar {
          baz,
          qux
        }
        variant baz {
          qux,
          quux(string)
        }
        type foo = option<string>;
        type foos = list<foo>;
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should allow you define a world", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      interface foo-items {
        bar: func() -> list<string>;
      }
      world foo {
        import foo-items;
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });

  it("should allow you to use nested packages", () => {
    const [raw, resolved] = resolve(`
      package local:test;
      package foo:bar {
        interface foo-items {
          bar: func() -> list<string>;
        }
      }
      world foo {
        import foo:bar/foo-items;
      }
    `);
    expect(resolved.success).toBe(true);
    expect(resolved.data).toMatchSnapshot();
  });
});
