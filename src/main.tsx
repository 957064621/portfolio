import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, ExternalLink, Home, Play, X } from "lucide-react";
import {
  Action,
  PageAsset,
  Project,
  allPortfolioProjects,
  fullPortfolioProjects,
  getImageLuminance,
  homeFeatureImages,
  homeHeroImages,
  projects,
  routeAliases,
  routeToProjectSlug
} from "./data/portfolio";
import "./styles.css";

type View = "home" | "project" | "full" | "not-found";

interface ModalState {
  action: Action;
}

const fullPortfolioAction: Action = {
  label: "查看完整作品集",
  type: "detail",
  url: "/full/"
};

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

function App() {
  const [route, setRoute] = useState(() => getView(window.location.pathname));
  const [modal, setModal] = useState<ModalState | null>(null);

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

  useMagneticControls();
  useFloatingControlTone(route.view);

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
      <BackgroundField />
      <CursorLight />
      {route.view === "home" && <HomePage onAction={handleAction} />}
      {route.view === "project" && route.project && (
        <ProjectPage project={route.project} onAction={handleAction} />
      )}
      {route.view === "full" && <FullPortfolioPage onAction={handleAction} />}
      {route.view === "not-found" && <NotFoundPage />}
      <MediaModal modal={modal} onClose={() => setModal(null)} />
    </>
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
      let active = false;

      const render = () => {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        control.style.setProperty("--mag-x", `${currentX.toFixed(2)}px`);
        control.style.setProperty("--mag-y", `${currentY.toFixed(2)}px`);

        if (active || Math.abs(currentX) > 0.08 || Math.abs(currentY) > 0.08) {
          raf = requestAnimationFrame(render);
        }
      };

      const onEnter = () => {
        active = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(render);
      };

      const onMove = (event: MouseEvent) => {
        const rect = control.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        const strength = control.classList.contains("marker-button") ? 0.08 : 0.15;
        targetX = Math.max(-12, Math.min(12, x * strength));
        targetY = Math.max(-8, Math.min(8, y * strength));
        control.style.setProperty("--btn-spot-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        control.style.setProperty("--btn-spot-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      };

      const onLeave = () => {
        active = false;
        targetX = 0;
        targetY = 0;
        control.style.setProperty("--btn-spot-x", "22%");
        control.style.setProperty("--btn-spot-y", "18%");
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
    const controls = () =>
      Array.from(document.querySelectorAll<HTMLElement>(".icon-glass, .back-to-top, .glass-button"));

    const sampleTone = (control: HTMLElement) => {
      const rect = control.getBoundingClientRect();
      const point = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.72
      };
      const frames = Array.from(document.querySelectorAll<HTMLElement>(".image-frame"));
      const frame = frames.find((item) => {
        const r = item.getBoundingClientRect();
        return point.x >= r.left && point.x <= r.right && point.y >= r.top && point.y <= r.bottom;
      });

      if (!frame) return 0;
      const luminance = Number(frame.dataset.luminance ?? 32);
      return Math.max(0, Math.min(1, (luminance - 72) / 120));
    };

    const tick = () => {
      controls().forEach((control) => {
        const current = Number(control.style.getPropertyValue("--surface-tone") || 0);
        const target = sampleTone(control);
        const next = current + (target - current) * 0.045;
        control.style.setProperty("--surface-tone", next.toFixed(4));
        const mix = (dark: number, light: number) => Math.round(light + (dark - light) * next);
        control.style.setProperty("--control-fg", `rgba(${mix(20, 255)}, ${mix(20, 250)}, ${mix(20, 240)}, 0.96)`);
        control.style.setProperty(
          "--control-bg",
          `rgba(${mix(8, 255)}, ${mix(8, 255)}, ${mix(8, 255)}, ${(0.1 + 0.42 * next).toFixed(3)})`
        );
        control.style.setProperty(
          "--control-border",
          `rgba(255, 255, 255, ${(0.24 + 0.2 * Math.abs(next - 0.5)).toFixed(3)})`
        );
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
    const onMove = (event: PointerEvent) => {
      ref.current?.style.setProperty("--mx", `${event.clientX}px`);
      ref.current?.style.setProperty("--my", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className="cursor-light" aria-hidden="true" />;
}

function HomePage({ onAction }: { onAction: (action: Action) => void }) {
  const introImages = homeHeroImages;
  const featureImages = [homeFeatureImages[1]];
  const endingImages = [
    withActions(homeFeatureImages[2], [fullPortfolioAction]),
    withActions(homeFeatureImages[3], [fullPortfolioAction])
  ];

  return (
    <main className="site-shell home">
      <section className="hero-section hero-section-simple" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">DIGITAL GALLERY / 2026</p>
          <h1 id="hero-title">YUKO / PORTFOLIO</h1>
          <p className="hero-summary">
            以黑白玻璃展厅为基调，让作品图像成为主角。这里收录了视觉系统、互动体验、
            动态影像与研究型项目，首页作为入口，完整作品集则像一本连续翻阅的画册。
          </p>
          <div className="hero-actions">
            <GlassButton label="精选目录" onClick={() => scrollToId("selected-works")} />
            <GlassButton label="完整作品集" variant="strong" onClick={() => navigateTo("/full/")} />
          </div>
        </div>
      </section>

      <section className="feature-scroll intro-scroll" aria-label="作品集介绍正文">
        {introImages.map((asset) => (
          <ImageFrame asset={asset} key={asset.src} onAction={onAction} />
        ))}
      </section>

      <section className="feature-scroll" aria-label="作品集入口长图">
        {featureImages.map((asset) => (
          <ImageFrame asset={asset} key={asset.src} onAction={onAction} />
        ))}
      </section>

      <section className="selected-section" id="selected-works" aria-labelledby="selected-title">
        <div className="section-heading">
          <p className="eyebrow">SELECTED WORKS</p>
          <h2 id="selected-title">目录展墙</h2>
        </div>
        <WorkWall />
      </section>

      <section className="feature-scroll final-home-pages" aria-label="打开完整作品集">
        {endingImages.map((asset) => (
          <ImageFrame asset={asset} key={asset.src} onAction={onAction} />
        ))}
      </section>
    </main>
  );
}

function WorkWall() {
  return (
    <div className="work-wall">
      {projects.slice(0, 5).map((project) => (
        <button
          className="work-card"
          key={project.id}
          type="button"
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
      <FloatingNav />
      <ProjectHeader project={project} />
      <PortfolioFlow pages={project.pages} onAction={onAction} />
      <NextProject project={project} />
      <BackToTop />
    </main>
  );
}

function FullPortfolioPage({ onAction }: { onAction: (action: Action) => void }) {
  return (
    <main className="site-shell full-shell">
      <FloatingNav />
      <header className="full-header">
        <p className="eyebrow">FULL PORTFOLIO</p>
        <h1>完整画册</h1>
        <p>所有项目按画册顺序连续展开，视频、详情、外链入口与单独项目页保持一致。</p>
      </header>
      {fullPortfolioProjects.map((project) => (
        <section className="full-project" key={project.slug} id={project.slug}>
          <ProjectHeader project={project} compact />
          <PortfolioFlow pages={project.pages} onAction={onAction} />
        </section>
      ))}
      <BackToTop />
    </main>
  );
}

function ProjectHeader({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <header className={compact ? "project-header compact" : "project-header"}>
      <p className="eyebrow">
        {project.id} / {project.category}
      </p>
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
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

function ImageFrame({
  asset,
  onAction
}: {
  asset: PageAsset;
  onAction: (action: Action) => void;
}) {
  const luminance = getImageLuminance(asset.src);
  const imageTone = Math.max(0, Math.min(1, (luminance - 72) / 120));

  return (
    <figure
      className="image-frame"
      data-luminance={luminance}
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
    <button className="marker-button magnetic-control" type="button" onClick={onClick}>
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
    <nav className="floating-nav" aria-label="作品集导航">
      <button type="button" className="icon-glass" onClick={() => navigateTo("/")}>
        <Home size={19} />
        <span>首页</span>
      </button>
      <button type="button" className="icon-glass" onClick={() => window.history.back()}>
        <ArrowLeft size={19} />
        <span>返回</span>
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
      aria-label="返回顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowRight size={18} />
      <span>返回顶部</span>
    </button>
  );
}

function NextProject({ project }: { project: Project }) {
  const next = useMemo(() => {
    const currentIndex = projects.findIndex((item) => item.slug === project.slug);
    if (currentIndex < 0) return projects[0];
    return projects[(currentIndex + 1) % projects.length];
  }, [project.slug]);

  return (
    <section className="next-project">
      <p className="eyebrow">NEXT</p>
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
      <button className="modal-scrim" type="button" aria-label="关闭" onClick={onClose} />
      <div className="media-panel">
        <div className="media-toolbar">
          <span>{action.label}</span>
          <div>
            <button
              type="button"
              onClick={() => window.open(getExternalFallbackUrl(action), "_blank", "noopener,noreferrer")}
            >
              <ExternalLink size={16} />
              新标签打开
            </button>
            <button type="button" aria-label="关闭" onClick={onClose}>
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
      <p className="eyebrow">404 / GALLERY CLOSED</p>
      <h1>这个展厅入口不存在</h1>
      <GlassButton label="返回首页" variant="strong" onClick={() => navigateTo("/")} />
    </main>
  );
}

function withActions(asset: PageAsset, actions: Action[]): PageAsset {
  return {
    ...asset,
    actions: [...(asset.actions ?? []), ...actions]
  };
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
