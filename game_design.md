# SEED Labs: DNS Rebinding Attack Lab

## Scenario & Storyline

In modern smart home and industrial IoT deployments, internal sensors and controllers (such as thermostats, IP cameras, and smart meters) run embedded web servers to facilitate management within a local area network (LAN). Because these devices operate behind stateful firewalls and NAT gateways, designers often operate under the faulty assumption that the device is unexposed to the public internet, omitting robust mutual authentication.

In this scenario, a vulnerable IoT thermostat controls temperature behind an enterprise/smart-home firewall on the internal subnet (`10.1.26.0/24`). Outside attackers cannot directly communicate with port 8080 of this device from their network (`10.1.27.0/24`).

However, by enticing an employee or internal user to visit a malicious website, the attacker can execute JavaScript inside the victim's browser behind the firewall. While the browser's **Same-Origin Policy (SOP)** initially prevents this script from accessing the internal IoT thermostat, the attacker leverages **DNS Rebinding** to bypass the sandbox, extract the anti-CSRF secret password, and force the thermostat into dangerous overheat temperatures.

## Learning Objectives

- Analyze DNS hierarchical resolution, caching behavior, and Time-To-Live (TTL) mechanics.
- Understand the Same-Origin Policy (SOP) implemented by modern web browsers.
- Understand how anti-CSRF tokens operate and why they fail to stop DNS rebinding attacks.
- Configure and manipulate BIND9 authoritative nameservers and zone records dynamically (`rndc reload`).
- Conduct manual and automated DNS Rebinding attacks against simulated IoT infrastructure.

## Lab Architecture & Topology

- **Attacker Machine (`attacker`)**:
  - Image: `seed` (Flavor: `m1.medium`)
  - IP: `10.1.27.23`
  - Runs BIND9 authoritative nameserver for `attacker32.com`.
  - Runs attacker Flask web server on port `8080` (`rebind_malware`).
- **Local DNS Server (`local-dns`)**:
  - Image: `seed` (Flavor: `m1.medium`)
  - IP: `10.1.26.10`
  - Runs BIND9 resolver configured to forward `attacker32.com` queries to the attacker nameserver.
- **Victim IoT Host (`victim-iot`)**:
  - Image: `seed` (Flavor: `m1.medium`)
  - IP: `10.1.26.4`
  - Runs vulnerable IoT thermostat Flask web server on port `8080` (`rebind_iot`).
  - Runs Firefox browser with reduced DNS cache expiration (`network.dnsCacheExpiration = 10`).
  - Protected by firewall rules dropping direct inbound traffic from external attacker subnet `10.1.27.0/24` to port `8080`.
- **Router (`router`)**:
  - Image: `debian-12-x86_64` (Flavor: `m1.medium`)
  - Connects `10.1.26.0/24` and `10.1.27.0/24`.

---

## Grading & Point Distribution (Total: 20/20 Points)

| Level | Level Title | Max Points | Hint 1 Penalty | Hint 2 Penalty | Flag Variable |
| :---: | :--- | :---: | :---: | :---: | :---: |
| 0 | Introduction & Context | 0 | - | - | - |
| 1 | Access Sandbox | 0 | - | - | `start` |
| 2 | Task 1: DNS Setup & Zone Verification | **4** | -0.5 | -1.0 | `flag_dns_recon` |
| 3 | Task 2: IoT Device & Same-Origin Policy Analysis | **4** | -0.5 | -1.0 | `flag_sop_analysis` |
| 4 | Task 3: Defeating SOP via Manual DNS Rebinding | **6** | -1.0 | -1.5 | `flag_manual_rebind` |
| 5 | Task 4: Automated DNS Rebinding Attack | **6** | -1.0 | -2.0 | `flag_auto_rebind` |
| **Total** | | **20** | | | |

*All hint penalties are calibrated strictly between -0.5 and -2.0 points.*

---

## Anti-Cheating & Dynamic Flag Generation (APG)

To accommodate ~30 students in concurrent training sessions without the risk of copied or leaked flags:
- All task flags are defined as **Automatic Problem Generation (APG)** variables in `variables.yml`.
- Each student sandbox generates unique random secrets for:
  - `flag_dns_recon`: embedded in the attacker BIND9 TXT record for `flag.attacker32.com`.
  - `flag_sop_analysis`: embedded in the IoT device diagnostics endpoint and local token.
  - `flag_manual_rebind`: generated when thermostat temperature is successfully changed to `99°C`.
  - `flag_auto_rebind`: generated when thermostat temperature is successfully changed to `88°C` via automated countdown.
- Flags are compared against the platform's individual student **Answers Storage**.
