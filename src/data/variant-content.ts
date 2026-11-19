export interface VariantContent {
  intro: {
    kicker: string;
    title: string;
    body: string[];
    stats: { value: string; label: string }[];
  };
  capabilities: { title: string; body: string }[];
  workflow: { title: string; body: string }[];
  install: { title: string; body: string; page: string }[];
  requirements: string[];
  limits: string[];
  docs: { title: string; body: string; page: string }[];
}

export const VARIANT_CONTENT: Record<string, VariantContent> = {
  pro: {
    intro: {
      kicker: "Workplace edition",
      title: "A workstation that looks like work, down to the login screen.",
      body: [
        "Pro takes the Ojuny template shape and swaps MangoWM for GNOME. The flake contract, generated machine data, settings GUI, and patch switch stay, while the desktop gains GDM, a reviewed extension set, and a security baseline a workplace can read.",
        "Pro is individualized. It has no Fleet enrollment, no shared control plane, and no tenant wiring. A person can read the flake and hand the machine to the next person who sits at it.",
      ],
      stats: [
        { value: "3", label: "layout presets" },
        { value: "GNOME", label: "desktop" },
        { value: "26.11", label: "stable target" },
        { value: "1", label: "readable flake" },
      ],
    },
    capabilities: [
      {
        title: "GNOME, not a lookalike",
        body: "A real GNOME session with GDM, portals, and the same account contract as the core template. The desktop is the working surface, not a skin over a tiling window manager.",
      },
      {
        title: "Three layout presets",
        body: "Default GNOME, a Windows-like layout, and a macOS-like layout. Presets change panels, the dock, overview behavior, and keybindings without changing the application set.",
      },
      {
        title: "Security baseline",
        body: "Firewall default deny, SSH off, LUKS offered at install, and Secure Boot through the established post-install path. The security page records the controls and the exceptions.",
      },
      {
        title: "Reviewed extensions",
        body: "GNOME extensions come from a pinned allowlist. The flake records the source and the settings, so an extension cannot appear at login from an unverified URL.",
      },
      {
        title: "Same template contract",
        body: "The installer, the settings GUI, the CLI, and the patch system consume Pro without a product-specific fork of their own logic. Generated hardware, host, and user modules are the same shape.",
      },
      {
        title: "Individualized by default",
        body: "No enrollment path and no remote management connection. Pro is a single workplace machine that a person owns, not a managed fleet endpoint.",
      },
    ],
    workflow: [
      {
        title: "Choose a preset",
        body: "The installer offers the default, Windows-like, or macOS-like layout. The choice is stored in the flake and can change later from the desktop page.",
      },
      {
        title: "Sign in at GDM",
        body: "The account contract matches the core template. The greeter, session, and display manager are part of the Pro desktop layer.",
      },
      {
        title: "Set the baseline",
        body: "The security page exposes the firewall, SSH, update policy, disk encryption status, and the reviewed extension set.",
      },
      {
        title: "Rebuild or update",
        body: "The flake stays the source of truth. A rebuild applies a preset, an extension change, or a security control without hand-editing dconf.",
      },
    ],
    install: [
      {
        title: "Attended ISO",
        body: "The workplace image with guided disk, encryption, preset, and security choices.",
        page: "installation",
      },
      {
        title: "Unattended ISO",
        body: "A declarative answer file installs the preset without interaction.",
        page: "installation",
      },
      {
        title: "Existing NixOS",
        body: "Add the Pro desktop and template modules to a machine that already runs NixOS.",
        page: "installation",
      },
      {
        title: "Fork the template",
        body: "Fork the flake, run setup, and keep the generated machine data out of the tracked tree.",
        page: "installation",
      },
    ],
    requirements: [
      "x86_64-linux",
      "UEFI recommended, BIOS supported through GRUB",
      "Online install with an optional offline closure",
      "LUKS2 root encryption offered at install",
      "Secure Boot enrollment after install, within the documented hardware limits",
      "No Wi-Fi in the unattended path",
    ],
    limits: [
      "No Fleet enrollment or central management",
      "No custom Pro package repository",
      "No certification, enterprise support, or MDM replacement",
      "No alternate desktop beyond GNOME",
      "No gaming stack, launcher integrations, or Windows runtime by default",
      "No promise of third-party application support",
    ],
    docs: [
      {
        title: "Overview",
        body: "The product shape, who it targets, and how it relates to the core template.",
        page: "overview",
      },
      {
        title: "Installation",
        body: "The install media, the preset choice, and the security questions.",
        page: "installation",
      },
      {
        title: "Configuration",
        body: "The settings pages and the options behind them.",
        page: "configuration",
      },
      {
        title: "GNOME presets",
        body: "The three layouts and what each one changes.",
        page: "gnome-presets",
      },
      {
        title: "Security",
        body: "The baseline, the trusted input rules, and the exceptions.",
        page: "security",
      },
      {
        title: "Troubleshooting",
        body: "What to check when the session, greeter, or install does not behave.",
        page: "troubleshooting",
      },
    ],
  },

  console: {
    intro: {
      kicker: "Living room edition",
      title: "The TV gets the first screen.",
      body: [
        "Console boots into Steam Big Picture under a gamescope session. There is no desktop shell in front of it, no launcher to dig through, and no keyboard required for the first hour.",
        "When the game session ends, the desktop is still there as a second target. The machine is a console first and a desktop second, not a desktop with a controller plugged in.",
      ],
      stats: [
        { value: "1", label: "local account" },
        { value: "0", label: "desktops in front" },
        { value: "2", label: "session targets" },
        { value: "1", label: "controller path" },
      ],
    },
    capabilities: [
      {
        title: "Steam Big Picture first",
        body: "The gaming session runs Steam in Big Picture mode under a gamescope wrapper. The standard steam.desktop entry is never written, replaced, or claimed.",
      },
      {
        title: "Controller-first settings",
        body: "A local settings frontend exposes display, audio, controllers, power, and session behavior from the couch, with a layout that stays readable from a TV.",
      },
      {
        title: "Millennium theme",
        body: "An optional Big Picture theme is generated for the console session. It is part of the session layer, not a patch on a user profile.",
      },
      {
        title: "Auto-login or greeter",
        body: "Auto-login can select the gaming session on boot. Turning it off restores the greeter and the session picker.",
      },
      {
        title: "A real desktop target",
        body: "The desktop remains a selectable session. Leaving a game does not drop the machine to a black screen or a bare TTY.",
      },
      {
        title: "Recovery path",
        body: "If the gaming session fails, the recovery path starts the desktop or a login prompt instead of leaving the TV dark.",
      },
    ],
    workflow: [
      {
        title: "Boot to the couch",
        body: "The console session starts Steam Big Picture without a desktop shell in front of it.",
      },
      {
        title: "Pair a controller",
        body: "Controller profiles, dead zones, and per-controller settings are available from the console settings page.",
      },
      {
        title: "Sign in to Steam",
        body: "The account belongs to the user. The system stores no Steam account in the repository.",
      },
      {
        title: "Leave the game",
        body: "Exiting the gaming session offers the desktop target, so management and non-Steam work do not need a reinstall.",
      },
    ],
    install: [
      {
        title: "Attended ISO",
        body: "Boot, choose a disk, create the console account, and reboot into Big Picture.",
        page: "installation",
      },
      {
        title: "Unattended ISO",
        body: "Install the console preset from a declarative answer file.",
        page: "installation",
      },
      {
        title: "Raw disk image",
        body: "A prepared image for dedicated console hardware.",
        page: "installation",
      },
      {
        title: "Existing NixOS",
        body: "Add the session layer and the console template to a machine that already runs NixOS.",
        page: "installation",
      },
    ],
    requirements: [
      "x86_64-linux",
      "A GPU and display path that gamescope supports",
      "A controller for the first-run path",
      "A Steam account owned by the user",
      "HDR and VRR depend on the GPU, kernel, Mesa, and display",
      "Wired or wireless network for the online install",
    ],
    limits: [
      "No game compatibility guarantee",
      "No DRM circumvention",
      "No handheld support",
      "No multi-user console mode",
      "No hardware certification",
      "No Steam account storage in the repository",
    ],
    docs: [
      {
        title: "Overview",
        body: "What the console is and how the session fits together.",
        page: "overview",
      },
      {
        title: "Installation",
        body: "The install flow and the first boot.",
        page: "installation",
      },
      {
        title: "Sessions",
        body: "The gaming session, the desktop target, and the recovery path.",
        page: "sessions",
      },
      {
        title: "Controllers",
        body: "Pairing, profiles, dead zones, and the settings frontend.",
        page: "controllers",
      },
      {
        title: "Steam",
        body: "Big Picture, the shortcut, and the Millennium theme.",
        page: "steam",
      },
      {
        title: "Troubleshooting",
        body: "What to check when the session or the controller does not behave.",
        page: "troubleshooting",
      },
    ],
  },

  fleet: {
    intro: {
      kicker: "Control plane",
      title: "Declare the fleet once.",
      body: [
        "Fleet is a self-hosted control plane for a set of Ojuny machines. The controller owns the host and shared services, the manager edits the managed Nix files through a browser, and the endpoint template runs on enrolled machines.",
        "Git and Nix stay the source of truth. A deployment is reproducible from a commit, and the controller records what was deployed, when, and to which endpoint.",
      ],
      stats: [
        { value: "1", label: "controller" },
        { value: "3", label: "roles" },
        { value: "N", label: "endpoints" },
        { value: "1", label: "managed flake" },
      ],
    },
    capabilities: [
      {
        title: "Controller host",
        body: "A headless NixOS template for the host that owns the deployment queue, VPN, cache, DNS, NFS, backup targets, and install media.",
      },
      {
        title: "Web manager",
        body: "Users, groups, endpoints, servers, applications, policies, templates, deployments, and logs in one browser interface over the same Nix files.",
      },
      {
        title: "Endpoint template",
        body: "Enrolled machines run an integrated endpoint template from the controller repository. There is no separate endpoint repository to keep in sync.",
      },
      {
        title: "Deployment engine",
        body: "deploy-rs for an existing NixOS target and nixos-anywhere for a fresh machine. Pre-addressed live ISOs can be built for several targets at once.",
      },
      {
        title: "Shared services",
        body: "Hydra and nix-serve-ng for the fleet cache, NFS shares, centralized backup, internal DNS, and an optional Git host behind the internal proxy.",
      },
      {
        title: "Policy and audit",
        body: "Policies are Nix modules bound at user, group, device, or application level. Deployments and access actions are recorded for review.",
      },
    ],
    workflow: [
      {
        title: "Enroll a machine",
        body: "Add the endpoint declaration, hardware data, and device-bound policies from the manager or the managed flake.",
      },
      {
        title: "Edit the source",
        body: "Every entity is a Nix file. The manager edits the file, checks it, and shows a diff before anything is saved or deployed.",
      },
      {
        title: "Build and deploy",
        body: "The controller builds the endpoint configuration and queues a push through deploy-rs or provisions a new machine with nixos-anywhere.",
      },
      {
        title: "Watch the fleet",
        body: "Deployment logs, live statistics, remote SSH, and the audit trail stay in one place.",
      },
    ],
    install: [
      {
        title: "Controller ISO",
        body: "Provision the headless controller host and its shared services.",
        page: "installation",
      },
      {
        title: "Endpoint ISO",
        body: "Boot a prepared live image that is already addressed to the controller.",
        page: "endpoints",
      },
      {
        title: "Existing NixOS",
        body: "Push a managed configuration to a running machine with deploy-rs.",
        page: "installation",
      },
      {
        title: "Fresh machine",
        body: "Install over SSH with nixos-anywhere from a prepared repository.",
        page: "installation",
      },
    ],
    requirements: [
      "x86_64-linux on the controller and endpoints",
      "A trusted LAN and a VPN path for endpoints",
      "A Git remote for the managed flake",
      "KVM on the controller for VM tests",
      "Disk for the fleet cache and install media",
      "Internal DNS or stable addresses for the services",
    ],
    limits: [
      "Fleet does not manage Ojuny Pro, Console, or Home Server installations",
      "No multi-controller high availability",
      "No SSO, LDAP, or Kerberos compatibility layer",
      "No Windows management",
      "No chosen secrets backend",
      "No public control plane by default",
    ],
    docs: [
      {
        title: "Overview",
        body: "The controller, manager, endpoint, and the managed configuration model.",
        page: "overview",
      },
      {
        title: "Controller",
        body: "The host, shared services, cache, VPN, DNS, and deployment engine.",
        page: "controller",
      },
      {
        title: "Manager",
        body: "The browser interface, the entity model, and the editing rules.",
        page: "manager",
      },
      {
        title: "Endpoints",
        body: "The integrated endpoint template and the enrollment path.",
        page: "endpoints",
      },
      {
        title: "Security",
        body: "Accounts, roles, audit, network boundaries, and the trust model.",
        page: "security",
      },
      {
        title: "Troubleshooting",
        body: "What to check when a deployment, cache, or endpoint misbehaves.",
        page: "troubleshooting",
      },
    ],
  },

  minimal: {
    intro: {
      kicker: "Terminal edition",
      title: "Small enough to read in one sitting.",
      body: [
        "Minimal is a bare Ojuny template and the reference terminal installer. It installs, boots to a console login, and leaves desktops, settings GUIs, and patches to the fork.",
        "The template is the base a person starts from when the full desktop contains too much. The installer is generic, so one image can install any template that follows the Ojuny contract.",
      ],
      stats: [
        { value: "3", label: "generated modules" },
        { value: "9", label: "installer screens" },
        { value: "7", label: "engine phases" },
        { value: "1", label: "online ISO" },
      ],
    },
    capabilities: [
      {
        title: "Bare template",
        body: "A dendritic NixOS flake with base system configuration, networking, boot, users, and state version. No desktop, compositor, settings GUI, or patch switch by default.",
      },
      {
        title: "Generated machine data",
        body: "Hardware, host, and user modules are generated by setup. Personal data stays out of the tracked tree.",
      },
      {
        title: "Setup app",
        body: "nix run .#setup clones a fork, generates the machine files, and offers a rebuild.",
      },
      {
        title: "Check app",
        body: "nix run .#check validates the module names, scripts, and configuration before an install.",
      },
      {
        title: "Terminal installer",
        body: "A console-only live ISO with a full-screen TUI. It partitions, generates hardware, runs nixos-install, and finishes the configuration.",
      },
      {
        title: "Any conforming template",
        body: "The installer takes a template origin, so the same media can install Minimal, the full template, or another Ojuny product.",
      },
    ],
    workflow: [
      {
        title: "Fork the starter",
        body: "Clone the repository and keep the parts the machine needs. The tree is small enough to read end to end.",
      },
      {
        title: "Generate the machine",
        body: "Run setup to write the hardware, host, and user modules. The generated files are excluded from the tracked source.",
      },
      {
        title: "Check before install",
        body: "Run the template check with the system and static modes to catch missing modules before touching a disk.",
      },
      {
        title: "Boot the login",
        body: "Install from the terminal ISO or from an existing NixOS system, then boot to a console login.",
      },
    ],
    install: [
      {
        title: "Setup app",
        body: "nix run .#setup from a fork, then rebuild.",
        page: "installation",
      },
      {
        title: "Terminal ISO",
        body: "Boot the console live media, answer the screens, and install.",
        page: "installer",
      },
      {
        title: "Existing NixOS",
        body: "Run the installer app against a prepared flake on a running system.",
        page: "installation",
      },
      {
        title: "Fork and extend",
        body: "Start from the bare template and add the desktop, GUI, or patches the machine needs.",
        page: "template-shape",
      },
    ],
    requirements: [
      "x86_64-linux",
      "UEFI recommended, BIOS supported through GRUB",
      "An online install",
      "A prepared template repository",
      "A target disk that can be erased",
      "No desktop or display server required",
    ],
    limits: [
      "No desktop, compositor, or settings GUI",
      "No Home Manager input",
      "No offline or discovery image",
      "No multi-host shape",
      "No graphical installer",
      "No hardware certification program",
    ],
    docs: [
      {
        title: "Overview",
        body: "The template, the installer, and the contract between them.",
        page: "overview",
      },
      {
        title: "Template shape",
        body: "The generated modules, the flake outputs, and the minimum requirements.",
        page: "template-shape",
      },
      {
        title: "Installer",
        body: "The nine screens and the seven engine phases.",
        page: "installer",
      },
      {
        title: "Installation",
        body: "The setup app and the terminal install path.",
        page: "installation",
      },
      {
        title: "Limits",
        body: "What the template and installer deliberately do not do.",
        page: "limits",
      },
      {
        title: "Troubleshooting",
        body: "What to check when the check, preflight, or install fails.",
        page: "troubleshooting",
      },
    ],
  },

  "home-server": {
    intro: {
      kicker: "Appliance edition",
      title: "The quiet machine in the corner.",
      body: [
        "Home Server is a headless NixOS appliance with a web panel. A fresh install brings up the base system, firewall, panel, and the first administrator account. Everything else is off until an owner enables it.",
        "The service stack covers what a home network usually needs: DNS, ad blocking, a reverse proxy, VPN, a build cache, media, file sharing, and backup. The panel keeps the DNS and proxy records in step with the services that are on.",
      ],
      stats: [
        { value: "1", label: "web panel" },
        { value: "0", label: "services on by default" },
        { value: "N", label: "data disks" },
        { value: "1", label: "administrator" },
      ],
    },
    capabilities: [
      {
        title: "Panel and dashboard",
        body: "One page lists every enabled service with health, links, and storage, network, and backup summaries.",
      },
      {
        title: "Optional services",
        body: "DNS, AdGuard Home or Pi-hole, reverse proxy, WireGuard VPN, Hydra and nix-serve-ng, nix-cache-discovery, the ARR stack, Jellyfin, Jellyseerr, ownCloud, and backup.",
      },
      {
        title: "Storage and shares",
        body: "Disk detection, pool creation, mount layout, NFS exports, per-device and per-user access, and a generated mount patch for clients over LAN or VPN.",
      },
      {
        title: "First-run wizard",
        body: "Confirm the administrator, create the first pool and share, enable services one at a time, and finish with a dashboard of links.",
      },
      {
        title: "Health and backup",
        body: "SMART health, retention and scope policies, and a backup target are surfaced in the panel instead of a pile of timers.",
      },
      {
        title: "Recovery",
        body: "Panel recovery starts the panel and SSH only. A factory reset reinstalls the system and leaves data disks untouched by default.",
      },
    ],
    workflow: [
      {
        title: "Install the appliance",
        body: "Boot the image, select the system disk, configure the host and network, and create the administrator.",
      },
      {
        title: "Create the pool",
        body: "Select data disks for the storage pool and confirm the destructive choices. Data disks are never selected by accident.",
      },
      {
        title: "Enable services",
        body: "Open the panel, enable services one at a time, and let DNS and the proxy update with the service state.",
      },
      {
        title: "Keep it running",
        body: "Watch health, storage, and backup from the dashboard, and use the recovery mode when the panel or a service needs attention.",
      },
    ],
    install: [
      {
        title: "Attended ISO",
        body: "The appliance flow that ends at the panel login without a shell.",
        page: "installation",
      },
      {
        title: "Unattended ISO",
        body: "Install from a declarative answer file for a known machine.",
        page: "installation",
      },
      {
        title: "Raw disk image",
        body: "A prepared image for dedicated small-form-factor hardware.",
        page: "installation",
      },
      {
        title: "Existing NixOS",
        body: "Add the server modules to a machine that already runs NixOS.",
        page: "installation",
      },
    ],
    requirements: [
      "x86_64-linux",
      "A system disk and optional data disks",
      "A wired network for the first boot",
      "A browser for the panel",
      "Port forwarding only when the VPN needs it",
      "Data disks are separate from the system disk",
    ],
    limits: [
      "No silent erasure of a data disk",
      "No data recovery from a failed disk",
      "Factory reset leaves data disks untouched by default",
      "No Wi-Fi in the unattended path",
      "DNS is optional until enabled",
      "No service is on before the first-run wizard",
    ],
    docs: [
      {
        title: "Overview",
        body: "The appliance shape, the required parts, and the optional stack.",
        page: "overview",
      },
      {
        title: "Installation",
        body: "The media, the first-run wizard, and the panel handoff.",
        page: "installation",
      },
      {
        title: "Services",
        body: "The service matrix and what each panel toggle enables.",
        page: "services",
      },
      {
        title: "Storage",
        body: "Pools, NFS exports, snapshots, and the generated client patch.",
        page: "storage",
      },
      {
        title: "Recovery",
        body: "Panel recovery, factory reset, disk replacement, and restore.",
        page: "recovery",
      },
      {
        title: "Troubleshooting",
        body: "What to check when the panel, a service, or a disk misbehaves.",
        page: "troubleshooting",
      },
    ],
  },

  infrastructure: {
    intro: {
      kicker: "Server line",
      title: "The machines nobody sits in front of.",
      body: [
        "Infrastructure covers two server roles that should not share a desktop: an automated pentest lab and a self-hosted CI server. Both are headless, both are NixOS, and both are kept apart from the desktop and home-server variants.",
        "The pentest server builds a disposable target, lets a local agent probe it through a mediated tool boundary, and produces verified findings for a person to triage. The CI server runs Hydra and a cache on one host, configured from a workstation.",
      ],
      stats: [
        { value: "2", label: "server roles" },
        { value: "3", label: "CI tiers" },
        { value: "1", label: "LAN cache" },
        { value: "0", label: "graphical interfaces" },
      ],
    },
    capabilities: [
      {
        title: "Pentest lab",
        body: "A controller and verifier start the lab, validate tool requests, record the action log, verify reports, and destroy the VMs.",
      },
      {
        title: "Mediated tools",
        body: "One tool runs a package in a network namespace that can reach only the target. Arguments are passed directly to execve, never through a shell.",
      },
      {
        title: "Disposable target",
        body: "The target VM is built from a chosen Ojuny template, or a template with patches or a user configuration, and reset from a snapshot after every run.",
      },
      {
        title: "CI server",
        body: "Hydra and nix-cache-discovery on one headless NixOS host, with PostgreSQL, optional remote builders, and extra filesystems for artifacts.",
      },
      {
        title: "Deployment paths",
        body: "Provision a fresh machine with nixos-anywhere, update an existing one, or install on Proxmox. The settings GUI runs on a workstation.",
      },
      {
        title: "Workflow tiers",
        body: "Fast checks on every pull request, Nix builds on touched repositories, and heavy ISO and VM work on Hydra, nightly, and tags.",
      },
    ],
    workflow: [
      {
        title: "Pick a target",
        body: "Choose a stock Ojuny template, a template with patches, or a user configuration for the pentest lab.",
      },
      {
        title: "Run the lab",
        body: "The controller boots the target and the agent VM, mediates tool requests, and records the authoritative action log.",
      },
      {
        title: "Triage findings",
        body: "Reports are write-only from the agent side. A person reviews and verifies them before anything is disclosed.",
      },
      {
        title: "Build and cache",
        body: "The CI host runs the fast, Nix, and heavy tiers, and makes the result available through the LAN cache.",
      },
    ],
    install: [
      {
        title: "Pentest host",
        body: "Provision the dedicated testing server and its isolated lab.",
        page: "pentest-server",
      },
      {
        title: "CI server",
        body: "Provision Hydra, the cache, and the storage layout.",
        page: "ci-server",
      },
      {
        title: "Existing NixOS",
        body: "Add the server template to a machine that is already running NixOS.",
        page: "installation",
      },
      {
        title: "Proxmox",
        body: "Install the CI server on a Proxmox host when the hardware is virtual.",
        page: "installation",
      },
    ],
    requirements: [
      "x86_64-linux",
      "A trusted LAN for Hydra and the cache",
      "KVM for VM tests and the pentest lab",
      "Disk for artifacts, release staging, and install media",
      "A Git remote for the CI jobsets",
      "A separate host for the pentest lab boundary",
    ],
    limits: [
      "The pentest lab does not test third-party systems",
      "Findings are never disclosed automatically",
      "Hydra and the cache are LAN-only by default",
      "No public Hydra",
      "No settings web GUI or SSH proxy on the CI host",
      "No CI job is a required status until branch protection says so",
    ],
    docs: [
      {
        title: "Overview",
        body: "The two server roles and the boundary between them.",
        page: "overview",
      },
      {
        title: "Pentest server",
        body: "The lab, the tool boundary, the target, and the reporting path.",
        page: "pentest-server",
      },
      {
        title: "CI server",
        body: "Hydra, the cache, storage, deployment, and operations.",
        page: "ci-server",
      },
      {
        title: "CI workflows",
        body: "The fast, Nix, and heavy tiers and the repository manifest.",
        page: "ci-workflows",
      },
      {
        title: "Security",
        body: "Firewall, admin access, public exposure, and the lab boundary.",
        page: "security",
      },
      {
        title: "Troubleshooting",
        body: "What to check when a build, cache, or lab run fails.",
        page: "troubleshooting",
      },
    ],
  },
};
