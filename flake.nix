{
  description = "ojuny-site - GitHub Pages site for ojuny";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          git
          nodejs_24
          python3
          nixfmt
        ];
      };

      apps.${system}.ci = {
        type = "app";
        program = "${
          pkgs.writeShellApplication {
            name = "ci";
            runtimeInputs = [ pkgs.nix pkgs.git ];
            text = ''
              exec nix develop -c bash -c '
                if [ ! -d node_modules ]; then npm ci; fi
                npm run check
                node scripts/check-docs.mjs
                node scripts/docs-metrics.mjs --json
                SITE_URL=https://ojuny-project.github.io SITE_BASE=/ npm run build
              '
            '';
          }
        }/bin/ci";
      };

      formatter.${system} = pkgs.nixfmt;
    };
}
