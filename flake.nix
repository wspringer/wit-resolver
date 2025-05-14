{
  description = "WIT Resolver - A TypeScript library for parsing WIT files";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Build tools
            just
            nodejs_20
            rustc
            cargo
            wasm32-wasi-toolchain

            # Development tools
            rust-analyzer
            nodePackages.typescript-language-server
          ];

          shellHook = ''
            # Ensure we're using the correct Node.js version
            export PATH="${pkgs.nodejs_20}/bin:$PATH"

            # Set up Rust for WASM
            export RUST_TARGET_PATH="${pkgs.rustc}/lib/rustlib"
            export RUSTFLAGS="-C target-feature=+crt-static"
          '';
        };
      });
}
