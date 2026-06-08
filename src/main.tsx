import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Home, Play, X } from "lucide-react";
import {
  Action,
  PageAsset,
  Project,
  getActionAreaLuminance,
  allPortfolioProjects,
  fullPortfolioProjects,
  getImageLuminance,
  projects,
  routeAliases,
  routeToProjectSlug
} from "./data/portfolio";
import { siteContent } from "./data/siteContent";
import "./styles.css";

type View = "home" | "project" | "full" | "not-found";

interface ModalState {
  action: Action;
}

const assetBasePath = (() => {
  const assetPath = new URL(import.meta.url).pathname;
  const markerIndex = assetPath.indexOf("/assets/");
  return markerIndex > 0 ? assetPath.slice(0, markerIndex) : "";
})();

const stripBasePath = (pathname: string) => {
  if (!assetBasePath) return pathname;
  if (pathname === assetBasePath) return "/";
  if (pathname.startsWith(`${assetBasePath}/`)) return pathname.slice(assetBasePath.length) || "/";
  return pathname;
};

const withBasePath = (url: string) => {
  if (!url.startsWith("/")) return url;
  return `${assetBasePath}${url}`;
};

const normalizePath = (pathname: string) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") || pathname.endsWith(".html") ? pathname : `${pathname}/`;
};

const getView = (pathname: string): { view: View; project?: Project } => {
  const path = normalizePath(stripBasePath(pathname));
  const canonical = routeAliases[path] ?? path;

  if (canonical === "/" || canonical === "/index.html") return { view: "home" };
  if (canonical === "/full/") return { view: "full" };

  const slug = routeToProjectSlug[canonical];
  const project = allPortfolioProjects.find((item) => item.slug === slug);
  if (project) return { view: "project", project };

  return { view: "not-found" };
};

const navigateTo = (url: string) => {
  if (/^https?:\/\//.test(url)) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  window.history.pushState(null, "", withBasePath(url));
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getExternalFallbackUrl = (action: Action) => {
  const bvid = action.url.match(/[?&]bvid=([^&]+)/)?.[1];
  if (bvid) return `https://www.bilibili.com/video/${bvid}`;
  return action.url;
};

const isEmbeddable = (action: Action) => action.type === "video" || action.type === "embed";

const homeNarratives = [
  {
    eyebrow: "VIBE CODING AS PORTFOLIO",
    title: "项目本身",
    body:
      "这个网站不只是作品集的容器，也是一件用 vibe coding 方法完成的个人项目。我把页面结构、动效、图像节奏和自适应按钮都当作设计对象，让浏览体验本身回应作品里的交互研究、服务系统与数字媒介实验。",
    meta: ["React / Vite", "Motion System", "Adaptive Contrast", "Portfolio as Interface"]
  },
  {
    eyebrow: "DESIGN METHOD",
    title: "工作方式",
    body:
      "我的项目通常从场景与人的行为关系出发，再把研究结论转译成可以运行、观看或体验的原型。这里的案例覆盖用户研究、概念设计、MR / AR 交互、视觉系统、服务触点和影像表达。",
    meta: ["Research", "Prototype", "Interaction", "Visual System"]
  }
];

const practiceHighlights = [
  {
    title: "AutoPIA 新感官体验",
    subtitle: "智能座舱年轻化体验设计工作坊 / 保密项目",
    body:
      "从年轻人注意力碎片化的痛点出发，构建“场景感知-感官重塑-交互响应”的三层设计方法，将座舱从通勤载体转化为可调节的体验场域。",
    tags: ["智能座舱", "新感官体验", "隐性交互"]
  },
  {
    title: "国美 x 港科大 x Rokid 沉浸创新课程",
    subtitle: "传统文化叙事的多感官原型",
    body:
      "独立完成文化叙事五感交互流程、Rokid + Unity 交互开发与嗅觉气味设备开发，交付视觉、听觉、嗅觉三通道联动的可运行体验原型。",
    tags: ["MR 开发", "五感设计", "MCP 工作流"]
  },
  {
    title: "浙大 x 强脑科技人工智能产品设计",
    subtitle: "智能地垫产品概念",
    body:
      "基于强脑科技企业命题设计并开发智能地垫产品，独立完成 App 界面与产品视频，将产品概念、交互界面和展示叙事串联成完整提案。",
    tags: ["产品设计", "交互界面", "产品视频"]
  }
];

const contactItems = [
  { label: "Email", value: "your-email@example.com" },
  { label: "WeChat", value: "your-wechat-id" },
  { label: "Portfolio", value: "YUKO / VIBE CODING PORTFOLIO" }
];

function App() {
  const [route, setRoute] = useState(() => getView(window.location.pathname));
  const [modal, setModal] = useState<ModalState | null>(null);
  const [loaderMounted, setLoaderMounted] = useState(true);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const routeKey = route.view === "project" && route.project ? `project-${route.project.slug}` : route.view;
  const previousRouteKey = useRef(routeKey);
  const [routeTransitioning, setRouteTransitioning] = useState(false);

  useEffect(() => {
    const applyRoute = () => setRoute(getView(window.location.pathname));
    window.addEventListener("popstate", applyRoute);
    return () => window.removeEventListener("popstate", applyRoute);
  }, []);

  useEffect(() => {
    const currentPath = normalizePath(stripBasePath(window.location.pathname));
    const canonical = routeAliases[currentPath];
    if (canonical && canonical !== currentPath) {
      window.history.replaceState(null, "", withBasePath(canonical));
      setRoute(getView(canonical));
    }
  }, []);

  useEffect(() => {
    document.title =
      route.view === "project" && route.project
        ? `${route.project.title} / YUKO Portfolio`
        : route.view === "full"
          ? "Full Portfolio / YUKO Portfolio"
          : "YUKO / PORTFOLIO";
  }, [route]);

  useEffect(() => {
    if (previousRouteKey.current === routeKey) return undefined;
    previousRouteKey.current = routeKey;
    setRouteTransitioning(true);
    const timer = window.setTimeout(() => setRouteTransitioning(false), 540);
    return () => window.clearTimeout(timer);
  }, [routeKey]);

  useEffect(() => {
    const start = performance.now();
    let removed = false;
    let fallback = 0;
    let unmountTimer = 0;

    const hideLoader = () => {
      if (removed) return;
      removed = true;
      const remaining = Math.max(0, 1650 - (performance.now() - start));
      window.setTimeout(() => {
        setLoaderHidden(true);
        unmountTimer = window.setTimeout(() => setLoaderMounted(false), 850);
      }, remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
      fallback = window.setTimeout(hideLoader, 2600);
    }

    return () => {
      removed = true;
      window.removeEventListener("load", hideLoader);
      window.clearTimeout(fallback);
      window.clearTimeout(unmountTimer);
    };
  }, []);

  useMagneticControls();
  useFloatingControlTone(route.view);
  useScrollReveal(routeKey);

  const handleAction = (action: Action) => {
    if (action.type === "detail") {
      navigateTo(action.url);
      return;
    }

    if (isEmbeddable(action)) {
      setModal({ action });
      return;
    }

    navigateTo(action.url);
  };

  return (
    <>
      {loaderMounted && <LoadingOverlay hidden={loaderHidden} />}
      <BackgroundField />
      <CursorLight />
      <CompositionGuides />
      {(route.view === "project" || route.view === "full") && <FloatingNav />}
      <div className="page-stage" key={routeKey}>
        {route.view === "home" && <HomePage />}
        {route.view === "project" && route.project && (
          <ProjectPage project={route.project} onAction={handleAction} />
        )}
        {route.view === "full" && <FullPortfolioPage onAction={handleAction} />}
        {route.view === "not-found" && <NotFoundPage />}
      </div>
      {route.view === "home" && <HomeFloatingPortfolioButton />}
      {(route.view === "project" || route.view === "full") && <BackToTop />}
      <div className={`route-veil ${routeTransitioning ? "active" : ""}`} aria-hidden="true" />
      <MediaModal modal={modal} onClose={() => setModal(null)} />
    </>
  );
}

function CompositionGuides() {
  return (
    <div className="composition-guides" aria-hidden="true">
      <span className="guide-line guide-line-left" />
      <span className="guide-line guide-line-center" />
      <span className="guide-line guide-line-right" />
      <span className="guide-node guide-node-top" />
      <span className="guide-node guide-node-bottom" />
    </div>
  );
}

const textVisualLength = (value: string) =>
  Array.from(value).reduce((total, char) => total + (char.charCodeAt(0) < 128 ? 0.58 : 1), 0);

const splitLongRevealPiece = (piece: string, maxLineLength: number) => {
  const lines: string[] = [];
  let current = "";

  Array.from(piece).forEach((char) => {
    const next = `${current}${char}`;
    if (current && textVisualLength(next) > maxLineLength) {
      lines.push(current);
      current = char;
      return;
    }
    current = next;
  });

  if (current) lines.push(current);
  return lines;
};

const splitRevealText = (text: string, maxLineLength = 36) => {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (!trimmed) return [];

  const pieces = trimmed
    .split(/(?<=[\u3002\uff01\uff1f\uff1b\uff0c\u3001.!?;,])\s*/)
    .map((piece) => piece.trim())
    .filter(Boolean);

  const lines: string[] = [];
  let current = "";

  pieces.forEach((piece) => {
    if (textVisualLength(piece) > maxLineLength * 1.42) {
      if (current) {
        lines.push(current);
        current = "";
      }
      lines.push(...splitLongRevealPiece(piece, maxLineLength));
      return;
    }

    const next = `${current}${piece}`;
    if (current && textVisualLength(next) > maxLineLength) {
      lines.push(current);
      current = piece;
      return;
    }
    current = next;
  });

  if (current) lines.push(current);
  return lines.length ? lines : [trimmed];
};

function LineRevealText({
  text,
  className = "",
  maxLineLength
}: {
  text: string;
  className?: string;
  maxLineLength?: number;
}) {
  const lines = useMemo(() => splitRevealText(text, maxLineLength), [maxLineLength, text]);

  return (
    <span className={`line-reveal ${className}`.trim()}>
      {lines.map((line, index) => (
        <span
          className="line-reveal-mask"
          key={`${line}-${index}`}
          style={{ "--line-index": index } as React.CSSProperties}
        >
          <span className="line-reveal-inner">{line}</span>
        </span>
      ))}
    </span>
  );
}

function useScrollReveal(revealKey: string) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!targets.length) return undefined;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const shouldReplay = target.classList.contains("replay-reveal");

          if (entry.isIntersecting) {
            target.classList.add("is-visible");
            if (!shouldReplay) observer.unobserve(target);
            return;
          }

          if (shouldReplay) {
            target.classList.remove("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.16 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [revealKey]);
}

function LoadingOverlay({ hidden }: { hidden: boolean }) {
  return (
    <div className={`loader-overlay ${hidden ? "hidden" : ""}`} aria-hidden={hidden}>
      <div className="hole" aria-label="Loading">
        {Array.from({ length: 10 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
    </div>
  );
}

function useMagneticControls() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    const controls = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".magnetic-control, .icon-glass, .back-to-top, .next-project button"
      )
    );

    const cleanup: Array<() => void> = [];

    controls.forEach((control) => {
      let raf = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let targetSpotX = 22;
      let targetSpotY = 18;
      let currentSpotX = 22;
      let currentSpotY = 18;
      let active = false;

      const setSpotFromEvent = (event: MouseEvent) => {
        const rect = control.getBoundingClientRect();
        targetSpotX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        targetSpotY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
      };

      const render = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        currentSpotX += (targetSpotX - currentSpotX) * 0.22;
        currentSpotY += (targetSpotY - currentSpotY) * 0.22;
        control.style.setProperty("--mag-x", `${currentX.toFixed(2)}px`);
        control.style.setProperty("--mag-y", `${currentY.toFixed(2)}px`);
        control.style.setProperty("--btn-spot-x", `${currentSpotX.toFixed(2)}%`);
        control.style.setProperty("--btn-spot-y", `${currentSpotY.toFixed(2)}%`);

        if (
          active ||
          Math.abs(currentX) > 0.08 ||
          Math.abs(currentY) > 0.08 ||
          Math.abs(currentSpotX - targetSpotX) > 0.08 ||
          Math.abs(currentSpotY - targetSpotY) > 0.08
        ) {
          raf = requestAnimationFrame(render);
        }
      };

      const onEnter = (event: MouseEvent) => {
        active = true;
        setSpotFromEvent(event);
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(render);
      };

      const onMove = (event: MouseEvent) => {
        const rect = control.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        const strength =
          control.classList.contains("icon-glass") || control.classList.contains("back-to-top") ? 0.1 : 0.12;
        targetX = Math.max(-10, Math.min(10, x * strength));
        targetY = Math.max(-8, Math.min(8, y * strength));
        setSpotFromEvent(event);
      };

      const onLeave = () => {
        active = false;
        targetX = 0;
        targetY = 0;
        targetSpotX = 22;
        targetSpotY = 18;
      };

      control.addEventListener("mouseenter", onEnter);
      control.addEventListener("mousemove", onMove);
      control.addEventListener("mouseleave", onLeave);

      cleanup.push(() => {
        cancelAnimationFrame(raf);
        control.removeEventListener("mouseenter", onEnter);
        control.removeEventListener("mousemove", onMove);
        control.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanup.forEach((run) => run());
  });
}

function useFloatingControlTone(view: View) {
  useEffect(() => {
    let raf = 0;
    const toneState = new WeakMap<HTMLElement, number>();
    const imageCache = new WeakMap<
      HTMLImageElement,
      { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D; width: number; height: number }
    >();
    const taintedImages = new WeakSet<HTMLImageElement>();
    const controls = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          ".icon-glass, .back-to-top, .glass-button, .next-project button, .marker-button"
        )
      );

    const colorToLumValue = (r: number, g: number, b: number) => r * 0.2126 + g * 0.7152 + b * 0.0722;

    const getImageSample = (img: HTMLImageElement) => {
      const cached = imageCache.get(img);
      if (cached) return cached;
      if (!img.complete || !img.naturalWidth || !img.naturalHeight) return null;

      const width = 180;
      const height = Math.max(1, Math.round(width * (img.naturalHeight / img.naturalWidth)));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) return null;

      try {
        context.drawImage(img, 0, 0, width, height);
      } catch {
        return null;
      }

      const sample = { canvas, context, width, height };
      imageCache.set(img, sample);
      return sample;
    };

    const imagePixelLumAtPoint = (img: HTMLImageElement, x: number, y: number) => {
      if (taintedImages.has(img)) return null;
      const rect = img.getBoundingClientRect();
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;

      const sample = getImageSample(img);
      if (!sample) return null;

      const px = Math.round(((x - rect.left) / rect.width) * (sample.width - 1));
      const py = Math.round(((y - rect.top) / rect.height) * (sample.height - 1));
      const radius = 10;
      const sx = Math.max(0, px - radius);
      const sy = Math.max(0, py - radius);
      const sw = Math.min(sample.width - sx, radius * 2 + 1);
      const sh = Math.min(sample.height - sy, radius * 2 + 1);

      try {
        const data = sample.context.getImageData(sx, sy, sw, sh).data;
        const values: number[] = [];
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 16) continue;
          values.push(colorToLumValue(data[i], data[i + 1], data[i + 2]));
        }
        if (!values.length) return null;
        values.sort((a, b) => a - b);
        const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
        const lowMid = values[Math.floor(values.length * 0.42)] ?? values[0];
        const median = values[Math.floor(values.length * 0.5)] ?? lowMid;
        const upperMid = values[Math.floor(values.length * 0.64)] ?? median;
        return lowMid * 0.34 + median * 0.42 + upperMid * 0.14 + mean * 0.1;
      } catch {
        taintedImages.add(img);
        return null;
      }
    };

    const imageLumAtPoint = (x: number, y: number, control: HTMLElement) => {
      const frames = Array.from(document.querySelectorAll<HTMLElement>(".image-frame"));
      for (const frame of frames) {
        const r = frame.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          const img = frame.querySelector<HTMLImageElement>("img");
          if (img) {
            const localLum = imagePixelLumAtPoint(img, x, y);
            if (localLum !== null) return localLum;
          }
          if (control.classList.contains("marker-button")) {
            return Number(frame.dataset.actionLuminance ?? frame.dataset.luminance ?? 32);
          }
          return Number(frame.dataset.luminance ?? 32);
        }
      }
      return null;
    };

    const colorToLum = (color: string) => {
      const match = color.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;
      const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
      if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;
      const alpha = parts.length >= 4 && !Number.isNaN(parts[3]) ? parts[3] : 1;
      if (alpha <= 0.05) return null;
      return colorToLumValue(parts[0], parts[1], parts[2]);
    };

    const elementLumAtPoint = (x: number, y: number, ignoredHost: HTMLElement) => {
      const stack = document.elementsFromPoint(x, y);
      for (const stackEl of stack) {
        if (
          stackEl instanceof Element &&
          (stackEl === ignoredHost ||
            ignoredHost.contains(stackEl) ||
            stackEl.closest(".magnetic-control, .icon-glass, .back-to-top, .marker-button"))
        ) {
          continue;
        }

        let el: Element | null = stackEl;
        while (el && el !== document.documentElement) {
          if (
            el === ignoredHost ||
            ignoredHost.contains(el) ||
            el.closest(".magnetic-control, .icon-glass, .back-to-top, .marker-button")
          ) {
            break;
          }
          const lum = colorToLum(getComputedStyle(el).backgroundColor);
          if (lum !== null) return lum;
          el = el.parentElement;
        }
      }
      return null;
    };

    const sampleLuminance = (control: HTMLElement) => {
      const rect = control.getBoundingClientRect();
      const isMarker = control.classList.contains("marker-button");
      const isCompactIcon =
        (control.classList.contains("icon-glass") || control.classList.contains("back-to-top")) && rect.width < 72;
      const xs = isCompactIcon ? [0.5] : isMarker ? [0.42, 0.52, 0.62, 0.74, 0.86] : [0.2, 0.34, 0.5, 0.66, 0.8];
      const ys = [0.48, 0.58, 0.68, 0.78, 0.88];
      const values = xs
        .flatMap((px) => ys.map((py) => [rect.left + rect.width * px, rect.top + rect.height * py] as const))
        .map(([x, y]) => imageLumAtPoint(x, y, control) ?? elementLumAtPoint(x, y, control))
        .filter((value): value is number => value !== null);

      if (!values.length) return 24;
      values.sort((a, b) => a - b);
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      const lowMid = values[Math.floor(values.length * 0.42)] ?? values[0];
      const median = values[Math.floor(values.length * 0.5)] ?? lowMid;
      const upperMid = values[Math.floor(values.length * 0.64)] ?? median;
      return lowMid * 0.34 + median * 0.42 + upperMid * 0.14 + mean * 0.1;
    };

    const toneFromLum = (lum: number, currentTone?: number) => {
      const switchToDarkSurface = currentTone !== undefined && currentTone >= 0.5 ? 72 : 96;
      return lum >= switchToDarkSurface ? 1 : 0;
    };

    const applyControlTone = (control: HTMLElement, tone: number) => {
      const darkSurface = tone >= 0.5;
      control.style.setProperty("--surface-tone", darkSurface ? "1" : "0");
      control.style.setProperty("--control-fg", darkSurface ? "rgba(255, 250, 240, 0.98)" : "rgba(8, 10, 12, 0.96)");
      control.style.setProperty("--control-bg", darkSurface ? "rgba(6, 7, 9, 0.74)" : "rgba(255, 255, 255, 0.52)");
      control.style.setProperty("--control-border", darkSurface ? "rgba(255, 255, 255, 0.24)" : "rgba(255, 255, 255, 0.46)");
      control.style.setProperty("--control-glint-top", darkSurface ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.48)");
      control.style.setProperty("--control-glint-mid", darkSurface ? "rgba(255, 255, 255, 0.075)" : "rgba(255, 255, 255, 0.2)");
      control.style.setProperty("--control-glint-low", darkSurface ? "rgba(255, 255, 255, 0.035)" : "rgba(255, 255, 255, 0.09)");
      control.style.setProperty("--control-shadow", darkSurface ? "rgba(0, 0, 0, 0.46)" : "rgba(0, 0, 0, 0.18)");
      control.style.setProperty(
        "--control-text-shadow",
        darkSurface ? "0 1px 2px rgba(0, 0, 0, 0.28)" : "0 1px 0 rgba(255, 255, 255, 0.38)"
      );

      if (control.classList.contains("marker-button")) {
        control.style.setProperty("--marker-fill-bg", darkSurface ? "rgba(255, 255, 255, 0.92)" : "rgba(40, 41, 54, 0.96)");
        control.style.setProperty("--marker-icon-fg", darkSurface ? "rgba(14, 15, 18, 0.96)" : "rgba(255, 255, 255, 0.98)");
        control.style.setProperty("--marker-label-hover", darkSurface ? "rgba(14, 15, 18, 0.96)" : "rgba(255, 255, 255, 0.98)");
        control.style.setProperty(
          "--marker-label-hover-shadow",
          darkSurface ? "0 1px 0 rgba(255, 255, 255, 0.32)" : "0 1px 2px rgba(0, 0, 0, 0.22)"
        );
        control.style.setProperty("--marker-glow-alpha", darkSurface ? "0.14" : "0.26");
        control.style.setProperty("--marker-glow-hover-alpha", darkSurface ? "0.22" : "0.34");
      }
    };

    const tick = () => {
      controls().forEach((control) => {
        const current = toneState.get(control);
        const target = toneFromLum(sampleLuminance(control), current);
        toneState.set(control, target);
        applyControlTone(control, target);
      });
      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, [view]);
}

function BackgroundField() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grid" />
      {Array.from({ length: 36 }, (_, index) => (
        <span
          className="particle"
          key={index}
          style={
            {
              "--x": `${(index * 37) % 100}%`,
              "--y": `${(index * 61) % 100}%`,
              "--delay": `${(index % 13) * -0.7}s`,
              "--scale": `${0.55 + (index % 5) * 0.18}`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function CursorLight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      ref.current?.style.setProperty("--mx", `${currentX.toFixed(2)}px`);
      ref.current?.style.setProperty("--my", `${currentY.toFixed(2)}px`);
      raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    raf = requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className="cursor-light" aria-hidden="true" />;
}

function HomeFloatingPortfolioButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const selected = document.getElementById("selected-works");
      const home = document.querySelector<HTMLElement>(".home-redesign");

      if (!selected || !home) {
        setVisible(false);
        return;
      }

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const selectedTop = scrollY + selected.getBoundingClientRect().top;
      const homeBottom = scrollY + home.getBoundingClientRect().bottom;
      const triggerLine = scrollY + viewportHeight * 0.68;

      setVisible(triggerLine >= selectedTop && triggerLine <= homeBottom);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <button
      className={`glass-button magnetic-control strong home-floating-portfolio ${visible ? "is-visible" : ""}`}
      type="button"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => navigateTo("/full/")}
    >
      {siteContent.home.fullPortfolioButton}
    </button>
  );
}

function HomePage() {
  const home = siteContent.home;
  const researchProject = projects.find((project) => project.slug === "china-auto-discourse");

  return (
    <main className="site-shell home home-redesign">
      <section className="hero-section hero-section-simple" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{home.heroEyebrow}</p>
          <h1 id="hero-title">
            <LineRevealText text={home.heroTitle} className="auto-line-reveal" maxLineLength={18} />
          </h1>
          <p className="hero-summary">
            <LineRevealText text={home.heroSummary} className="auto-line-reveal" />
          </p>
          <div className="hero-actions">
            <GlassButton label={home.directoryButton} onClick={() => scrollToId("selected-works")} />
          </div>
        </div>
      </section>

      {home.narratives.map((section) => (
        <HomeEditorialSection key={section.title} section={section} />
      ))}

      {researchProject && <ResearchFeature project={researchProject} />}

      <section
        className="selected-section text-reveal-block module-reveal replay-reveal scroll-reveal"
        id="selected-works"
        aria-labelledby="selected-title"
      >
        <div className="section-heading">
          <p className="eyebrow">{home.selectedEyebrow}</p>
          <h2 id="selected-title">
            <LineRevealText text={home.selectedTitle} maxLineLength={18} />
          </h2>
        </div>
        <WorkWall />
      </section>

      <PracticeSection />
      <ThanksSection />
    </main>
  );
}

function ResearchFeature({ project }: { project: Project }) {
  return (
    <section
      className="home-editorial-section research-feature text-reveal-block module-reveal replay-reveal scroll-reveal"
      aria-labelledby="research-feature-title"
    >
      <div className="section-heading">
        <p className="eyebrow">INDEPENDENT RESEARCH</p>
        <h2 id="research-feature-title">
          <LineRevealText text="研究项目" maxLineLength={18} />
        </h2>
      </div>
      <button
        className="research-card replay-reveal scroll-reveal"
        type="button"
        onClick={() => navigateTo(`/projects/${project.slug}/`)}
      >
        <span className="research-copy">
          <small>{project.category}</small>
          <strong>
            <LineRevealText text={project.title} maxLineLength={16} />
          </strong>
          <span>
            <LineRevealText text={project.summary} />
          </span>
        </span>
        <span className="research-cover" aria-hidden="true">
          <img src={project.coverColor} alt="" />
        </span>
        <span className="research-arrow">
          <ArrowRight size={18} />
        </span>
      </button>
    </section>
  );
}

function HomeEditorialSection({
  section
}: {
  section: { eyebrow: string; title: string; body: string; meta: string[] };
}) {
  return (
    <section className="home-editorial-section text-reveal-block module-reveal replay-reveal scroll-reveal">
      <div className="section-heading">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>
          <LineRevealText text={section.title} maxLineLength={18} />
        </h2>
      </div>
      <div className="editorial-body">
        <p>
          <LineRevealText text={section.body} />
        </p>
        <div className="editorial-tags" aria-label={`${section.title} keywords`}>
          {section.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticeSection() {
  const practice = siteContent.home.practice;

  return (
    <section
      className="home-editorial-section practice-section text-reveal-block module-reveal replay-reveal scroll-reveal"
      aria-labelledby="practice-title"
    >
      <div className="section-heading">
        <p className="eyebrow">{practice.eyebrow}</p>
        <h2 id="practice-title">
          <LineRevealText text={practice.title} maxLineLength={18} />
        </h2>
      </div>
      <div className="practice-list">
        {practice.items.map((item, index) => (
          <article className="practice-item text-reveal-block module-reveal replay-reveal scroll-reveal" key={item.title}>
            <span className="practice-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="practice-main">
              <p className="practice-kicker">{item.subtitle}</p>
              <h3>
                <LineRevealText text={item.title} maxLineLength={18} />
              </h3>
              <small>
                <LineRevealText text={item.body} maxLineLength={34} />
              </small>
            </div>
            <div className="practice-tags" aria-label={`${item.title} keywords`}>
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ThanksSection() {
  const thanks = siteContent.home.thanks;
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(thanks.wechatId);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  return (
    <section
      className="home-editorial-section thanks-section text-reveal-block module-reveal replay-reveal scroll-reveal"
      aria-labelledby="thanks-title"
    >
      <div className="section-heading">
        <p className="eyebrow">{thanks.eyebrow}</p>
        <h2 id="thanks-title">
          <LineRevealText text={thanks.title} maxLineLength={18} />
        </h2>
      </div>
      <div className="thanks-panel">
        <p>
          <LineRevealText text={thanks.body} />
        </p>
        <div className="contact-list">
          <p>
            <span>Email</span>
            <strong>{thanks.email}</strong>
          </p>
          <div className="wechat-contact">
            <p className="wechat-row">
              <span>WeChat</span>
              <button className="wechat-id" type="button" onClick={copyWechat} aria-label={thanks.copyLabel}>
                <strong>{thanks.wechatId}</strong>
              </button>
            </p>
            {copyState !== "idle" ? (
              <div className={`copy-toast ${copyState}`} role="status">
                {copyState === "copied" ? <Check size={15} /> : null}
                <span>{copyState === "copied" ? thanks.copiedLabel : thanks.copyFailedLabel}</span>
              </div>
            ) : null}
            {thanks.wechatQrSrc ? <img className="wechat-qr" src={thanks.wechatQrSrc} alt={thanks.qrAlt} /> : null}
          </div>
          <p>
            <span>Portfolio</span>
            <strong>{thanks.portfolioLabel}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkWall() {
  const updateCoverSpot = (event: React.PointerEvent<HTMLButtonElement>) => {
    const cover = event.currentTarget.querySelector<HTMLElement>(".cover-pair");
    if (!cover) return;

    const rect = cover.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    cover.style.setProperty("--spot-x", `${Math.max(0, Math.min(100, x)).toFixed(2)}%`);
    cover.style.setProperty("--spot-y", `${Math.max(0, Math.min(100, y)).toFixed(2)}%`);
  };

  return (
    <div className="work-wall">
      {projects.slice(0, 5).map((project) => (
        <button
          className="work-card replay-reveal scroll-reveal"
          key={project.id}
          type="button"
          onPointerEnter={updateCoverSpot}
          onPointerMove={updateCoverSpot}
          onClick={() => navigateTo(`/projects/${project.slug}/`)}
        >
          <span className="work-number">{project.id}</span>
          <span className="cover-pair">
            <img className="cover-bw" src={project.coverBw} alt="" aria-hidden="true" />
            <img className="cover-color" src={project.coverColor} alt="" aria-hidden="true" />
          </span>
          <span className="work-meta">
            <span>{project.title}</span>
            <small>{project.category}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

function ProjectPage({ project, onAction }: { project: Project; onAction: (action: Action) => void }) {
  return (
    <main className="site-shell project-shell">
      <ProjectHeader project={project} />
      <PortfolioFlow pages={project.pages} onAction={onAction} />
      <InlineProjectEmbed project={project} />
      <NextProject project={project} />
    </main>
  );
}

function FullPortfolioPage({ onAction }: { onAction: (action: Action) => void }) {
  return (
    <main className="site-shell full-shell">
      <header className="full-header full-index-header text-reveal-block scroll-reveal">
        <div className="full-index-title">
          <p className="eyebrow">{siteContent.fullPortfolio.eyebrow}</p>
          <h1>
            <LineRevealText text={siteContent.fullPortfolio.title} maxLineLength={18} />
          </h1>
        </div>
        <div className="full-index-copy">
          <p>
            <LineRevealText text={siteContent.fullPortfolio.summary} maxLineLength={34} />
          </p>
          <div className="full-index-meta" aria-label="portfolio index">
            <span>{String(fullPortfolioProjects.length).padStart(2, "0")} PROJECTS</span>
            <span>CONTINUOUS VIEW</span>
          </div>
        </div>
      </header>
      {fullPortfolioProjects.map((project) => (
        <section className="full-project" key={project.slug} id={project.slug}>
          <ProjectHeader project={project} compact />
          <PortfolioFlow pages={project.pages} onAction={onAction} />
          <InlineProjectEmbed project={project} compact />
        </section>
      ))}
    </main>
  );
}

function ProjectHeader({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <header className={compact ? "project-header compact text-reveal-block scroll-reveal" : "project-header text-reveal-block scroll-reveal"}>
      <p className="eyebrow">
        {project.id} / {project.category}
      </p>
      <h1>
        <LineRevealText text={project.title} maxLineLength={18} />
      </h1>
      <p>
        <LineRevealText text={project.summary} />
      </p>
    </header>
  );
}

function PortfolioFlow({
  pages,
  onAction
}: {
  pages: PageAsset[];
  onAction: (action: Action) => void;
}) {
  return (
    <div className="portfolio-flow">
      {pages.map((asset, index) => (
        <ImageFrame asset={asset} key={`${asset.src}-${index}`} onAction={onAction} />
      ))}
    </div>
  );
}

function InlineProjectEmbed({ project, compact = false }: { project: Project; compact?: boolean }) {
  const action = project.inlineEmbed;
  if (!action) return null;

  return (
    <section className={compact ? "inline-project-embed compact" : "inline-project-embed"}>
      <div className="inline-embed-heading">
        <p className="eyebrow">{project.title}</p>
        <h2>{action.label}</h2>
      </div>
      <div className="inline-embed-frame">
        {action.embedMode === "video" || action.type === "video" ? (
          <video src={action.url} controls />
        ) : (
          <iframe src={action.url} title={`${project.title} / ${action.label}`} allowFullScreen />
        )}
      </div>
    </section>
  );
}

function ImageFrame({
  asset,
  onAction
}: {
  asset: PageAsset;
  onAction: (action: Action) => void;
}) {
  const luminance = getImageLuminance(asset.src);
  const actionLuminance = getActionAreaLuminance(asset.src);
  const imageTone = Math.max(0, Math.min(1, (luminance - 72) / 120));

  return (
    <figure
      className="image-frame"
      data-luminance={luminance}
      data-action-luminance={asset.actions?.length ? actionLuminance : undefined}
      style={{ "--image-tone": imageTone.toFixed(4) } as React.CSSProperties}
    >
      <img src={asset.src} alt={asset.alt} loading="lazy" draggable={false} />
      {asset.actions?.length ? (
        <figcaption className="image-actions">
          {asset.actions.map((action) => (
            <MarkerButton key={`${action.label}-${action.url}`} action={action} onClick={() => onAction(action)} />
          ))}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MarkerButton({ action, onClick }: { action: Action; onClick: () => void }) {
  const Icon = action.type === "detail" ? ArrowRight : action.type === "external" ? ExternalLink : Play;

  return (
    <button className="marker-button magnetic-control" type="button" data-action-type={action.type} onClick={onClick}>
      <span className="marker-fill" aria-hidden="true" />
      <span className="marker-dot">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <span className="marker-label">{action.label}</span>
    </button>
  );
}

function GlassButton({
  label,
  onClick,
  variant = "default"
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "strong";
}) {
  return (
    <button className={`glass-button magnetic-control ${variant}`} type="button" onClick={onClick}>
      {label}
    </button>
  );
}

function FloatingNav() {
  return (
    <nav className="floating-nav" aria-label={siteContent.navigation.ariaLabel}>
      <button type="button" className="icon-glass" onClick={() => navigateTo("/")}>
        <Home size={19} />
        <span>{siteContent.navigation.home}</span>
      </button>
      <button type="button" className="icon-glass" onClick={() => window.history.back()}>
        <ArrowLeft size={19} />
        <span>{siteContent.navigation.back}</span>
      </button>
    </nav>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${visible ? "visible" : ""}`}
      type="button"
      aria-label={siteContent.navigation.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowRight size={18} />
      <span>{siteContent.navigation.backToTop}</span>
    </button>
  );
}

function NextProject({ project }: { project: Project }) {
  const next = useMemo(() => {
    const numberedProjects = projects.filter((item) => item.slug !== "china-auto-discourse");
    const currentIndex = numberedProjects.findIndex((item) => item.slug === project.slug);
    if (currentIndex < 0) return numberedProjects[0];
    return numberedProjects[(currentIndex + 1) % numberedProjects.length];
  }, [project.slug]);

  return (
    <section className="next-project">
      <p className="eyebrow">{siteContent.nextProject.eyebrow}</p>
      <button className="magnetic-control" type="button" onClick={() => navigateTo(`/projects/${next.slug}/`)}>
        <span>{next.title}</span>
        <ArrowRight size={18} />
      </button>
    </section>
  );
}

function MediaModal({ modal, onClose }: { modal: ModalState | null; onClose: () => void }) {
  useEffect(() => {
    if (!modal) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modal, onClose]);

  if (!modal) return null;

  const { action } = modal;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={action.label}>
      <button className="modal-scrim" type="button" aria-label={siteContent.modal.close} onClick={onClose} />
      <div className="media-panel">
        <div className="media-toolbar">
          <span>{action.label}</span>
          <div>
            <button
              type="button"
              onClick={() => window.open(getExternalFallbackUrl(action), "_blank", "noopener,noreferrer")}
            >
              <ExternalLink size={16} />
              {siteContent.modal.openNewTab}
            </button>
            <button type="button" aria-label={siteContent.modal.close} onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="media-body">
          {action.embedMode === "video" || action.type === "video" ? (
            <video src={action.url} controls autoPlay />
          ) : (
            <iframe src={action.url} title={action.label} allowFullScreen />
          )}
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <main className="site-shell not-found">
      <p className="eyebrow">{siteContent.notFound.eyebrow}</p>
      <h1>{siteContent.notFound.title}</h1>
      <GlassButton label={siteContent.notFound.backHome} variant="strong" onClick={() => navigateTo("/")} />
    </main>
  );
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
