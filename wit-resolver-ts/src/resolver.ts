import { ResolvedSchema } from "./schema.js";
import { Resolved } from "./types.js";
import * as component from "./wit_resolver_wasm.js";

const WasmResolver = component.types.Resolver;

export interface Resolver {
  register(name: string, source: string): void;
  raw: () => object;
  resolve(): Resolved;
}

export function Resolver(): Resolver {
  const resolver = new WasmResolver();
  const raw = () => {
    const result = resolver.resolve();
    const parsed = JSON.parse(result);
    return parsed;
  };
  return {
    register: (name, source) => {
      resolver.register(name, source);
    },
    raw,
    resolve: () => {
      const parsed = raw();
      return ResolvedSchema.parse(parsed);
    },
  };
}
