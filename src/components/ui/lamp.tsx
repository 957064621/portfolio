"use client";

import * as React from "react";
import { motion } from "framer-motion";

type LampContainerProps = {
  children: React.ReactNode;
  className?: string;
  ready?: boolean;
};

export function LampContainer({ children, className, ready = true }: LampContainerProps) {
  return (
    <div className={`lamp-container ${className ?? ""}`.trim()}>
      <div className="lamp-stage" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0.45, width: "15rem" }}
          animate={ready ? { opacity: 1, width: "30rem" } : { opacity: 0.45, width: "15rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="lamp-beam lamp-beam-left"
        >
          <div className="lamp-cut lamp-cut-bottom" />
          <div className="lamp-cut lamp-cut-side" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.45, width: "15rem" }}
          animate={ready ? { opacity: 1, width: "30rem" } : { opacity: 0.45, width: "15rem" }}
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
          initial={{ width: "8rem" }}
          animate={ready ? { width: "16rem" } : { width: "8rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="lamp-core-soft"
        />

        <motion.div
          initial={{ width: "15rem" }}
          animate={ready ? { width: "30rem" } : { width: "15rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="lamp-strip"
        />

        <div className="lamp-mask" />
      </div>

      <div className="lamp-content">{children}</div>
    </div>
  );
}
