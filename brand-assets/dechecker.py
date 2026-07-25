#!/usr/bin/env python3
"""Flatten the checkerboard the generator paints *through* translucent glass.

Inside the glass the two checker tones are both saturated cyan and differ only
in lightness, so the saturation-based background removal can't touch them.
A gaussian blur averages the two tones into one flat tint; blending it back only
where the local difference is small keeps every real edge and highlight crisp.
"""

import sys
import numpy as np
from PIL import Image, ImageFilter

RADIUS = 10
KEEP_EDGE_ABOVE = 40


def decheck(path):
    im = Image.open(path).convert("RGBA")
    rgb = im.convert("RGB")
    blurred = rgb.filter(ImageFilter.GaussianBlur(RADIUS))
    o = np.asarray(rgb).astype(np.int16)
    b = np.asarray(blurred).astype(np.int16)
    flat = np.abs(o - b).max(axis=2) < KEEP_EDGE_ABOVE
    out = np.where(flat[..., None], b, o).astype(np.uint8)
    res = Image.fromarray(out).convert("RGBA")
    res.putalpha(im.split()[-1])
    res.save(path)
    return float(flat.mean())


for p in sys.argv[1:]:
    print(f"{p.split('/')[-1]:24s} flattened {decheck(p):.0%}")
