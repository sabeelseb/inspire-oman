import fitz
from PIL import Image
from pathlib import Path

root = Path(r"D:\1. Project Management\Inspire Oman")
out = root / "inspire-oman" / "public" / "images" / "logos"
hero = root / "inspire-oman" / "public" / "images" / "hero"
gallery = root / "inspire-oman" / "public" / "images" / "gallery"
out.mkdir(parents=True, exist_ok=True)
hero.mkdir(parents=True, exist_ok=True)
gallery.mkdir(parents=True, exist_ok=True)

# Convert mefriend PDF to PNG
pdf = root / "mefriend logo files- new baseline.pdf"
doc = fitz.open(pdf)
page = doc[0]
pix = page.get_pixmap(matrix=fitz.Matrix(3, 3), alpha=True)
mefriend_path = out / "mefriend.png"
pix.save(str(mefriend_path))
print("mefriend saved", mefriend_path, pix.width, pix.height)

# Crop partner logos from banner
banner = Image.open(root / "Inspire Oman Signature_600x150.jpg.jpeg").convert("RGBA")
w, h = banner.size
print("banner size", w, h)

partners = banner.crop((int(w * 0.62), int(h * 0.12), int(w * 0.98), int(h * 0.78)))
partners.save(out / "partners-panel.png")

occi = banner.crop((int(w * 0.68), int(h * 0.12), int(w * 0.95), int(h * 0.48)))
occi.save(out / "occi.png")

mf = banner.crop((int(w * 0.68), int(h * 0.48), int(w * 0.95), int(h * 0.78)))
mf.save(out / "mefriend-banner-crop.png")

banner.convert("RGB").save(hero / "inspire-banner.jpg", quality=90)

# Also keep a compact logo from the smaller signature if useful
sig = Image.open(root / "Inspire Oman Signature_200x90.jpg.jpeg").convert("RGB")
sig.save(out / "inspire-oman-signature.jpg", quality=90)
print("done")
