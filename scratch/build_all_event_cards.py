import os
import colorsys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs('scratch/output_cards', exist_ok=True)

# 1. Load the 4 clean bases
yellow_base = Image.open('scratch/inspect_cards/clean_yellow_base.png').convert('RGBA').resize((689, 799), Image.Resampling.LANCZOS)
red_base = Image.open('scratch/inspect_cards/clean_red_base.png').convert('RGBA').resize((689, 799), Image.Resampling.LANCZOS)
green_base = Image.open('scratch/inspect_cards/clean_green_base.png').convert('RGBA').resize((689, 799), Image.Resampling.LANCZOS)
purple_base = Image.open('scratch/inspect_cards/clean_purple_689x799.png').convert('RGBA')

# Font
font_path = '/System/Library/Fonts/Supplemental/Georgia.ttf'
try:
    font = ImageFont.truetype(font_path, 56)
except:
    font = ImageFont.load_default()

def transform_base(base_img, base_type, target_h, target_s_mult=1.0, target_v_mult=1.0, target_v_abs=None):
    w, h = base_img.size
    pixels = base_img.load()
    out = Image.new('RGBA', (w, h))
    out_pix = out.load()
    
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a < 10:
                out_pix[x, y] = (0, 0, 0, 0)
                continue
            
            h_norm, s_norm, v_norm = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            
            is_paper = False
            if base_type == 'yellow':
                if 0.06 <= h_norm <= 0.18 and s_norm > 0.45 and v_norm > 0.6:
                    is_paper = True
            elif base_type == 'red':
                if (h_norm >= 0.94 or h_norm <= 0.03) and s_norm > 0.45:
                    is_paper = True
            elif base_type == 'green':
                if 0.33 <= h_norm <= 0.48 and s_norm > 0.35:
                    is_paper = True
            elif base_type == 'purple':
                if 0.70 <= h_norm <= 0.93 and s_norm > 0.2:
                    is_paper = True
                    
            if is_paper:
                nh = target_h
                ns = min(1.0, s_norm * target_s_mult)
                if target_v_abs is not None:
                    nv = max(0.0, min(1.0, target_v_abs * (v_norm / 0.85)))
                else:
                    nv = max(0.0, min(1.0, v_norm * target_v_mult))
                nr, ng, nb = colorsys.hsv_to_rgb(nh, ns, nv)
                out_pix[x, y] = (int(nr*255), int(ng*255), int(nb*255), a)
            else:
                out_pix[x, y] = (r, g, b, a)
                
    return out

def draw_title(im, title, is_dark_bg=True, y_baseline=300):
    draw = ImageDraw.Draw(im)
    w, h = im.size
    
    bbox = font.getbbox(title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (w - tw) // 2
    ty = y_baseline - th
    
    if is_dark_bg:
        draw.text((tx, ty + 2), title, font=font, fill=(0, 0, 0, 180))
        draw.text((tx, ty), title, font=font, fill=(255, 255, 255, 255))
        line_color = (229, 195, 140, 240)
        diamond_color = (245, 220, 160, 255)
    else:
        for ox, oy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            draw.text((tx + ox, ty + oy), title, font=font, fill=(255, 255, 255, 220))
        draw.text((tx, ty), title, font=font, fill=(26, 26, 26, 255))
        line_color = (40, 30, 20, 240)
        diamond_color = (40, 30, 20, 255)
        
    line_y = y_baseline + 28
    line_half = max(95, tw // 2 + 35)
    cx = w // 2
    
    draw.line([(cx - line_half, line_y), (cx - 10, line_y)], fill=line_color, width=2)
    draw.line([(cx + 10, line_y), (cx + line_half, line_y)], fill=line_color, width=2)
    d_size = 5
    draw.polygon([(cx, line_y - d_size), (cx + d_size, line_y), (cx, line_y + d_size), (cx - d_size, line_y)], fill=diamond_color)

def compose_card(base, art_path, title, is_dark_bg, art_width=450, bottom_y=755, shadow_opacity=110):
    card = base.copy()
    w, h = card.size
    
    # Draw title
    draw_title(card, title, is_dark_bg=is_dark_bg, y_baseline=295)
    
    # Load and resize art
    art = Image.open(art_path).convert('RGBA')
    # If the art has transparent border, crop it first
    art_bbox = art.getbbox()
    if art_bbox:
        art = art.crop(art_bbox)
        
    target_w = art_width
    target_h = int(art.height * (target_w / art.width))
    # Cap height if it exceeds 390
    if target_h > 390:
        target_h = 390
        target_w = int(art.width * (target_h / art.height))
        
    art_resized = art.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    px = (w - target_w) // 2
    py = bottom_y - target_h
    
    # Drop shadow
    shadow_mask = art_resized.split()[3]
    shadow = Image.new('RGBA', art_resized.size, (15, 10, 5, shadow_opacity))
    shadow.putalpha(shadow_mask)
    shadow_blurred = shadow.filter(ImageFilter.GaussianBlur(6))
    
    card.paste(shadow_blurred, (px, py + 4), shadow_blurred)
    card.paste(art_resized, (px, py), art_resized)
    return card

# Define the 14 cards:
# (Name, FileKey, BaseImg, BaseType, TargetHue, SatMult, ValMult, TargetValAbs, IsDark, ArtWidth, BottomY, ShadowOpacity)
cards_spec = [
    # 1. Mayra: Warm Amber Gold / Saffron
    ('Mayra', 'Mayra-card.png', yellow_base, 'yellow', 0.095, 1.10, 0.92, None, False, 620, 750, 100),
    
    # 2. Shagun: Auspicious Sindoor Red
    ('Shagun', 'Shagun-card.png', red_base, 'red', 0.015, 1.10, 1.08, None, True, 450, 755, 110),
    
    # 3. Cocktail: Deep Midnight Navy Blue
    ('Cocktail', 'Cocktail-card.png', purple_base, 'purple', 0.61, 1.05, 0.78, None, True, 480, 755, 120),
    
    # 4. Tilak: Warm Terracotta Copper Ochre
    ('Tilak', 'Tilak-card.png', red_base, 'red', 0.06, 0.88, 1.05, None, True, 460, 755, 110),
    
    # 5. Mehendi: Emerald Henna Forest Green
    ('Mehendi', 'Mehandi-card.png', green_base, 'green', 0.41, 1.0, 1.0, None, True, 430, 755, 110),
    
    # 6. Engagement: Romantic Blush Rose Pink
    ('Engagement', 'Engagement-card.png', red_base, 'red', 0.965, 0.52, None, 0.88, False, 440, 755, 95),
    
    # 7. Sangeet: Royal Imperial Amethyst Violet
    ('Sangeet', 'Sangeet-card.png', purple_base, 'purple', 0.79, 1.0, 1.0, None, True, 470, 755, 110),
    
    # 8. Haldi: Bright Sunshine Turmeric Yellow
    ('Haldi', 'Haldi-card.png', yellow_base, 'yellow', 0.12, 1.0, 1.0, None, False, 430, 755, 90),
    
    # 9. Bhaat: Radiant Tangerine Orange
    ('Bhaat', 'Bhaat-card.png', yellow_base, 'yellow', 0.065, 1.15, 0.90, None, True, 460, 755, 110),
    
    # 10. Shaadi: Deep Royal Bridal Maroon
    ('Shaadi', 'Shaadi-card.png', red_base, 'red', 0.985, 1.0, 1.0, None, True, 450, 760, 120),
    
    # 11. Varmala: Peacock Teal / Ocean Turquoise
    ('Varmala', 'Varmala-card.png', green_base, 'green', 0.52, 1.10, 0.95, None, True, 450, 755, 110),
    
    # 12. Pheras: Sacred Agni Flame Scarlet
    ('Pheras', 'Pheras-card.png', red_base, 'red', 0.038, 1.15, 1.15, None, True, 460, 755, 110),
    
    # 13. Reception: Opulent Velvet Wine / Deep Burgundy
    ('Reception', 'Reception-card.png', red_base, 'red', 0.93, 0.95, 0.65, None, True, 450, 760, 120),
    
    # 14. Vidaai: Dusky Twilight Plum / Lilac Mauve
    ('Vidaai', 'Vidaai-card.png', purple_base, 'purple', 0.84, 0.60, 0.80, None, True, 470, 750, 110),
]

for name, file_key, base, btype, th, tsm, tvm, tva, is_dark, art_w, bot_y, sh_op in cards_spec:
    bg = transform_base(base, btype, th, tsm, tvm, tva)
    art_path = f'scratch/cutouts/{name}.png'
    final_card = compose_card(bg, art_path, name, is_dark, art_width=art_w, bottom_y=bot_y, shadow_opacity=sh_op)
    final_card.save(f'scratch/output_cards/{file_key}')
    print(f'{name:12s} -> {file_key} saved (size: {final_card.size})')

