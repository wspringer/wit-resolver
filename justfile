# Build the WASM package
build-wasm:
    @just --justfile wit-resolver-wasm/justfile build

# Build the TypeScript package
build-ts:
    @just --justfile wit-resolver-ts/justfile build

# Build both packages, ensuring WASM is built first
build: build-wasm
    @just build-ts

# Clean all build artifacts
clean:
    @just --justfile wit-resolver-wasm/justfile clean
    @just --justfile wit-resolver-ts/justfile clean

# Run all tests
test:
    @just --justfile wit-resolver-wasm/justfile test
    @just --justfile wit-resolver-ts/justfile test

# Install all dependencies
install:
    @just --justfile wit-resolver-ts/justfile install

# Default recipe to run when just is called without arguments
default: build
