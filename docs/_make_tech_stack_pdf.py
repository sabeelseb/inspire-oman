"""Generate docs/TECH-STACK.pdf from the live tech-stack content."""
from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).with_name("TECH-STACK.pdf")

GOLD = (197, 165, 90)
BLACK = (10, 10, 10)
CHARCOAL = (26, 26, 26)
GRAY = (90, 90, 90)
WHITE = (255, 255, 255)
ROW_ALT = (250, 247, 240)


class Doc(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_fill_color(*BLACK)
        self.rect(0, 0, 210, 12, "F")
        self.set_text_color(*GOLD)
        self.set_font("Helvetica", "B", 9)
        self.set_xy(14, 3.5)
        self.cell(120, 5, "Inspire Oman  |  Live Tech Stack")
        self.set_font("Helvetica", "", 8)
        self.set_text_color(200, 200, 200)
        self.cell(62, 5, "inspireoman.com", align="R")
        self.set_y(16)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(*GOLD)
        self.set_line_width(0.4)
        self.line(14, self.get_y(), 196, self.get_y())
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*GRAY)
        self.cell(0, 8, f"Confidential  |  Origin 45.194.47.155  |  Page {self.page_no()}", align="C")


def meta(pdf: FPDF, label: str, value: str) -> None:
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_text_color(*GOLD)
    pdf.cell(38, 6, label)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*CHARCOAL)
    pdf.cell(0, 6, value, new_x="LMARGIN", new_y="NEXT")


def section(pdf: FPDF, title: str) -> None:
    pdf.ln(5)
    if pdf.get_y() > 258:
        pdf.add_page()
    pdf.set_fill_color(*BLACK)
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, f"  {title}", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(2)
    pdf.set_text_color(*CHARCOAL)


def para(pdf: FPDF, text: str) -> None:
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*CHARCOAL)
    pdf.multi_cell(0, 5, text)
    pdf.ln(1)


def heading(pdf: FPDF, text: str) -> None:
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*CHARCOAL)
    pdf.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")


def bullets(pdf: FPDF, items: list[str]) -> None:
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*CHARCOAL)
    for item in items:
        x = pdf.l_margin
        pdf.set_x(x)
        pdf.cell(6, 5, "-")
        pdf.multi_cell(182, 5, item)
    pdf.ln(1)


def table(pdf: FPDF, headers: list[str], rows: list[list[str]], widths: list[float]) -> None:
    def header_row() -> None:
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_fill_color(*GOLD)
        pdf.set_text_color(*BLACK)
        for i, h in enumerate(headers):
            pdf.cell(widths[i], 7, f" {h}", fill=True)
        pdf.ln()

    header_row()
    pdf.set_font("Helvetica", "", 8)
    for ridx, row in enumerate(rows):
        height = 6
        for i, cell in enumerate(row):
            lines = pdf.multi_cell(widths[i] - 2.4, 5, str(cell), dry_run=True, output="LINES")
            height = max(height, 5 * max(1, len(lines)) + 1.2)
        if pdf.get_y() + height > 275:
            pdf.add_page()
            header_row()
            pdf.set_font("Helvetica", "", 8)
        fill = ROW_ALT if ridx % 2 == 0 else WHITE
        x, y = pdf.get_x(), pdf.get_y()
        for i, cell in enumerate(row):
            cx = x + sum(widths[:i])
            pdf.set_fill_color(*fill)
            pdf.rect(cx, y, widths[i], height, "F")
            pdf.set_xy(cx + 1.2, y + 0.8)
            pdf.set_text_color(*CHARCOAL)
            pdf.multi_cell(widths[i] - 2.4, 5, str(cell))
        pdf.set_xy(x, y + height)
    pdf.ln(2)


def code_box(pdf: FPDF, text: str) -> None:
    pdf.set_fill_color(*BLACK)
    pdf.set_text_color(*GOLD)
    pdf.set_font("Courier", "", 8)
    pdf.multi_cell(0, 5, text, fill=True)
    pdf.ln(2)


def main() -> None:
    pdf = Doc(format="A4")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    pdf.set_fill_color(*BLACK)
    pdf.rect(0, 0, 210, 42, "F")
    pdf.set_fill_color(*GOLD)
    pdf.rect(0, 42, 210, 2.2, "F")
    pdf.set_text_color(*GOLD)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_xy(14, 10)
    pdf.cell(0, 6, "INSPIRE OMAN")
    pdf.set_text_color(*WHITE)
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_xy(14, 18)
    pdf.cell(0, 10, "Live Tech Stack")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(200, 200, 200)
    pdf.set_xy(14, 30)
    pdf.cell(0, 6, "inspireoman.com   |   Production origin documentation")

    pdf.set_y(50)
    meta(pdf, "Site", "https://inspireoman.com")
    meta(pdf, "Origin server", "45.194.47.155")
    meta(pdf, "Hostname", "inspire-oman")
    meta(pdf, "App path", "/opt/inspire-oman-production")
    meta(pdf, "Compose file", "docker-compose.prod.yml")
    meta(pdf, "Git repo", "inspire-oman-production")

    section(pdf, "1. Language and runtime")
    table(
        pdf,
        ["Item", "Technology"],
        [
            ["Language", "TypeScript"],
            ["Runtime", "Node.js 22 (node:22-bookworm-slim)"],
            ["App command", "node server.js (Next.js standalone)"],
            ["Package manager", "npm (package-lock.json)"],
        ],
        [50, 132],
    )

    section(pdf, "2. Frontend")
    table(
        pdf,
        ["Item", "Technology"],
        [
            ["Framework", "Next.js 15 - App Router"],
            ["UI library", "React 19"],
            ["Styling", "Tailwind CSS 3"],
            ["Animation", "Framer Motion"],
            ["Icons", "Lucide React"],
            ["Font", "Inter"],
            ["Images", "Next.js Image + sharp"],
        ],
        [50, 132],
    )
    heading(pdf, "Public pages")
    table(
        pdf,
        ["Route", "Page"],
        [
            ["/", "Home"],
            ["/about", "About"],
            ["/pillars", "Pillars"],
            ["/summit", "Investors Summit"],
            ["/partner", "Partnership"],
            ["/media", "Media"],
            ["/contact", "Contact"],
        ],
        [40, 142],
    )
    para(pdf, "Brand palette: black / charcoal + gold (#C5A55A).")

    section(pdf, "3. Backend and CMS")
    table(
        pdf,
        ["Item", "Technology"],
        [
            ["CMS + API", "Payload CMS 3.86 (same Node process as the public site)"],
            ["Admin dashboard", "/admin"],
            ["REST API", "/api/*"],
            ["GraphQL", "/api/graphql"],
            ["Public forms", "Get in Touch, Summit Registrations, Partner Applications"],
            ["Email", "Postmark (when configured)"],
            ["Auth", "Payload users"],
        ],
        [50, 132],
    )
    heading(pdf, "Live CMS users")
    bullets(pdf, ["pc@madhyamam.com", "rohit@mefriend.com"])
    para(
        pdf,
        "Keystatic is in git for local/dev only. It is disabled on this live server (CMS_SOURCE=payload).",
    )

    section(pdf, "4. Database and storage")
    table(
        pdf,
        ["Item", "Technology"],
        [
            ["Engine", "PostgreSQL 16 Alpine"],
            ["Database name", "inspire_oman"],
            ["Database user", "payload"],
            ["Data volume", "postgres_data"],
            ["Media uploads", "Docker volume media_data -> /app/public/media"],
            ["Local/dev fallback", "SQLite payload.db"],
        ],
        [50, 132],
    )

    section(pdf, "5. Docker containers and services")
    para(pdf, "All production services run in Docker Compose. Restart policy: unless-stopped.")
    table(
        pdf,
        ["Container", "Image", "Role", "Ports"],
        [
            ["inspire-oman-production-caddy-1", "caddy:2-alpine", "Reverse proxy", "Host 80 and 443"],
            ["inspire-oman-production-app-1", "inspire-oman-production-app", "Next.js + Payload", "3000 internal only"],
            ["inspire-oman-production-postgres-1", "postgres:16-alpine", "Database", "5432 internal only"],
        ],
        [62, 48, 42, 30],
    )
    heading(pdf, "Networks")
    table(
        pdf,
        ["Network", "Used by", "Purpose"],
        [
            ["edge", "Caddy + app", "Public HTTP traffic"],
            ["internal", "App + Postgres", "Database traffic only"],
        ],
        [40, 50, 92],
    )
    heading(pdf, "Volumes")
    bullets(
        pdf,
        [
            "postgres_data - database files",
            "media_data - CMS media uploads",
            "caddy_data - Caddy certificates/state",
            "caddy_config - Caddy config cache",
        ],
    )

    section(pdf, "6. Traffic path")
    code_box(
        pdf,
        "Visitor\n"
        "  -> Cloudflare  (inspireoman.com)\n"
        "  -> 45.194.47.155 :80   Caddy  (SITE_ADDRESS=:80)\n"
        "  -> app:3000            Next.js + Payload\n"
        "  -> postgres:5432       PostgreSQL",
    )
    para(
        pdf,
        "HTTPS for the public domain is terminated at Cloudflare. On the origin, Caddy listens on HTTP (:80). "
        "Origin port 443 is not open from the internet. Next.js and Postgres are not published on the host.",
    )

    section(pdf, "7. Host and operations")
    table(
        pdf,
        ["Item", "Value"],
        [
            ["OS", "Ubuntu"],
            ["SSH user", "ubuntu"],
            ["Size", "8 GB RAM, 96 GB disk, 4 CPU"],
            ["Firewall", "UFW enabled - 22, 80, 443"],
            ["Process manager", "Docker only (no PM2)"],
            ["Internet-open ports", "22 (SSH), 80 (HTTP), 21 (FTP)"],
        ],
        [50, 132],
    )
    heading(pdf, "Typical commands")
    code_box(
        pdf,
        "cd /opt/inspire-oman-production\n"
        "docker compose -f docker-compose.prod.yml ps\n"
        "docker compose -f docker-compose.prod.yml logs -f app\n"
        "docker compose -f docker-compose.prod.yml up -d --build",
    )

    section(pdf, "8. Not used on this live server")
    bullets(
        pdf,
        [
            "Redis",
            "Nginx",
            "PM2",
            "Vercel runtime",
            "Keystatic UI",
            "The Findown / ponnonam droplet (68.183.95.87) - that is a separate host",
        ],
    )

    section(pdf, "9. Stack summary")
    para(
        pdf,
        "Cloudflare -> Caddy -> Next.js / React / Payload on Node 22 -> PostgreSQL 16, "
        "all managed with Docker Compose on Ubuntu.",
    )

    pdf.output(str(OUT))
    print(f"WROTE {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
