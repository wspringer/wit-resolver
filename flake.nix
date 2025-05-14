{
  description = "WIT Resolver - A TypeScript library for parsing WIT files";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { self, nixpkgs, flake-utils, rust-overlay }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ rust-overlay.overlays.default ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Build tools
            just
            nodejs_20
            git
            (rust-bin.stable.latest.default.override {
              extensions = [ "rust-src" ];
              targets = [ "wasm32-wasip1" ];
            })

            # Development tools
            rust-analyzer
            nodePackages.typescript-language-server
          ];

          shellHook = ''
            # Ensure we're using the correct Node.js version
            export PATH="${pkgs.nodejs_20}/bin:$PATH"

            # Set up SCM Breeze
            if [ ! -d "$HOME/.scm_breeze" ]; then
              git clone https://github.com/scmbreeze/scm_breeze.git "$HOME/.scm_breeze"
              "$HOME/.scm_breeze/install.sh"
            fi

            # Source SCM Breeze if it exists
            if [ -s "$HOME/.scm_breeze/scm_breeze.sh" ]; then
              source "$HOME/.scm_breeze/scm_breeze.sh"
            fi

            ggpush() {
              git push origin "$(git rev-parse --abbrev-ref HEAD)"
            }
            export -f ggpush
          '';
        };
      });
}
