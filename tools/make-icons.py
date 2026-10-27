# Usage: python3 tools/make-icons.py icons   (needs Pillow and the DejaVu fonts)
# Python Syntax icon: a document with a ">>>" prompt and a "Py" banner (same family as SQL Syntax's icon).
import sys
from PIL import Image, ImageDraw, ImageFont
out = sys.argv[1]
S = 1024
INK = (30, 41, 59)
def draw(maskable=False):
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0) if not maskable else (255, 236, 140, 255))
    d = ImageDraw.Draw(im)
    k = 0.78 if maskable else 1.0
    def P(x, y): return (S/2 + (x - S/2) * k, S/2 + (y - S/2) * k)
    def R(x0, y0, x1, y1): return [*P(x0, y0), *P(x1, y1)]
    w = lambda v: max(1, int(v * k))
    # page with folded corner
    page = [P(200, 70), P(700, 70), P(860, 230), P(860, 600), P(200, 600)]
    d.polygon(page, fill=(255, 241, 184), outline=INK)
    d.line(page + [page[0]], fill=INK, width=w(26), joint='curve')
    d.polygon([P(700, 70), P(700, 230), P(860, 230)], fill=(250, 214, 92))
    d.line([P(700, 70), P(700, 230), P(860, 230)], fill=INK, width=w(26), joint='curve')
    # ">>>" prompt and code lines
    for i in range(3):
        x = 290 + i * 70
        d.line([P(x, 175), P(x + 50, 215), P(x, 255)], fill=INK, width=w(28), joint='curve')
    for y, x1 in ((330, 760), (420, 680), (510, 760)):
        d.line([P(290, y), P(x1, y)], fill=INK, width=w(28))
    # banner
    d.rounded_rectangle(R(120, 600, 904, 960), radius=w(90), fill=(53, 114, 165), outline=INK, width=w(26))
    f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', w(290))
    cx, cy = P(512, 790)
    d.text((cx, cy), 'Py', font=f, fill=(255, 212, 59), anchor='mm', stroke_width=w(10), stroke_fill=INK)
    return im
base, mask = draw(), draw(True)
for n in (16, 32, 180, 192, 512):
    im = base
    if n == 180:  # iOS draws no transparency: put the icon on a light tile
        im = Image.new('RGBA', (S, S), (255, 255, 255, 255)); im.alpha_composite(base)
    im.resize((n, n), Image.LANCZOS).save(f'{out}/icon-{n}.png')
for n in (192, 512):
    mask.resize((n, n), Image.LANCZOS).save(f'{out}/maskable-{n}.png')
base.resize((48, 48), Image.LANCZOS).save(f'{out}/../favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
