#!/usr/bin/env bash
# ============================================================
# ViewEstate — media optimizer
# ------------------------------------------------------------
# Produces web-optimized, high-quality media for the site.
# Requires ffmpeg on PATH (or set FFMPEG=/path/to/ffmpeg).
#
# Usage:
#   tools/optimize-media.sh video <input> <name>
#       -> videos/<name>.mp4   (H.264 high, CRF20, CFR30, +faststart, AAC)
#       -> videos/<name>.webm  (VP9 CRF32, Opus) — lighter, served first
#       -> videos/<name>-poster.jpg (first frame, for the <video poster>)
#
#   tools/optimize-media.sh image <input> <name>
#       -> images/<name>.webp        (full size, high quality)
#       -> images/<name>-1280.webp   (responsive)
#       -> images/<name>-800.webp    (responsive)
#       -> images/<name>.jpg         (fallback)
#
# Examples:
#   tools/optimize-media.sh video ~/Downloads/rothschild.mov rothschild
#   tools/optimize-media.sh image ~/Downloads/livingroom.png rothschild-1
# ============================================================
set -euo pipefail

FF="${FFMPEG:-ffmpeg}"
command -v "$FF" >/dev/null 2>&1 || { echo "ffmpeg not found (set FFMPEG=...)"; exit 1; }

mode="${1:-}"; in="${2:-}"; name="${3:-}"
[ -z "$mode" ] || [ -z "$in" ] || [ -z "$name" ] && { sed -n '2,30p' "$0"; exit 1; }
[ -f "$in" ] || { echo "input not found: $in"; exit 1; }

root="$(cd "$(dirname "$0")/.." && pwd)"

case "$mode" in
  video)
    mkdir -p "$root/videos"
    echo "→ MP4 (H.264 high, CRF20, CFR30, faststart)…"
    "$FF" -y -i "$in" \
      -c:v libx264 -profile:v high -preset slow -crf 20 \
      -pix_fmt yuv420p -fps_mode cfr -r 30 \
      -c:a aac -b:a 128k -movflags +faststart \
      "$root/videos/$name.mp4"
    echo "→ WebM (VP9 CRF32, Opus)…"
    "$FF" -y -i "$in" \
      -c:v libvpx-vp9 -crf 32 -b:v 0 -row-mt 1 -pix_fmt yuv420p \
      -c:a libopus -b:a 96k \
      "$root/videos/$name.webm"
    echo "→ poster (first frame)…"
    "$FF" -y -i "$in" -vframes 1 -q:v 3 "$root/videos/$name-poster.jpg"
    echo "✓ done: videos/$name.{mp4,webm} + $name-poster.jpg"
    ;;

  image)
    mkdir -p "$root/images"
    echo "→ WebP (full, high quality)…"
    "$FF" -y -i "$in" -c:v libwebp -quality 86 -compression_level 6 "$root/images/$name.webp"
    echo "→ WebP responsive variants…"
    "$FF" -y -i "$in" -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 84 "$root/images/$name-1280.webp"
    "$FF" -y -i "$in" -vf "scale='min(800,iw)':-2"  -c:v libwebp -quality 82 "$root/images/$name-800.webp"
    echo "→ JPG fallback…"
    "$FF" -y -i "$in" -vf "scale='min(1920,iw)':-2" -q:v 3 "$root/images/$name.jpg"
    echo "✓ done: images/$name.webp (+1280,+800) + $name.jpg"
    ;;

  *)
    echo "unknown mode '$mode' (use: video | image)"; exit 1 ;;
esac
