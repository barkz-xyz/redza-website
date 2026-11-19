from __future__ import annotations

import base64
import html
import io
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "branding"
PUBLIC = ROOT / "public" / "images"
WHITE_LOGO_SOURCE = PUBLIC / "redza branding" / "white svgs"
BLACK_LOGO_SOURCE = PUBLIC / "redza branding" / "black svgs"
PHOTO_ORIGINAL = PUBLIC / "redza_fotos"
PHOTO_OPTIMIZED = PHOTO_ORIGINAL / "optimized"

INK = "#0B0B0C"
SOFT = "#151517"
RED = "#E21A16"
RED_DARK = "#BB1512"
CREAM = "#F3F3F1"
WHITE = "#FFFFFF"
MUTED = "#A7A7AB"

FONT_STYLE = """
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&amp;family=Manrope:wght@400;600;700;800&amp;display=swap');
    .display { font-family: Manrope, Arial, sans-serif; }
    .mono { font-family: 'DM Mono', 'Courier New', monospace; }
  </style>
"""


POSTS = [
    {
        "dir": "day-01-redza-presentation",
        "photo": PHOTO_ORIGINAL / "trucks3.jpeg",
        "headline": "Tu carga no se detiene.",
        "kicker": "REDZA / PRESENTACIÓN",
        "support": "Transporte y distribución para operaciones que siguen avanzando.",
        "cta": "Cotiza por WhatsApp",
        "layout": "signal",
        "focus": (0.5, 0.48),
    },
    {
        "dir": "day-02-operation-proof",
        "photo": PHOTO_ORIGINAL / "traspaleta.jpeg",
        "headline": "Carga asegurada antes de salir.",
        "kicker": "REDZA / OPERACIÓN",
        "support": "Revisamos, ordenamos y coordinamos cada etapa antes del camino.",
        "cta": "Conversemos sobre tu entrega",
        "layout": "editorial",
        "focus": (0.5, 0.62),
    },
    {
        "dir": "day-03-national-coverage",
        "photo": PHOTO_OPTIMIZED / "redza-ruta-la-mano-del-desierto.webp",
        "headline": "Una cobertura que cruza Chile.",
        "kicker": "REDZA / RUTA NORTE",
        "support": "Coordinación desde el origen hasta el destino.",
        "cta": "Solicita una cotización",
        "layout": "signal",
        "focus": (0.5, 0.48),
    },
    {
        "dir": "day-04-right-vehicle",
        "photo": PHOTO_ORIGINAL / "trucks 2.jpeg",
        "headline": "El vehículo correcto para cada entrega.",
        "kicker": "REDZA / DISTRIBUCIÓN",
        "support": "Definimos capacidad, ruta y acceso antes de programar.",
        "cta": "Cuéntanos qué necesitas mover",
        "layout": "editorial",
        "focus": (0.5, 0.5),
    },
    {
        "dir": "day-05-ready-to-dispatch",
        "photo": PHOTO_OPTIMIZED / "redza-flota-camiones-patio.webp",
        "headline": "Operación lista para salir.",
        "kicker": "REDZA / FLOTA",
        "support": "Vehículos preparados para mantener la continuidad de tu negocio.",
        "cta": "Hablemos de tu próxima ruta",
        "layout": "signal",
        "focus": (0.5, 0.36),
    },
    {
        "dir": "day-06-every-movement-counts",
        "photo": PHOTO_OPTIMIZED / "redza-hero-operacion-poster.webp",
        "headline": "Cada movimiento cuenta.",
        "kicker": "REDZA / CARGA",
        "support": "Manipulación, preparación y despacho con orden operacional.",
        "cta": "Coordina tu próximo servicio",
        "layout": "editorial",
        "focus": (0.48, 0.5),
    },
    {
        "dir": "day-07-quote-checklist",
        "photo": PHOTO_ORIGINAL / "traspaleta.jpeg",
        "headline": "Para cotizar necesitamos 4 datos.",
        "kicker": "ORIGEN / DESTINO / CARGA / FECHA",
        "support": "Con información clara podemos orientar mejor el servicio.",
        "cta": "Envíalos por WhatsApp",
        "layout": "conversion",
        "focus": (0.5, 0.7),
    },
    {
        "dir": "day-08-origin-to-destination",
        "photo": PHOTO_OPTIMIZED / "redza-ruta-la-mano-del-desierto.webp",
        "headline": "Del origen al destino, con coordinación.",
        "kicker": "REDZA / COBERTURA",
        "support": "Cada ruta tiene su propio contexto. La planificación también.",
        "cta": "Revisemos tu ruta",
        "layout": "editorial",
        "focus": (0.5, 0.5),
    },
    {
        "dir": "day-09-b2b-transport",
        "photo": PHOTO_ORIGINAL / "trucks 2.jpeg",
        "headline": "Transporte B2B que se adapta a tu operación.",
        "kicker": "DISTRIBUCIÓN / CARGA / RUTAS",
        "support": "Coordinamos el servicio según lo que tu negocio necesita mover.",
        "cta": "Solicita una cotización",
        "layout": "conversion",
        "focus": (0.5, 0.48),
    },
    {
        "dir": "day-10-clear-coordination",
        "photo": PHOTO_ORIGINAL / "trucks3.jpeg",
        "headline": "Claridad desde el primer contacto.",
        "kicker": "REDZA / CONFIANZA B2B",
        "support": "Información, coordinación y seguimiento para reducir fricciones.",
        "cta": "Conversemos",
        "layout": "signal",
        "focus": (0.5, 0.48),
    },
    {
        "dir": "day-11-website-quote",
        "photo": PHOTO_OPTIMIZED / "redza-hero-operacion-poster.webp",
        "headline": "Cotiza desde redza.cl.",
        "kicker": "REDZA / CONTACTO DIRECTO",
        "support": "Revisa nuestros servicios y abre WhatsApp en un paso.",
        "cta": "Visita www.redza.cl",
        "layout": "editorial",
        "focus": (0.48, 0.5),
    },
    {
        "dir": "day-12-next-route",
        "photo": PHOTO_OPTIMIZED / "redza-flota-camiones-patio.webp",
        "headline": "Hablemos de tu próxima ruta.",
        "kicker": "ORIGEN + DESTINO + CARGA + FECHA",
        "support": "Cuéntanos lo esencial y partimos desde ahí.",
        "cta": "+56 9 8788 5833",
        "layout": "conversion",
        "focus": (0.5, 0.34),
    },
]


def b64(data: bytes, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(data).decode("ascii")


def data_uri(path: Path, mime: str | None = None) -> str:
    if mime is None:
        mime = {
            ".svg": "image/svg+xml",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
        }.get(path.suffix.lower(), "application/octet-stream")
    return b64(path.read_bytes(), mime)


def embed_photo(path: Path, width: int, height: int, focus: tuple[float, float]) -> str:
    image = Image.open(path).convert("RGB")
    image = ImageOps.fit(image, (width, height), method=Image.Resampling.LANCZOS, centering=focus)
    image = ImageEnhance.Contrast(image).enhance(1.035)
    image = ImageEnhance.Color(image).enhance(0.94)
    image = image.filter(ImageFilter.UnsharpMask(radius=0.8, percent=58, threshold=3))
    stream = io.BytesIO()
    image.save(stream, format="JPEG", quality=96, subsampling=0, optimize=True)
    return b64(stream.getvalue(), "image/jpeg")


def svg_text(text: str) -> str:
    return html.escape(text)


def wrap_lines(text: str, max_chars: int, max_lines: int = 3) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
        candidate = " ".join(current + [word])
        if current and len(candidate) > max_chars and len(lines) < max_lines - 1:
            lines.append(" ".join(current))
            current = [word]
        else:
            current.append(word)
    if current:
        lines.append(" ".join(current))
    return lines[:max_lines]


def text_block(lines: list[str], *, x: int, y: int, size: int, line_height: int, color: str, weight: int = 800, anchor: str = "start") -> str:
    return "\n".join(
        f'<text class="display" x="{x}" y="{y + index * line_height}" fill="{color}" font-size="{size}" font-weight="{weight}" letter-spacing="-1.8" text-anchor="{anchor}">{svg_text(line)}</text>'
        for index, line in enumerate(lines)
    )


def support_block(text: str, *, story: bool, y: int, color: str) -> str:
    lines = wrap_lines(text, 43 if story else 57, 2)
    x = 78 if not story else 88
    size = 27 if story else 23
    line_height = 38 if story else 32
    return text_block(lines, x=x, y=y, size=size, line_height=line_height, color=color, weight=600)


def logo_image(white: bool, *, x: int, y: int, width: int) -> str:
    source = WHITE_LOGO_SOURCE / "redza white lettering svg.svg" if white else BLACK_LOGO_SOURCE / "lettering black svg.svg"
    return f'<image href="{data_uri(source)}" x="{x}" y="{y}" width="{width}" height="54" preserveAspectRatio="xMinYMid meet"/>'


def cta_pill(cta: str, *, x: int, y: int, dark: bool) -> str:
    width = min(820, max(270, 72 + len(cta) * 15))
    fill = CREAM if dark else INK
    text_color = INK if dark else WHITE
    return f'''<rect x="{x}" y="{y}" width="{width}" height="64" rx="32" fill="{fill}"/>
  <text class="display" x="{x + 32}" y="{y + 41}" fill="{text_color}" font-size="23" font-weight="800">{svg_text(cta)}</text>'''


def social_svg(*, post: dict, story: bool) -> str:
    width, height = (1080, 1920) if story else (1080, 1350)
    photo_height = 1080 if story else 760
    photo = embed_photo(post["photo"], width, photo_height, post["focus"])
    headline = wrap_lines(post["headline"], 21 if story else 26, 3)
    layout = post["layout"]
    index = POSTS.index(post) + 1

    if layout == "signal":
        panel_y = 1060 if story else 735
        headline_y = 1245 if story else 885
        headline_size = 76 if story else 64
        line_height = 82 if story else 69
        support_y = 1530 if story else 1095
        cta_y = 1695 if story else 1195
        logo_y = 96 if story else 62
        kicker_y = 208 if story else 158
        return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  {FONT_STYLE}
  <defs>
    <linearGradient id="grade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{INK}" stop-opacity="0.12"/><stop offset="1" stop-color="{INK}" stop-opacity="0.76"/></linearGradient>
  </defs>
  <rect width="{width}" height="{height}" fill="{INK}"/>
  <image href="{photo}" x="0" y="0" width="{width}" height="{photo_height}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="{width}" height="{photo_height}" fill="url(#grade)"/>
  <rect x="0" y="{panel_y}" width="{width}" height="{height - panel_y}" fill="{INK}"/>
  <rect x="0" y="{panel_y}" width="16" height="{height - panel_y}" fill="{RED}"/>
  <path d="M0 {panel_y + 34} C300 {panel_y - 28}, 690 {panel_y + 72}, 1080 {panel_y + 4}" fill="none" stroke="{RED}" stroke-width="3"/>
  {logo_image(True, x=78 if not story else 88, y=logo_y, width=288 if not story else 310)}
  <rect x="{78 if not story else 88}" y="{kicker_y - 28}" width="12" height="12" fill="{RED}"/>
  <text class="mono" x="{104 if not story else 114}" y="{kicker_y - 16}" fill="{WHITE}" font-size="16" font-weight="500" letter-spacing="2">{svg_text(post['kicker'])}</text>
  {text_block(headline, x=78 if not story else 88, y=headline_y, size=headline_size, line_height=line_height, color=WHITE)}
  {support_block(post['support'], story=story, y=support_y, color=MUTED)}
  {cta_pill(post['cta'], x=78 if not story else 88, y=cta_y, dark=True)}
  <text class="mono" x="{width - 78}" y="{height - 34}" fill="{MUTED}" font-size="14" text-anchor="end" letter-spacing="1.6">REDZA.CL / {index:02d}</text>
</svg>'''

    if layout == "editorial":
        photo_y = 275 if story else 205
        photo_h = 880 if story else 610
        headline_y = 1305 if story else 930
        headline_size = 72 if story else 60
        line_height = 79 if story else 65
        support_y = 1570 if story else 1122
        cta_y = 1720 if story else 1210
        return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  {FONT_STYLE}
  <rect width="{width}" height="{height}" fill="{CREAM}"/>
  <rect x="0" y="0" width="18" height="{height}" fill="{RED}"/>
  {logo_image(False, x=78 if not story else 88, y=66 if not story else 104, width=288 if not story else 310)}
  <text class="mono" x="{width - 78}" y="{103 if not story else 142}" fill="{RED_DARK}" font-size="15" text-anchor="end" letter-spacing="1.7">{svg_text(post['kicker'])}</text>
  <rect x="{78 if not story else 88}" y="{photo_y}" width="{924 if not story else 904}" height="{photo_h}" fill="{WHITE}" stroke="{INK}" stroke-width="2"/>
  <image href="{photo}" x="{84 if not story else 94}" y="{photo_y + 6}" width="{912 if not story else 892}" height="{photo_h - 12}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="{78 if not story else 88}" y="{photo_y}" width="112" height="42" fill="{RED}"/>
  <text class="mono" x="{134 if not story else 144}" y="{photo_y + 27}" fill="{WHITE}" font-size="14" font-weight="500" text-anchor="middle">{index:02d} / 12</text>
  {text_block(headline, x=78 if not story else 88, y=headline_y, size=headline_size, line_height=line_height, color=INK)}
  {support_block(post['support'], story=story, y=support_y, color="#555559")}
  {cta_pill(post['cta'], x=78 if not story else 88, y=cta_y, dark=False)}
  <line x1="{78 if not story else 88}" y1="{height - 39}" x2="{width - 78}" y2="{height - 39}" stroke="{RED}" stroke-width="3"/>
</svg>'''

    photo_y = 690 if story else 650
    photo_h = 600 if story else 330
    headline_y = 290 if story else 255
    headline_size = 79 if story else 66
    line_height = 86 if story else 72
    support_y = 1435 if story else 1050
    cta_y = 1665 if story else 1195
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  {FONT_STYLE}
  <rect width="{width}" height="{height}" fill="{INK}"/>
  <rect x="0" y="0" width="{width}" height="18" fill="{RED}"/>
  {logo_image(True, x=78 if not story else 88, y=76 if not story else 112, width=288 if not story else 310)}
  <text class="mono" x="{width - 78}" y="{112 if not story else 152}" fill="{RED}" font-size="15" text-anchor="end" letter-spacing="1.7">{index:02d} / 12</text>
  {text_block(headline, x=78 if not story else 88, y=headline_y, size=headline_size, line_height=line_height, color=WHITE)}
  <text class="mono" x="{78 if not story else 88}" y="{575 if not story else 610}" fill="{RED}" font-size="17" font-weight="500" letter-spacing="1.5">{svg_text(post['kicker'])}</text>
  <rect x="{78 if not story else 88}" y="{photo_y}" width="{924 if not story else 904}" height="{photo_h}" fill="{SOFT}" stroke="{RED}" stroke-width="3"/>
  <image href="{photo}" x="{84 if not story else 94}" y="{photo_y + 6}" width="{912 if not story else 892}" height="{photo_h - 12}" preserveAspectRatio="xMidYMid slice"/>
  <rect x="{78 if not story else 88}" y="{photo_y + photo_h - 18}" width="310" height="18" fill="{RED}"/>
  {support_block(post['support'], story=story, y=support_y, color=MUTED)}
  {cta_pill(post['cta'], x=78 if not story else 88, y=cta_y, dark=True)}
  <text class="mono" x="{width - 78}" y="{height - 34}" fill="{MUTED}" font-size="14" text-anchor="end" letter-spacing="1.5">WWW.REDZA.CL</text>
</svg>'''


def chrome_path() -> str:
    candidates = [
        Path(os.environ.get("PROGRAMFILES", "C:/Program Files")) / "Google/Chrome/Application/chrome.exe",
        Path(os.environ.get("PROGRAMFILES(X86)", "C:/Program Files (x86)")) / "Microsoft/Edge/Application/msedge.exe",
    ]
    for candidate in candidates:
        if candidate.exists():
            return str(candidate)
    raise RuntimeError("Chrome or Edge is required to render SVG previews.")


def render_svg(svg_path: Path, output_path: Path, width: int, height: int) -> None:
    with tempfile.TemporaryDirectory(prefix="redza-svg-") as temp:
        wrapper = Path(temp) / "render.html"
        wrapper.write_text(
            "<!doctype html><html><head><meta charset='utf-8'><style>html,body{margin:0;width:%dpx;height:%dpx;overflow:hidden;background:transparent}img{display:block;width:100%%;height:100%%}</style></head><body><img src='%s'></body></html>"
            % (width, height, svg_path.resolve().as_uri()),
            encoding="utf-8",
        )
        profile = Path(temp) / "profile"
        subprocess.run(
            [
                chrome_path(),
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--allow-file-access-from-files",
                "--virtual-time-budget=2400",
                f"--user-data-dir={profile}",
                f"--window-size={width},{height}",
                f"--screenshot={output_path.resolve()}",
                wrapper.resolve().as_uri(),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )


def write_social_set(post: dict) -> Path:
    day_dir = BRAND / "04-social-content" / post["dir"]
    day_dir.mkdir(parents=True, exist_ok=True)
    feed_path = day_dir / "feed.svg"
    story_path = day_dir / "story.svg"
    feed_path.write_text(social_svg(post=post, story=False), encoding="utf-8")
    story_path.write_text(social_svg(post=post, story=True), encoding="utf-8")
    render_svg(feed_path, day_dir / "feed.png", 1080, 1350)
    render_svg(story_path, day_dir / "story.png", 1080, 1920)
    relative_source = post["photo"].relative_to(ROOT).as_posix()
    with Image.open(post["photo"]) as source_image:
        source_size = f"{source_image.width} x {source_image.height} px"
    (day_dir / "asset-notes.md").write_text(
        "# Notas del recurso\n\n"
        f"- Fuente fotográfica: `{relative_source}` ({source_size}).\n"
        "- Logo: `public/images/redza branding/white svgs/` sobre fondos oscuros y `public/images/redza branding/black svgs/` sobre fondos claros.\n"
        "- Feed: `feed.png` (1080 x 1350 px) y master editable `feed.svg`.\n"
        "- Historia: `story.png` (1080 x 1920 px) y master editable `story.svg`.\n"
        "- Tratamiento: recorte Lanczos, ajuste tonal leve y nitidez controlada; sin ampliación por IA.\n"
        "- Paleta: sistema aprobado en `02-visual-system/brand-guidelines.md`.\n",
        encoding="utf-8",
    )
    return day_dir


def create_social_overview(day_dirs: list[Path]) -> None:
    tile_w, tile_h = 270, 338
    gap_x, gap_y = 24, 54
    margin = 48
    canvas_w = margin * 2 + tile_w * 4 + gap_x * 3
    canvas_h = 110 + tile_h * 3 + gap_y * 2 + 70
    overview = Image.new("RGB", (canvas_w, canvas_h), (243, 243, 241))
    draw = ImageDraw.Draw(overview)
    draw.text((margin, 38), "REDZA / BANCO DE CONTENIDO / 12 POSTS", fill=(11, 11, 12))
    for index, day_dir in enumerate(day_dirs):
        image = Image.open(day_dir / "feed.png").convert("RGB").resize((tile_w, tile_h), Image.Resampling.LANCZOS)
        col, row = index % 4, index // 4
        x = margin + col * (tile_w + gap_x)
        y = 92 + row * (tile_h + gap_y)
        overview.paste(image, (x, y))
        draw.text((x, y + tile_h + 10), f"{index + 1:02d}  {day_dir.name}", fill=(91, 91, 95))
    overview.save(BRAND / "04-social-content" / "redza-social-content-overview.png", quality=96)


def make_qr(path: Path) -> str:
    target = "https://wa.me/56987885833?text=Hola%20Redza%2C%20vi%20su%20tarjeta.%20Quiero%20cotizar%20un%20transporte."
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=28, border=4)
    qr.add_data(target)
    qr.make(fit=True)
    image = qr.make_image(fill_color=INK, back_color=WHITE).convert("RGB")
    image.save(path)
    return target


def card_svg(front: bool, qr_path: Path) -> str:
    full_logo = data_uri(WHITE_LOGO_SOURCE / "redza white svg.svg")
    truck_black = data_uri(BLACK_LOGO_SOURCE / "black truck svg.svg")
    qr = data_uri(qr_path, "image/png")
    if front:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" width="96mm" height="56mm" viewBox="0 0 96 56">
  {FONT_STYLE}
  <rect width="96" height="56" fill="{INK}"/>
  <rect x="0" y="0" width="3" height="56" fill="{RED}"/>
  <path d="M3 8 C28 2, 58 13, 96 4" fill="none" stroke="{RED}" stroke-width="0.45"/>
  <path d="M3 11 C31 6, 63 16, 96 8" fill="none" stroke="{WHITE}" stroke-opacity="0.18" stroke-width="0.25"/>
  <text class="mono" x="8.5" y="10.5" fill="{RED}" font-size="2.25" font-weight="500" letter-spacing="0.35">REDZA / CL</text>
  <image href="{full_logo}" x="8.5" y="14" width="64" height="24" preserveAspectRatio="xMinYMid meet"/>
  <line x1="8.5" y1="42" x2="87.5" y2="42" stroke="{WHITE}" stroke-opacity="0.18" stroke-width="0.3"/>
  <text class="display" x="8.5" y="47.7" fill="{WHITE}" font-size="2.75" font-weight="700" letter-spacing="0.18">TRANSPORTE · DISTRIBUCIÓN · LOGÍSTICA</text>
  <rect x="84.5" y="44.6" width="3" height="3" fill="{RED}"/>
</svg>'''

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="96mm" height="56mm" viewBox="0 0 96 56">
  {FONT_STYLE}
  <rect width="96" height="56" fill="{CREAM}"/>
  <rect x="0" y="0" width="96" height="3" fill="{RED}"/>
  <image href="{truck_black}" x="8.5" y="8.3" width="24" height="6.8" preserveAspectRatio="xMinYMid meet"/>
  <text class="mono" x="8.5" y="20.7" fill="{RED_DARK}" font-size="2.3" font-weight="500" letter-spacing="0.28">COTIZACIONES / WHATSAPP</text>
  <text class="display" x="8.5" y="28.3" fill="{INK}" font-size="5.05" font-weight="800" letter-spacing="-0.16">+56 9 8788 5833</text>
  <text class="display" x="8.5" y="36" fill="{INK}" font-size="3.8" font-weight="800">www.redza.cl</text>
  <text class="display" x="8.5" y="41.2" fill="#555559" font-size="2.65" font-weight="600">Origen · destino · carga · fecha</text>
  <path d="M8.5 46.5 C24 42.5, 42 49.2, 59.5 44.5" fill="none" stroke="{RED}" stroke-width="0.55"/>
  <rect x="64" y="7.5" width="24" height="34" rx="1.6" fill="{INK}"/>
  <rect x="65.6" y="9.1" width="20.8" height="20.8" rx="0.5" fill="{WHITE}"/>
  <image href="{qr}" x="66.1" y="9.6" width="19.8" height="19.8" preserveAspectRatio="none"/>
  <rect x="64" y="32" width="24" height="9.5" rx="1.6" fill="{RED}"/>
  <rect x="64" y="32" width="24" height="2" fill="{RED}"/>
  <text class="display" x="76" y="36.2" text-anchor="middle" fill="{WHITE}" font-size="2.55" font-weight="800">COTIZA AQUÍ</text>
  <text class="mono" x="76" y="39.4" text-anchor="middle" fill="{WHITE}" font-size="1.55" letter-spacing="0.12">ESCANEA / WHATSAPP</text>
  <text class="mono" x="88" y="48" text-anchor="end" fill="#77777A" font-size="1.7" letter-spacing="0.15">GERENCIA COMERCIAL</text>
</svg>'''


def create_logo_usage_sheet() -> None:
    white_logo = data_uri(WHITE_LOGO_SOURCE / "redza white svg.svg")
    black_logo = data_uri(BLACK_LOGO_SOURCE / "full logo redza black svg.svg")
    sheet = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">
  {FONT_STYLE}
  <rect width="1200" height="720" fill="{CREAM}"/>
  <rect x="48" y="48" width="1104" height="300" rx="18" fill="{INK}"/>
  <text class="mono" x="84" y="92" fill="{RED}" font-size="13" letter-spacing="2">APROBADO / FONDO OSCURO</text>
  <image href="{white_logo}" x="180" y="132" width="840" height="170" preserveAspectRatio="xMidYMid meet"/>
  <rect x="48" y="390" width="536" height="280" rx="18" fill="{WHITE}" stroke="#DEDEDE"/>
  <text class="mono" x="84" y="434" fill="{RED_DARK}" font-size="13" letter-spacing="2">APROBADO / FONDO CLARO</text>
  <image href="{black_logo}" x="84" y="462" width="440" height="110" preserveAspectRatio="xMidYMid meet"/>
  <text class="display" x="84" y="615" fill="#6D6D70" font-size="17">Usar solamente los SVG oficiales.</text>
  <rect x="616" y="390" width="536" height="280" rx="18" fill="{SOFT}"/>
  <text class="mono" x="652" y="434" fill="{RED}" font-size="13" letter-spacing="2">NO HACER</text>
  <text class="display" x="652" y="490" fill="{WHITE}" font-size="25" font-weight="800">No estirar, rotar ni recolorear.</text>
  <text class="display" x="652" y="535" fill="#9A9A9E" font-size="17">No colocar el logo sobre una foto</text>
  <text class="display" x="652" y="562" fill="#9A9A9E" font-size="17">sin un campo de contraste controlado.</text>
</svg>'''
    (BRAND / "02-visual-system" / "logo-usage-sheet.svg").write_text(sheet, encoding="utf-8")


def create_cards() -> None:
    card_dir = BRAND / "05-business-card"
    card_dir.mkdir(parents=True, exist_ok=True)
    qr_path = card_dir / "redza-whatsapp-qr.png"
    target = make_qr(qr_path)
    front_svg = card_dir / "redza-business-card-front.svg"
    back_svg = card_dir / "redza-business-card-back.svg"
    front_svg.write_text(card_svg(True, qr_path), encoding="utf-8")
    back_svg.write_text(card_svg(False, qr_path), encoding="utf-8")
    front_png = card_dir / "redza-business-card-front.png"
    back_png = card_dir / "redza-business-card-back.png"
    render_svg(front_svg, front_png, 2268, 1323)
    render_svg(back_svg, back_png, 2268, 1323)

    preview = Image.new("RGB", (2400, 900), (224, 224, 222))
    front = Image.open(front_png).convert("RGB").resize((1100, 642), Image.Resampling.LANCZOS)
    back = Image.open(back_png).convert("RGB").resize((1100, 642), Image.Resampling.LANCZOS)
    preview.paste(front, (70, 140))
    preview.paste(back, (1230, 140))
    draw = ImageDraw.Draw(preview)
    draw.text((70, 70), "FRENTE", fill=INK)
    draw.text((1230, 70), "REVERSO", fill=INK)
    preview.save(card_dir / "redza-business-card-preview.png", quality=96)

    pdf_path = card_dir / "redza-business-card-print.pdf"
    width_pt = 96 / 25.4 * 72
    height_pt = 56 / 25.4 * 72
    pdf = canvas.Canvas(str(pdf_path), pagesize=(width_pt, height_pt), pageCompression=1)
    pdf.setTitle("Redza - Tarjeta comercial")
    pdf.setSubject("Tarjeta 90 x 50 mm con 3 mm de sangrado")
    for image_path in (front_png, back_png):
        pdf.drawImage(ImageReader(image_path), 0, 0, width=width_pt, height=height_pt, mask="auto")
        pdf.showPage()
    pdf.save()

    (card_dir / "qr-destination.txt").write_text(target + "\n", encoding="utf-8")


def main() -> None:
    logo_dir = BRAND / "03-logo-assets"
    logo_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(WHITE_LOGO_SOURCE / "redza white svg.svg", logo_dir / "redza-full-lockup-white.svg")
    shutil.copy2(WHITE_LOGO_SOURCE / "redza white lettering svg.svg", logo_dir / "redza-lettering-white.svg")
    shutil.copy2(WHITE_LOGO_SOURCE / "white truck.svg", logo_dir / "redza-truck-white.svg")
    shutil.copy2(BLACK_LOGO_SOURCE / "full logo redza black svg.svg", logo_dir / "redza-full-lockup-black.svg")
    shutil.copy2(BLACK_LOGO_SOURCE / "lettering black svg.svg", logo_dir / "redza-lettering-black.svg")
    shutil.copy2(BLACK_LOGO_SOURCE / "black truck svg.svg", logo_dir / "redza-truck-black.svg")
    create_logo_usage_sheet()

    day_dirs = [write_social_set(post) for post in POSTS]
    create_social_overview(day_dirs)
    create_cards()


if __name__ == "__main__":
    main()
