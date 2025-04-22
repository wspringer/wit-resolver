import { describe, it, expect } from "vitest";
import { ResolvedSchema } from "./schema.js";

const sample =
  '{"worlds":[],"interfaces":[{"name":"foo","types":{},"functions":{},"package":0}],"types":[],"packages":[{"name":"local:test","interfaces":{"foo":0},"worlds":{}}]}';

describe("schema", () => {
  it("should validate", () => {
    const parsed = JSON.parse(sample);
    expect(() => ResolvedSchema.safeParse(parsed)).not.toThrow();
  });
});
