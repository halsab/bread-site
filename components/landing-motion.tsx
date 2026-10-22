"use client";

import { useEffect } from "react";

const choreography = {
  "hero-main": { travel: -96, drift: 0, zoom: 0.035, reveal: 0 },
  "hero-detail": { travel: 74, drift: 10, zoom: 0, reveal: 0 },
  "philosophy-main": { travel: -54, drift: 0, zoom: 0.025, reveal: 0 },
  "philosophy-detail": { travel: 84, drift: -14, zoom: 0, reveal: 12 },
  product: { travel: -24, drift: 0, zoom: 0.025, reveal: 0 },
  "story-portrait": { travel: -48, drift: 0, zoom: 0.025, reveal: 0 },
  "story-hands": { travel: 68, drift: -12, zoom: 0, reveal: 10 },
  "story-dough": { travel: -76, drift: 8, zoom: 0, reveal: 0 },
  closing: { travel: 0, drift: 0, zoom: 0.055, reveal: 8 },
} satisfies Record<string, { travel: number; drift: number; zoom: number; reveal: number }>;

export type PhotoMotion = keyof typeof choreography;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function LandingMotion() {
  useEffect(() => {
    const root = document.getElementById("main");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const photos = Array.from(root.querySelectorAll<HTMLElement>("[data-photo-motion]"))
      .flatMap((frame) => {
        const key = frame.dataset.photoMotion;
        const surface = frame.querySelector<HTMLElement>(".media-frame__surface");
        const image = frame.querySelector<HTMLElement>(".media-frame__motion");
        if (!key || !(key in choreography) || !surface || !image) return [];
        return [{
          frame, surface, image,
          motion: choreography[key as PhotoMotion],
          top: 0, height: 0, offset: 0,
        }];
      });

    let pendingFrame = 0;
    let needsMeasurement = true;
    let disposed = false;

    function reset() {
      for (const photo of photos) {
        photo.frame.style.removeProperty("transform");
        photo.image.style.removeProperty("transform");
        photo.surface.style.removeProperty("clip-path");
        photo.offset = 0;
      }
    }

    function render() {
      pendingFrame = 0;
      if (disposed || reducedMotion.matches) return;
      const scroll = window.scrollY;
      const viewport = window.innerHeight;

      if (needsMeasurement) {
        for (const photo of photos) {
          const bounds = photo.frame.getBoundingClientRect();
          // Вычитаем собственный сдвиг, чтобы прокрутка не накапливала погрешность.
          photo.top = bounds.top + scroll - photo.offset;
          photo.height = bounds.height;
        }
        needsMeasurement = false;
      }

      const intensity = mobile.matches ? 0.28 : 1;
      for (const photo of photos) {
        const position = photo.top - scroll;
        if (position > viewport + 80 || position + photo.height < -80) continue;
        const progress = clamp((viewport - position) / (viewport + photo.height));
        const entry = clamp((viewport - position) / (viewport * 0.55));
        const reveal = 1 - Math.pow(1 - entry, 3);
        const y = (progress - 0.5) * photo.motion.travel * intensity;
        const x = (progress - 0.5) * photo.motion.drift * intensity;
        photo.offset = y;
        photo.frame.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        photo.image.style.transform = `scale(${1 + photo.motion.zoom * (1 - progress) * intensity})`;
        if (photo.motion.reveal) {
          photo.surface.style.clipPath = `inset(0 0 ${photo.motion.reveal * (1 - reveal)}% 0)`;
        }
      }
    }

    function schedule() {
      if (!disposed && !reducedMotion.matches && !pendingFrame) {
        pendingFrame = window.requestAnimationFrame(render);
      }
    }

    function measure() {
      needsMeasurement = true;
      schedule();
    }

    function preferenceChanged() {
      window.cancelAnimationFrame(pendingFrame);
      pendingFrame = 0;
      reset();
      measure();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", preferenceChanged);
    mobile.addEventListener("change", measure);
    void document.fonts.ready.then(() => { if (!disposed) measure(); });
    schedule();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(pendingFrame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", preferenceChanged);
      mobile.removeEventListener("change", measure);
      reset();
    };
  }, []);

  return null;
}
