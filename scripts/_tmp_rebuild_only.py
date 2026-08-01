"""Force app rebuild after seed. Delete after use."""
import sys
import time
import paramiko

HOST = "68.183.95.87"
PASSWORD = "InspireOman-Cms2026!"


def safe_print(s: str) -> None:
    sys.stdout.buffer.write(s.encode("utf-8", errors="replace"))
    sys.stdout.buffer.flush()


def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        HOST,
        username="root",
        password=PASSWORD,
        timeout=30,
        allow_agent=False,
        look_for_keys=False,
    )

    cmd = r"""
set -e
cd /opt/inspire-oman
git pull origin main
# kill any stuck compose build
pkill -f 'docker compose.*inspire' 2>/dev/null || true
export NODE_OPTIONS=--max-old-space-size=1536
nohup bash -lc 'docker compose -f docker-compose.prod.yml up -d --build app > /tmp/inspire-rebuild.log 2>&1; echo DONE_EXIT:$? >> /tmp/inspire-rebuild.log' &
echo started
sleep 3
wc -l /tmp/inspire-rebuild.log; tail -n 5 /tmp/inspire-rebuild.log
"""
    _in, out, err = client.exec_command(cmd, timeout=120, get_pty=True)
    safe_print(out.read().decode("utf-8", errors="replace"))

    for i in range(50):
        time.sleep(30)
        _in, out, err = client.exec_command(
            "tail -n 12 /tmp/inspire-rebuild.log; grep -c DONE_EXIT /tmp/inspire-rebuild.log || true",
            timeout=60,
        )
        text = out.read().decode("utf-8", errors="replace")
        safe_print(f"\n=== poll {i+1} ===\n{text}\n")
        if "DONE_EXIT:" in text:
            break

    _in, out, err = client.exec_command(
        """
sleep 3
curl -s https://inspireoman.findown.in/ > /tmp/home.html
python3 - <<'PY'
html=open('/tmp/home.html').read()
for s in ['OCCI Partnership','Cross-Border Investment','In strategic partnership','Strategic Partner','Execution Partner']:
    print(s, '=>', s in html)
PY
curl -s -o /dev/null -w "https:%{http_code}\\n" https://inspireoman.findown.in/
docker compose -f /opt/inspire-oman/docker-compose.prod.yml ps
tail -n 25 /tmp/inspire-rebuild.log
""",
        timeout=120,
    )
    safe_print(out.read().decode("utf-8", errors="replace"))
    client.close()
    print("FINAL_EXIT 0")


if __name__ == "__main__":
    main()
