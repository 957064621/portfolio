import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const htmlInputs = {
  main: resolve(__dirname, "index.html"),
  notFound: resolve(__dirname, "404.html"),
  legacyOne: resolve(__dirname, "1.html"),
  legacyTwo: resolve(__dirname, "2.html"),
  legacyThree: resolve(__dirname, "3.html"),
  legacyFour: resolve(__dirname, "4.html"),
  legacyFive: resolve(__dirname, "5.html"),
  legacySix: resolve(__dirname, "6.html"),
  legacySeven: resolve(__dirname, "7.html"),
  legacyMychelle: resolve(__dirname, "mychelle.html"),
  full: resolve(__dirname, "full/index.html"),
  lowCarbon: resolve(__dirname, "projects/low-carbon/index.html"),
  qintong: resolve(__dirname, "projects/qintong/index.html"),
  mychelle: resolve(__dirname, "projects/mychelle/index.html"),
  mychelleDetail: resolve(__dirname, "projects/mychelle-detail/index.html"),
  suboVis: resolve(__dirname, "projects/subo-vis/index.html"),
  more: resolve(__dirname, "projects/more/index.html"),
  chinaAutoDiscourse: resolve(__dirname, "projects/china-auto-discourse/index.html"),
  rokidSensaverse: resolve(__dirname, "projects/rokid-sensaverse/index.html")
};

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    cssTarget: ["chrome111", "edge111", "firefox103", "safari15.4"],
    cssMinify: false,
    rollupOptions: {
      input: htmlInputs
    }
  }
});
