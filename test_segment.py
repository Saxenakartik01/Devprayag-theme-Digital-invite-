from PIL import Image, ImageDraw, ImageFilter
import os

os.makedirs('scratch/bird_layers', exist_ok=True)

# Let's inspect teal bird segmentation
im_teal = Image.open('public/images/decorations/paper_bird_teal.png').convert('RGBA')
w_t, h_t = im_teal.size

# Let's define the anatomical polygons for paper_bird_teal.png
# Head/body:
# Beak tip ~ (720, 460)
# Top of head ~ (630, 390)
# Far wing is behind neck/head: x > 510, y < 450, up to (745, 74)
# Near wing: x from 0 to 520, y from 0 to 520, shoulder at ~ (515, 490)
# Body/chest: x from 350 to 670, y from 440 to 660
# Tail: x from 80 to 380, y from 560 to 797

print("Teal size:", w_t, h_t)
