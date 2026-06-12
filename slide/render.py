#!/usr/bin/env python3
# Festakt-Folie „175 Jahre ESG" — Philosophie: Geprägter Einband.
# Rendert 2× supersampled (3840×2160) und skaliert auf 1920×1080.
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

S = 2  # Supersampling
W, H = 1920 * S, 1080 * S

FONTS = "/Users/jonathankreutzheide/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/fb6b954e-7de1-4680-b4c8-ce7949bf06b5/4e1787e5-e5e8-4949-94bb-21d96a0157f6/skills/canvas-fonts".replace("canvas-fonts", "canvas-design/canvas-fonts")
IMAGES = "/Users/jonathankreutzheide/Downloads/webseite-esg/public/images"
SLIDE = "/Users/jonathankreutzheide/Downloads/webseite-esg/slide"

# ── Palette ────────────────────────────────────────────────────────
BEERE_DEEP = (74, 24, 42)     # Grund, abgedunkelt
BEERE = (94, 33, 56)          # Grund, Kern (#5e2138)
BEERE_LIFT = (113, 44, 70)    # Prägeschatten-Aufheller
PAPER = (250, 248, 247)       # #faf8f7
INK = (36, 28, 32)            # #241c20
GELB = (255, 214, 0)          # #ffd600
GOLD_HI = (230, 195, 92)      # Blattgold, Licht
GOLD = (176, 138, 46)         # Blattgold, Kern
GOLD_LO = (122, 92, 26)       # Blattgold, Schatten
GOLD_LINE = (171, 134, 58)

def F(name, size):
    return ImageFont.truetype(f"{FONTS}/{name}", size)

img = Image.new("RGB", (W, H), BEERE)
d = ImageDraw.Draw(img)

# ── Grund: radiale Bühnen-Vignette ────────────────────────────────
vign = Image.new("L", (W, H), 0)
vd = ImageDraw.Draw(vign)
vd.ellipse([-W * 0.35, -H * 0.55, W * 1.0, H * 1.25], fill=46)
vign = vign.filter(ImageFilter.GaussianBlur(420 * S))
img = Image.composite(Image.new("RGB", (W, H), BEERE_LIFT), Image.new("RGB", (W, H), BEERE_DEEP), vign)
d = ImageDraw.Draw(img)

# ── Fotoband am Fuß: Festumzug 1926, in den Grundton getaucht ─────
band_h = 168 * S
photo = Image.open(f"{IMAGES}/festumzug-1926.jpg").convert("L")
photo = ImageOps.autocontrast(photo, cutoff=2)
ratio = W / photo.width
photo = photo.resize((W, int(photo.height * ratio)), Image.LANCZOS)
crop_top = int(photo.height * 0.30)
photo = photo.crop((0, crop_top, W, crop_top + band_h))
duo = ImageOps.colorize(photo, black=(58, 18, 33), white=(148, 78, 102), mid=(100, 40, 62))
fade = Image.new("L", (W, band_h), 255)
fd = ImageDraw.Draw(fade)
for y in range(band_h):
    a = int(min(1.0, y / (band_h * 0.55)) * 200)
    fd.line([(0, y), (W, y)], fill=a)
img.paste(Image.composite(duo, img.crop((0, H - band_h, W, H)), fade), (0, H - band_h))
d = ImageDraw.Draw(img)

# ── Goldener Doppelrahmen (Handvergoldung) ────────────────────────
def gold_rect(box, width):
    d.rounded_rectangle(box, radius=2 * S, outline=GOLD_LINE, width=width)
m1, m2 = 44 * S, 58 * S
gold_rect([m1, m1, W - m1, H - m1], 3 * S)
gold_rect([m2, m2, W - m2, H - m2], 1 * S)

# ── Helfer: Gold-Gradient-Text & gesperrte Kapitälchen ────────────
def gold_text(xy, text, font, anchor="la"):
    bbox = d.textbbox(xy, text, font=font, anchor=anchor)
    pad = 8 * S
    box = (bbox[0] - pad, bbox[1] - pad, bbox[2] + pad, bbox[3] + pad)
    w, h = box[2] - box[0], box[3] - box[1]
    grad = Image.new("RGB", (w, h))
    gd = ImageDraw.Draw(grad)
    for y in range(h):
        t = y / max(h - 1, 1)
        if t < 0.45:
            c = tuple(int(GOLD_HI[i] + (GOLD[i] - GOLD_HI[i]) * (t / 0.45)) for i in range(3))
        else:
            c = tuple(int(GOLD[i] + (GOLD_LO[i] - GOLD[i]) * ((t - 0.45) / 0.55)) for i in range(3))
        gd.line([(0, y), (w, y)], fill=c)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.text((xy[0] - box[0], xy[1] - box[1]), text, font=font, fill=255, anchor=anchor)
    img.paste(grad, (box[0], box[1]), mask)

def tracked(xy, text, font, fill, tracking, anchor_mid=False):
    widths = [d.textlength(ch, font=font) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = xy[0] - total / 2 if anchor_mid else xy[0]
    for ch, cw in zip(text, widths):
        d.text((x, xy[1]), ch, font=font, fill=fill)
        x += cw + tracking
    return total

# ── Linke Zone: Erzählung ─────────────────────────────────────────
LX = 132 * S

# Gravierte Kopfzeile
f_caps = F("WorkSans-Bold.ttf", 25 * S)
tracked((LX, 116 * S), "EVANGELISCH STIFTISCHES GYMNASIUM GÜTERSLOH", f_caps, GOLD_LINE, 9 * S)

# Emblem: 175 · JAHRE · 1851–2026 (Gloock, goldgeprägt)
f_175 = F("Gloock-Regular.ttf", 188 * S)
gold_text((LX - 6 * S, 182 * S), "175", f_175)
f_jahre = F("WorkSans-Bold.ttf", 27 * S)
tracked((LX + 318 * S, 228 * S), "JAHRE", f_jahre, GOLD_LINE, 12 * S)
f_years = F("WorkSans-Regular.ttf", 27 * S)
tracked((LX + 318 * S, 288 * S), "1851 – 2026", f_years, (214, 186, 138), 5 * S)

# Headline-Monument
f_head = F("WorkSans-Bold.ttf", 132 * S)
d.text((LX - 4 * S, 418 * S), "Einmal ESG.", font=f_head, fill=PAPER)
d.text((LX - 4 * S, 562 * S), "Immer ESG.", font=f_head, fill=GELB)

# Subline
f_sub = F("WorkSans-Regular.ttf", 42 * S)
d.text((LX, 746 * S), "Der Alumni-Newsletter zum Jubiläum", font=f_sub, fill=(236, 222, 226))

# Zwei Versprechen mit Goldmarken
f_item = F("WorkSans-Bold.ttf", 33 * S)
f_item_l = F("WorkSans-Regular.ttf", 33 * S)
y0 = 824 * S
for i, (a, b) in enumerate([
    ("Der Jubiläumsband", ""),
    ("Der Film:", " „175 Jahre ESG in 175 Sekunden“"),
]):
    yy = y0 + i * 62 * S
    d.rectangle([LX, yy + 12 * S, LX + 18 * S, yy + 30 * S], fill=GOLD)
    x = LX + 40 * S
    d.text((x, yy), a, font=f_item, fill=PAPER)
    if b:
        d.text((x + d.textlength(a, font=f_item), yy), b, font=f_item_l, fill=(236, 222, 226))

# ── Rechte Zone: Papier-Tafel mit QR ──────────────────────────────
PX0, PY0, PX1, PY1 = 1318 * S, 200 * S, 1796 * S, 906 * S

shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.rounded_rectangle([PX0 + 10 * S, PY0 + 26 * S, PX1 + 10 * S, PY1 + 26 * S], radius=26 * S, fill=(20, 4, 10, 150))
shadow = shadow.filter(ImageFilter.GaussianBlur(34 * S))
img = Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB")
d = ImageDraw.Draw(img)

d.rounded_rectangle([PX0, PY0, PX1, PY1], radius=24 * S, fill=PAPER)
d.rounded_rectangle([PX0 + 16 * S, PY0 + 16 * S, PX1 - 16 * S, PY1 - 16 * S], radius=14 * S, outline=GOLD_LINE, width=1 * S)

cx = (PX0 + PX1) // 2

f_plate_caps = F("WorkSans-Bold.ttf", 26 * S)
tracked((cx, PY0 + 56 * S), "JETZT EINTRAGEN", f_plate_caps, (154, 116, 20), 10 * S, anchor_mid=True)

qr = Image.open(f"{SLIDE}/qr-anmeldung.png").convert("RGB")
qr_size = 384 * S
qr = qr.resize((qr_size, qr_size), Image.NEAREST)
qx, qy = cx - qr_size // 2, PY0 + 122 * S
img.paste(qr, (qx, qy))
d = ImageDraw.Draw(img)

f_scan = F("WorkSans-Regular.ttf", 27 * S)
t = "Kamera drauf – fertig."
d.text((cx - d.textlength(t, font=f_scan) / 2, qy + qr_size + 34 * S), t, font=f_scan, fill=(93, 81, 86))

d.line([cx - 150 * S, qy + qr_size + 96 * S, cx + 150 * S, qy + qr_size + 96 * S], fill=(222, 209, 200), width=1 * S)

f_url = F("WorkSans-Bold.ttf", 33 * S)
t = "esg-webseite.vercel.app"
d.text((cx - d.textlength(t, font=f_url) / 2, qy + qr_size + 124 * S), t, font=f_url, fill=INK)

# ── Bildunterschrift im Fotoband ──────────────────────────────────
f_foot = F("WorkSans-Bold.ttf", 22 * S)
cap_y = H - band_h // 2 - 14 * S
# dezenter Schattenwurf für Lesbarkeit auf dem Foto
tracked((W // 2 + 1 * S, cap_y + 1 * S), "FESTAKT · 13. JUNI 2026", f_foot, (40, 10, 22), 8 * S, anchor_mid=True)
tracked((W // 2, cap_y), "FESTAKT · 13. JUNI 2026", f_foot, (233, 205, 150), 8 * S, anchor_mid=True)

# ── Ausgabe ───────────────────────────────────────────────────────
final = img.resize((1920, 1080), Image.LANCZOS)
final.save(f"{SLIDE}/festakt-folie.png")
final.save(f"{SLIDE}/festakt-folie.jpg", quality=93, subsampling=0)
print("✓ gerendert:", f"{SLIDE}/festakt-folie.jpg")
