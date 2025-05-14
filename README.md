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

## Building the Project

### Prerequisites

- Node.js and npm
- Rust and Cargo
- [just](https://github.com/casey/just) command runner

### Build Steps

1. Install dependencies:

   ```bash
   just install
   ```

2. Build the project:

   ```bash
   just build
   ```

This will build both the WASM component and the TypeScript wrapper in the correct order.

### Available Commands

- `just build` - Build both packages (WASM first, then TypeScript)
- `just build-wasm` - Build only the WASM package
- `just build-ts` - Build only the TypeScript package
- `just clean` - Clean all build artifacts
- `just test` - Run all tests
- `just install` - Install all dependencies
