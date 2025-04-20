import * as component from "./wit_resolver_wasm.js";
export const Resolver = component.types.Resolver;
const resolver = new Resolver();
resolver.register("test.wit", `
  package local:test;
  interface foo { }
`);
console.info("Something is happening");
console.info(resolver.resolve());
