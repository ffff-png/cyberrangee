# SEED Labs: DNS Rebinding Attack Training Scenario

[![Platform: CyberRangeCZ](https://img.shields.io/badge/Platform-CyberRangeCZ-blue.svg)](https://docs.platform.cyberrange.cz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Training scenario for the [CyberRangeCZ Platform](https://docs.platform.cyberrange.cz/) based on the **SEED Labs – DNS Rebinding Attack Lab** by Prof. Wenliang Du.

## Overview

This scenario teaches trainees how attackers can bypass browser Same-Origin Policy (SOP) protections using **DNS Rebinding** to interact with and exploit otherwise unreachable IoT devices hidden behind internal firewalls.

## Features
- **Anti-Cheating APG (Automatic Problem Generation)**: Dynamically generated unique flags per student sandbox instance via `variables.yml`. Suitable for classrooms of 30+ students.
- **Strict Grading Scale**: Total score of **20/20 points** with balanced hint penalties from **-0.5 to -2.0 points**.
- **SEED VM Integration**: Uses the `seed` base box image with flavor `m1.medium`.
- **Dual Verification Modes**: Supports both GUI browser interaction (Firefox) and CLI automated verification.

## Architecture & Topology Summary
| Host | Role | Base Box Image | Flavor | IP Address |
| :--- | :--- | :--- | :--- | :--- |
| **attacker** | Attacker workstation, BIND9 NS, Attack Flask server | `seed` | `m1.medium` | `10.1.27.23` |
| **victim-iot** | Internal victim browser & Thermostat IoT Flask server | `seed` | `m1.medium` | `10.1.26.4` |
| **local-dns** | Internal recursive DNS server forwarding to attacker | `seed` | `m1.medium` | `10.1.26.10` |
| **router** | Gateway connecting internal & attacker subnets | `debian-12-x86_64` | `m1.medium` | `10.1.26.1` / `10.1.27.1` |

## Levels & Tasks Summary
1. **Introduction & Context**: Background on IoT vulnerabilities and SOP.
2. **Access Sandbox**: Sandbox access instructions (`start`).
3. **Task 1: DNS Architecture & Zone Verification** (4 pts): Verify BIND9 authoritative resolution via local recursive resolver.
4. **Task 2: IoT Thermostat & Same-Origin Policy** (4 pts): Analyze anti-CSRF token protection and observe SOP cross-origin block.
5. **Task 3: Defeating SOP via Manual DNS Rebinding** (6 pts): Modify payload target, rebind DNS A record, flush cache, and raise temperature to 99°C.
6. **Task 4: Automated DNS Rebinding Attack** (6 pts): Execute timer-based automated DNS rebinding payload forcing thermostat into 88°C critical overheat.

## Deployment on CyberRangeCZ
1. Create a Sandbox Definition using this repository (or uploaded `.zip`).
2. Build a sandbox pool (select *Generate variant sandboxes* for APG support).
3. Create a Linear Training Definition linking `training.json`.
4. Launch the Training Instance for your students.
