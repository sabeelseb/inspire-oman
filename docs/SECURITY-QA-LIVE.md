# Inspire Oman live security QA

**Target:** https://inspireoman.com  
**Origin:** `45.194.47.155` (`inspire-oman`)  
**Checked:** 15 August 2026, 14:22–14:25 IST  
**Scope:** Defensive review only. No exploit payloads were used.

## Direct answer

**No. Nobody can promise that attackers cannot try again.**  
Any host on the public internet can be scanned, probed, or hit with a new vulnerability.

What this QA *can* say:

- There is **no active miner, no successful CMS injection, and no ongoing DoS** on this origin right now.
- The **known Next.js remote-code hole that was being used against this server is patched**.
- Attackers are **still knocking**. Those knocks are failing.
- Residual risk remains (Cloudflare bypass, public `/admin`, open forms, missing headers).

Black / white / grey hat does not change the technical surface. A scanner, a researcher, or a criminal all hit the same ports and URLs.

---

## Current health

| Check | Result |
|---|---|
| Load | 0.06 / 0.13 / 0.17 |
| RAM | 1.0 GB used of 7.7 GB |
| App CPU | 0.00% |
| Miner / dropper names | None |
| App `/tmp` | Empty |
| Host dropper search | None |
| Next.js in running image | **15.4.11** (patched) |
| React in running image | **19.0.1** (patched) |
| App user | `nextjs` (not root, not privileged) |
| Containers | Caddy, app, Postgres — all up |

---

## What was attacked, and what happened

Internet scanners tried to abuse a Next.js Server Actions / React Server Components flaw (`CVE-2025-55182` / `CVE-2025-66478`) on the old **15.4.7** build.

- They tried to pull and run files such as `/tmp/dashboard`. Those downloads **failed**.
- A leftover ELF file `/tmp/udhcpc` (12 Aug) was found **not running** and was **removed**.
- After the rebuild, logs still show `Failed to find Server Action "x"`. That is a **failed probe**, not a successful shell.
- Unauthenticated CMS write attempts now log `You are not allowed to perform this action.`

**Conclusion:** there was an attempted code-execution attack. It did not leave a running backdoor on this check. The vulnerable Next.js version is no longer what the live container runs.

---

## Public site QA

| Path | HTTP |
|---|---|
| `/` `/about` `/pillars` `/summit` `/partner` `/media` `/contact` | 200 |
| `/admin` | 200 (login page — expected) |
| `/keystatic` | 404 (disabled — good) |
| `/.env` `/.git/config` `/wp-admin` `/xmlrpc.php` `/phpmyadmin` | 404 |
| `/api/graphql-playground` `/api/cms/publish` `/api/cms/draft` | 404 |

### Unauthenticated writes

| Action | Result |
|---|---|
| POST `/api/partners` | **403** denied |
| POST `/api/speakers` | **403** denied |
| POST `/api/users` | **403** denied |
| POST `/api/media` | **403** denied |
| POST `/api/get-in-touch` empty body | **400** validation (form is public by design) |
| POST `/api/summit-registrations` empty body | **400** validation (form is public by design) |

CMS users in Postgres: only `pc@madhyamam.com`. No extra attacker account.

---

## What is closed now

- Next.js / React RCE versions that were being exploited
- Leftover `/tmp/udhcpc` dropper
- Public CMS create/update on content, users, media
- Keystatic, git publish/draft routes, GraphQL playground
- Docker TCP API (`2375` / `2376`)
- Postgres not published to the internet
- App port 3000 not published to the internet
- SSH **password login is off** (`PasswordAuthentication no`)
- UFW on: default deny, allow 22 / 80 / 443
- Caddy blocks `/.env`, `/.git`, WordPress/phpMyAdmin scanner paths
- FTP (`vsftpd` / `proftpd`) is **not running** on this check
- Cron persistence: none beyond normal Ubuntu jobs

---

## Residual risk (still attackable)

These are not proof of a current breach. They are remaining doors.

### High

1. **Origin IP bypasses Cloudflare.**  
   `http://45.194.47.155` serves the site directly. An attacker can skip Cloudflare WAF/DDoS protection by hitting the IP.  
   **Fix:** allow 80/443 only from Cloudflare IP ranges; keep SSH on a allowlist.

2. **`/admin` is on the public internet.**  
   Anyone can open the login page and try passwords.  
   **Fix:** Cloudflare Access / IP allowlist / VPN for `/admin`.

3. **Public forms have no rate limit or captcha.**  
   `/api/get-in-touch` and `/api/summit-registrations` accept unauthenticated POSTs. That can be used for spam or a cheap application-layer DoS.  
   **Fix:** Cloudflare rate limit + captcha.

### Medium

4. **Attackers are still probing Server Actions.**  
   Patched Next.js should reject the old RCE. Keep watching logs.

5. **Missing browser security headers:**  
   No `Content-Security-Policy`, no `Strict-Transport-Security`, no `Permissions-Policy`.  
   `X-Powered-By: Next.js, Payload` tells scanners the stack.

6. **GraphQL URL exists and returned 500** on a harmless query (missing `graphql` module in the standalone image). That is not a working injection path in this test; it is a crashy endpoint. Hide or disable `/api/graphql` on the public site.

7. **SSH is open to the world** (keys only). Fine for ops; still a brute-force / stolen-key risk. Restrict to office IPs.

8. **`NEXT_PUBLIC_SERVER_URL=http://45.194.47.155`**  
   Should be `https://inspireoman.com`.

### Lower

9. Ubuntu user is in `sudo` and `docker` (normal for this deploy model). A stolen SSH key is full host control.  
10. New CVEs will appear. Patching once is not forever.

---

## DoS / injection verdict

| Type | On this live origin now |
|---|---|
| Successful code injection into CMS | **Not found** |
| Running malware / miner | **Not found** |
| Successful Next.js RCE after patch | **Not found** (probes still fail) |
| Volumetric / HTTP flood in progress | **Not found** (CPU idle) |
| Possible future DoS | **Yes** — open origin IP, public forms, `/admin`, any new CVE |
| Possible future intrusion | **Yes** — stolen SSH key, guessed admin password, new unpatched bug |

---

## Recommended next locks

1. Firewall 80/443 to Cloudflare only; SSH to your IPs only.  
2. Put `/admin` behind Cloudflare Access.  
3. Rate-limit form POSTs; add captcha.  
4. Set `NEXT_PUBLIC_SERVER_URL=https://inspireoman.com`.  
5. Add HSTS + CSP at Cloudflare.  
6. Remove or block public `/api/graphql`.  
7. Rotate Payload admin password and keep only one known admin.  
8. Commit the live security patch so a later git reset does not roll Next.js back to 15.4.7.

---

## Bottom line

The live server was checked again in depth.  
**It is not currently owned, not at 100% CPU, and the known injection path is patched.**  
**It is not unattackable.** Keep Cloudflare in front of the origin, lock `/admin` and SSH, and rate-limit forms.
