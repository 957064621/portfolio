"use client";

import * as React from "react";
import { motion } from "framer-motion";

type LampContainerProps = {
  children: React.ReactNode;
  className?: string;
  ready?: boolean;
};

type LampSizes = {
  beamInitial: number;
  beamTarget: number;
  coreWidth: number;
  softInitial: number;
  softTarget: number;
};

const getLampSizes = (): LampSizes => {
  const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
  const beamTarget =
    viewportWidth <= 460
      ? Math.min(288, Math.max(236, viewportWidth * 0.74))
      : viewportWidth <= 720
        ? Math.min(384, Math.max(288, viewportWidth * 0.64))
        : 480;

  return {
    beamInitial: beamTarget / 2,
    beamTarget,
    coreWidth: beamTarget * (28 / 30),
    softInitial: beamTarget * (8 / 30),
    softTarget: beamTarget * (16 / 30)
  };
};

const useLampSizes = () => {
  const [sizes, setSizes] = React.useState<LampSizes>(getLampSizes);

  React.useEffect(() => {
    let frame = 0;

    const updateSizes = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setSizes(getLampSizes());
      });
    };

    window.addEventListener("resize", updateSizes, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  return sizes;
};

export function LampContainer({ children, className, ready = true }: LampContainerProps) {
  const sizes = useLampSizes();
  const stageStyle = { "--lamp-core-width": `${sizes.coreWidth}px` } as React.CSSProperties;

  return (
    <div className={`lamp-container ${className ?? ""}`.trim()}>
      <div className="lamp-stage" aria-hidden="true" style={stageStyle}>
        <motion.div
          initial={{ opacity: 0.45, width: sizes.beamInitial }}
          animate={ready ? { opacity: 1, width: sizes.beamTarget } : { opacity: 0.45, width: sizes.beamInitial }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="lamp-beam lamp-beam-left"
        >
          <div className="lamp-cut lamp-cut-bottom" />
          <div className="lamp-cut lamp-cut-side" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.45, width: sizes.beamInitial }}
          animate={ready ? { opacity: 1, width: sizes.beamTarget } : { opacity: 0.45, width: sizes.beamInitial }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="lamp-beam lamp-beam-right"
        >
          <div className="lamp-cut lamp-cut-side" />
          <div className="lamp-cut lamp-cut-bottom" />
        </motion.div>

        <div className="lamp-ground" />
        <div className="lamp-haze" />
        <div className="lamp-core" />

        <motion.div
          initial={{ width: sizes.softInitial }}
          animate={ready ? { width: sizes.softTarget } : { width: sizes.softInitial }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="lamp-core-soft"
        />

        <motion.div
          initial={{ width: sizes.beamInitial }}
          animate={ready ? { width: sizes.beamTarget } : { width: sizes.beamInitial }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="lamp-strip"
        />

        <div className="lamp-mask" />
      </div>

      <div className="lamp-content">{children}</div>
    </div>
  );
}
