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

      formatter.${system} = pkgs.nixfmt;
    };
}
