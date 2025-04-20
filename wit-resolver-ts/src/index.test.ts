import { Resolver } from "./index.js";
import { describe, it, expect } from "vitest";
describe("Resolver", () => {
  it("should allow you to resolve wit", () => {
    const resolver = new Resolver();
    resolver.register(
      "test.wit",
      `
      package local:test;
      interface foo { }
    `
    );
    const resolved = resolver.resolve();
    expect(resolved).toMatchSnapshot();
  });
});
