# README

A TypeScript library for parsing the contents of a (number of) WIT file(s), and
return the contents in a structured format for further analysis of processing.

This project exists of two sub projects:

- `wit-resolver-wasm`: A WASM component exposing the relevant low-level tools
  from based Rust's `wit-parser` crate.
- `wit-resolver-ts`: A TypeScript wrapper, providing easy access to the WASM
  component, wrapping it in a sensible typed API.

You would typically only interact with the `wit-resolver-ts` NPM module. Check
the corresponding documentation [here](./wit-resolver-ts/README.md).
