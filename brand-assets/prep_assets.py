#!/usr/bin/env python3
"""Prepare SecureOps brand assets: strip generated backgrounds, trim, resize."""

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

DL = os.path.expanduser("~/Downloads")
OUT = ("/Users/danielcohen/Library/CloudStorage/GoogleDrive-danielnotexist@gmail.com"
       "/My Drive/SecureOps Website Project/public/images")


def flood_bg(candidate):
    """Given a bool array of background-coloured pixels, keep only the region
    connected to the image border (protects light pixels inside the object)."""
    h, w = candidate.shape
    # .copy() is required: images created straight from a numpy buffer are
    # read-only, and floodfill silently no-ops on them.
    arr = np.ascontiguousarray(np.where(candidate, 255, 0).astype(np.uint8))
    mask = Image.fromarray(arr).copy()
    seeds = []
    for x in range(0, w, 8):
        seeds += [(x, 0), (x, h - 1)]
    for y in range(0, h, 8):
        seeds += [(0, y), (w - 1, y)]
    for sx, sy in seeds:
        if mask.getpixel((sx, sy)) == 255:
            ImageDraw.floodfill(mask, (sx, sy), 128, thresh=0)
    return np.array(mask) == 128


def alpha_from_mask(img, bg, feather=0.9):
    a = np.where(bg, 0, 255).astype(np.uint8)
    a = Image.fromarray(a).filter(ImageFilter.GaussianBlur(feather))
    out = img.convert("RGBA")
    out.putalpha(a)
    return out


def trim(img, pad_ratio=0.03, thresh=8):
    a = np.array(img.split()[-1])
    ys, xs = np.where(a > thresh)
    if len(xs) == 0:
        return img
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    pad = int(max(x1 - x0, y1 - y0) * pad_ratio)
    x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
    x1, y1 = min(img.width, x1 + pad), min(img.height, y1 + pad)
    return img.crop((x0, y0, x1 + 1, y1 + 1))


def square(img, size):
    """Fit onto a transparent square canvas."""
    img = img.copy()
    img.thumbnail((size, size), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.paste(img, ((size - img.width) // 2, (size - img.height) // 2), img)
    return canvas


def keep_main_blob(body, seed_mask):
    """Keep only the component of `body` reachable from the artwork's centre —
    drops the detached grey drop-shadow the generator painted underneath."""
    ys, xs = np.where(seed_mask)
    if len(xs) == 0:
        return body
    arr = np.ascontiguousarray(np.where(body, 255, 0).astype(np.uint8))
    m = Image.fromarray(arr).copy()
    px = m.load()

    best, best_score, marker = None, 0, 1
    step = max(1, len(xs) // 600)
    for i in range(0, len(xs), step):
        x, y = int(xs[i]), int(ys[i])
        if px[x, y] != 255 or marker > 250:
            continue
        ImageDraw.floodfill(m, (x, y), marker, thresh=0)
        comp = np.array(m) == marker
        score = int((comp & seed_mask).sum())
        if score > best_score:
            best, best_score = comp, score
        marker += 1
    return body if best is None else best


def close_small_holes(hole_mask, max_frac=0.004):
    """Enclosed non-artwork regions: keep the tiny ones (anti-aliasing gaps and
    checker squares seen through glass) and let the big ones stay transparent —
    e.g. the area inside the orbiting ring of the backup icon."""
    arr = np.ascontiguousarray(np.where(hole_mask, 255, 0).astype(np.uint8))
    m = Image.fromarray(arr).copy()
    px = m.load()
    limit = hole_mask.size * max_frac
    keep = np.zeros_like(hole_mask)

    ys, xs = np.where(hole_mask)
    marker, step = 1, max(1, len(xs) // 900)
    for i in range(0, len(xs), step):
        x, y = int(xs[i]), int(ys[i])
        if px[x, y] != 255 or marker > 250:
            continue
        ImageDraw.floodfill(m, (x, y), marker, thresh=0)
        comp = np.array(m) == marker
        if comp.sum() <= limit:
            keep |= comp
        marker += 1
    return keep


def inpaint(rgb, known, rounds=14):
    """Grow known (coloured) pixels into the unknown ones. Used to paint over
    the checkerboard squares showing through the translucent glass parts."""
    out = rgb.astype(np.float32).copy()
    k = known.astype(np.float32)
    for _ in range(rounds):
        if k.min() == 1:
            break
        acc = np.zeros_like(out)
        cnt = np.zeros_like(k)
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            sv = np.roll(np.roll(out * k[..., None], dy, 0), dx, 1)
            sk = np.roll(np.roll(k, dy, 0), dx, 1)
            acc += sv
            cnt += sk
        fill = (cnt > 0) & (k == 0)
        safe = np.where(cnt[..., None] > 0, cnt[..., None], 1)
        out = np.where(fill[..., None], acc / safe, out)
        k = np.where(fill, 1.0, k)
    return np.clip(out, 0, 255).astype(np.uint8)


def strip_checkerboard(path, out_path, size=512, drop_detached=True):
    """Generated icons ship with a *painted* grey/white checkerboard instead of
    real transparency, plus a grey drop shadow. Both are neutral-coloured while
    the artwork is entirely violet/cyan — so saturation separates them.

    drop_detached=False keeps every coloured component: use it when the artwork
    legitimately has floating parts (a motion arc, an orbiting ring) and there
    is no ground shadow that needs discarding.
    """
    img = Image.open(path).convert("RGB")
    a = np.asarray(img).astype(np.int16)
    sat = a.max(axis=2) - a.min(axis=2)

    coloured = sat >= 14
    outside = flood_bg(~coloured)                 # checker around the artwork
    holes = (~coloured) & (~outside)              # enclosed non-artwork pixels
    solid = close_small_holes(holes)              # tiny gaps worth filling
    body = coloured | solid
    if drop_detached:
        body = keep_main_blob(body, coloured)

    # Soft edges: glows and anti-aliased rims are part artwork, part checker.
    # Fade them by saturation instead of keeping them fully opaque, and repaint
    # their colour from the saturated core so no grey checker bleeds through.
    soft = np.clip((sat - 12) / 30.0, 0, 1)
    soft = np.maximum(soft, solid.astype(np.float32))
    soft = np.where(body, soft, 0.0)

    rgb = inpaint(np.asarray(img), sat >= 40)
    out = Image.fromarray(rgb).convert("RGBA")
    alpha = Image.fromarray(
        np.ascontiguousarray((soft * 255).astype(np.uint8))
    ).filter(ImageFilter.GaussianBlur(0.6))
    out.putalpha(alpha)

    square(trim(out), size).save(out_path)
    return out_path


def _finish(out, out_path, max_w):
    out = trim(out, pad_ratio=0.02)
    if max_w and out.width > max_w:
        out = out.resize((max_w, round(out.height * max_w / out.width)), Image.LANCZOS)
    out.save(out_path)
    return out_path


def strip_white(path, out_path, max_w=None):
    """White-background logo. Thresholded globally, not flood-filled, so the
    counters inside letters (the bowl of the O, the e) also become transparent."""
    img = Image.open(path).convert("RGB")
    mn = np.asarray(img).astype(np.int16).min(axis=2)
    alpha = np.clip((255 - mn) / 60.0, 0, 1)
    alpha[alpha < 0.15] = 0            # kill JPEG noise so trim() crops tight
    out = img.convert("RGBA")
    out.putalpha(Image.fromarray(np.ascontiguousarray((alpha * 255).astype(np.uint8))))
    return _finish(out, out_path, max_w)


def strip_white_outer(path, out_path, max_w=None):
    """App-icon plate: only the white *around* the squircle goes transparent —
    the pale squircle fill itself must stay."""
    img = Image.open(path).convert("RGB")
    mn = np.asarray(img).astype(np.int16).min(axis=2)
    out = alpha_from_mask(img, flood_bg(mn > 246), feather=0.6)
    return _finish(out, out_path, max_w)


def strip_dark(path, out_path, max_w=None):
    """White artwork on a dark plate — same idea, inverted."""
    img = Image.open(path).convert("RGB")
    mx = np.asarray(img).astype(np.int16).max(axis=2)
    alpha = np.clip((mx - 70) / 70.0, 0, 1)
    alpha[alpha < 0.15] = 0            # kill JPEG noise so trim() crops tight
    out = img.convert("RGBA")
    out.putalpha(Image.fromarray(np.ascontiguousarray((alpha * 255).astype(np.uint8))))
    return _finish(out, out_path, max_w)


def as_jpeg(path, out_path, max_w):
    img = Image.open(path).convert("RGB")
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    img.save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
    return out_path


def main():
    ICONS = {
        "Cloud_with_server_planes_202607242336.jpeg": "icons/svc-cloud.png",
        "3D_headset_and_chat_bubble_202607242336.jpeg": "icons/svc-support.png",
        "Violet_shield_with_cyan_core_202607242336.jpeg": "icons/svc-cyber.png",
        "Network_nodes_connected_by_tubes_202607242336.jpeg": "icons/svc-firewall.png",
        "Database_cylinders_with_orbiting…_202607242336.jpeg": "icons/svc-backup.png",
        "3D_server_rack_violet_cyan_202607242336.jpeg": "icons/svc-infra.png",
    }
    
    os.makedirs(os.path.join(OUT, "icons"), exist_ok=True)
    
    for src, dst in ICONS.items():
        p = strip_checkerboard(os.path.join(DL, src), os.path.join(OUT, dst))
        im = Image.open(p)
        cov = (np.array(im.split()[-1]) > 10).mean()
        print(f"{dst:28s} {im.size} opaque={cov:.0%}")
    
    print(strip_white(os.path.join(DL, "secureops_logo_primary.png_202607242336.jpeg"),
                      os.path.join(OUT, "secureops_logo_primary.png"), max_w=900))
    print(strip_white_outer(os.path.join(DL, "SecureOps_mark_abstract_shield_202607242336.jpeg"),
                            os.path.join(OUT, "secureops_logo_icon.png"), max_w=512))
    print(strip_dark(os.path.join(DL, "SecureOps_logo_mark_wordmark_tag…_202607242336.jpeg"),
                     os.path.join(OUT, "secureops_logo_white.png"), max_w=700))
    
    print(as_jpeg(os.path.join(DL, "Floating_torus_rings_and_glass_202607242336.jpeg"),
                  os.path.join(OUT, "hero_3d_bg.jpg"), 1920))
    print(as_jpeg(os.path.join(DL, "Security_operations_center_monit…_202607242336.jpeg"),
                  os.path.join(OUT, "about_office.jpg"), 1600))
    print(as_jpeg(os.path.join(DL, "Laptop_displaying_IT_monitoring_…_202607242336.jpeg"),
                  os.path.join(OUT, "purple_laptop.jpg"), 1200))


if __name__ == "__main__":
    main()
