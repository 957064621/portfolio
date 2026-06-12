/*
 * 这个文件负责作品图片、视频链接、路由和展示顺序。
 * 每个作品页的标题、简介、按钮文字请改 src/data/projectContent.ts。
 */

import { projectContent } from "./projectContent";

export type ActionType = "video" | "detail" | "external" | "embed";
export type EmbedMode = "video" | "iframe";

export interface Action {
  label: string;
  type: ActionType;
  url: string;
  embedMode?: EmbedMode;
}

export interface PageAsset {
  src: string;
  alt: string;
  actions?: Action[];
}

export interface Project {
  id: string;
  legacyPath: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  coverBw: string;
  coverColor: string;
  pages: PageAsset[];
  actions?: Action[];
  inlineEmbed?: Action;
}

const oss = "https://yuko-portfolio.oss-cn-hangzhou.aliyuncs.com";
const image = (path: string) => `${oss}/${path}`;
const actionText = projectContent.actionLabels;
const projectText = projectContent.projectPages;
const homeImageText = projectContent.homeImages;

export const actions = {
  lowCarbonVideo: {
    label: actionText.lowCarbonVideo,
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1Ga411t7Gn&page=1&high_quality=1"
  },
  qintongVideo: {
    label: actionText.qintongVideo,
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV19r421J7tV&page=1&high_quality=1"
  },
  mychelleVideo: {
    label: actionText.mychelleVideo,
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1o6421c7zK&page=1&high_quality=1"
  },
  mychelleDetail: {
    label: actionText.mychelleDetail,
    type: "detail",
    url: "/projects/mychelle-detail/"
  },
  suboPrototype: {
    label: actionText.suboPrototype,
    type: "embed",
    embedMode: "iframe",
    url: "https://xd.adobe.com/embed/26a1951a-a89d-4bd3-abfe-3c8ebd34dcc5-73f2/?fullscreen&hints=off"
  },
  sansaverseVideo: {
    label: actionText.sansaverseVideo,
    type: "video",
    embedMode: "video",
    url: image("5/sansaverse.mp4")
  },
  vinylSite: {
    label: actionText.vinylSite,
    type: "embed",
    embedMode: "iframe",
    url: "https://957064621.github.io/vinyl/"
  },
  moreVideoOne: {
    label: actionText.moreVideoOne,
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1Tu4m1u7Le&page=1&high_quality=1"
  },
  moreVideoTwo: {
    label: actionText.moreVideoTwo,
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1ht421V7hZ&page=1&high_quality=1"
  },
  chinaAutoVideo: {
    label: actionText.chinaAutoVideo,
    type: "video",
    embedMode: "video",
    url: image("bps.mp4")
  },
  arPoster: {
    label: actionText.arPoster,
    type: "embed",
    embedMode: "iframe",
    url: "https://www.kivicube.com/scenes/5mf16FbD8wDQtMjUeFlvFKSOEnXd1ie0"
  }
} satisfies Record<string, Action>;

export const projects: Project[] = [
  {
    id: "01",
    legacyPath: "/1.html",
    slug: "low-carbon",
    title: projectText.lowCarbon.title,
    category: projectText.lowCarbon.category,
    summary: projectText.lowCarbon.summary,
    coverBw: image("Cover/01.png"),
    coverColor: image("Cover/06.png"),
    pages: [
      { src: image("1/5.png"), alt: projectText.lowCarbon.pageAlts[0], actions: [actions.lowCarbonVideo] },
      { src: image("1/6.png"), alt: projectText.lowCarbon.pageAlts[1] },
      { src: image("1/7.png"), alt: projectText.lowCarbon.pageAlts[2] },
      { src: image("1/8.png"), alt: projectText.lowCarbon.pageAlts[3] },
      { src: image("1/9.png"), alt: projectText.lowCarbon.pageAlts[4] },
      { src: image("1/10.png"), alt: projectText.lowCarbon.pageAlts[5] },
      { src: image("1/11.png"), alt: projectText.lowCarbon.pageAlts[6] },
      { src: image("1/12.png"), alt: projectText.lowCarbon.pageAlts[7] },
      { src: image("1/13.png"), alt: projectText.lowCarbon.pageAlts[8], actions: [actions.lowCarbonVideo] }
    ],
    actions: [actions.lowCarbonVideo]
  },
  {
    id: "02",
    legacyPath: "/2.html",
    slug: "qintong",
    title: projectText.qintong.title,
    category: projectText.qintong.category,
    summary: projectText.qintong.summary,
    coverBw: image("Cover/02.png"),
    coverColor: image("Cover/07.png"),
    pages: [
      { src: image("2/1.png"), alt: projectText.qintong.pageAlts[0], actions: [actions.qintongVideo] },
      { src: image("2/2.png"), alt: projectText.qintong.pageAlts[1] },
      { src: image("2/3.png"), alt: projectText.qintong.pageAlts[2] },
      { src: image("2/4.png"), alt: projectText.qintong.pageAlts[3] },
      { src: image("2/5.png"), alt: projectText.qintong.pageAlts[4] },
      { src: image("2/6.png"), alt: projectText.qintong.pageAlts[5] },
      { src: image("2/7.png"), alt: projectText.qintong.pageAlts[6] },
      { src: image("2/8.png"), alt: projectText.qintong.pageAlts[7] },
      { src: image("2/9.png"), alt: projectText.qintong.pageAlts[8] },
      { src: image("2/10.png"), alt: projectText.qintong.pageAlts[9] }
    ],
    actions: [actions.qintongVideo]
  },
  {
    id: "03",
    legacyPath: "/3.html",
    slug: "mychelle",
    title: projectText.mychelle.title,
    category: projectText.mychelle.category,
    summary: projectText.mychelle.summary,
    coverBw: image("Cover/03.png"),
    coverColor: image("Cover/08.png"),
    pages: [
      { src: image("3/1.png"), alt: projectText.mychelle.pageAlts[0], actions: [actions.mychelleVideo] },
      { src: image("3/2.png"), alt: projectText.mychelle.pageAlts[1] },
      { src: image("3/3.png"), alt: projectText.mychelle.pageAlts[2] },
      { src: image("3/4.png"), alt: projectText.mychelle.pageAlts[3] },
      { src: image("3/5.png"), alt: projectText.mychelle.pageAlts[4], actions: [actions.mychelleDetail] }
    ],
    actions: [actions.mychelleVideo, actions.mychelleDetail]
  },
  {
    id: "04",
    legacyPath: "/4.html",
    slug: "subo-vis",
    title: projectText.suboVis.title,
    category: projectText.suboVis.category,
    summary: projectText.suboVis.summary,
    coverBw: image("Cover/04.png"),
    coverColor: image("Cover/09.png"),
    pages: [
      { src: image("4/1.png"), alt: projectText.suboVis.pageAlts[0] },
      { src: image("4/2.png"), alt: projectText.suboVis.pageAlts[1] },
      { src: image("4/3.png"), alt: projectText.suboVis.pageAlts[2] },
      { src: image("4/4.png"), alt: projectText.suboVis.pageAlts[3] },
      { src: image("4/5.png"), alt: projectText.suboVis.pageAlts[4] },
      { src: image("4/6.png"), alt: projectText.suboVis.pageAlts[5] },
      { src: image("4/7.png"), alt: projectText.suboVis.pageAlts[6] },
      { src: image("4/8.png"), alt: projectText.suboVis.pageAlts[7] }
    ],
    actions: [actions.suboPrototype],
    inlineEmbed: actions.suboPrototype
  },
  {
    id: "05",
    legacyPath: "/5.html",
    slug: "more",
    title: projectText.more.title,
    category: projectText.more.category,
    summary: projectText.more.summary,
    coverBw: image("Cover/05.png"),
    coverColor: image("Cover/10.png"),
    pages: [
      { src: image("5/1.png"), alt: projectText.more.pageAlts[0] },
      { src: image("5/7.png"), alt: projectText.more.pageAlts[1], actions: [actions.vinylSite] },
      { src: image("5/2.png"), alt: projectText.more.pageAlts[2], actions: [actions.moreVideoOne] },
      { src: image("5/3.png"), alt: projectText.more.pageAlts[3], actions: [actions.moreVideoTwo] },
      { src: image("5/4.png"), alt: projectText.more.pageAlts[4] },
      { src: image("5/5.png"), alt: projectText.more.pageAlts[5] }
    ],
    actions: [actions.vinylSite, actions.moreVideoOne, actions.moreVideoTwo]
  },
  {
    id: "0",
    legacyPath: "/7.html",
    slug: "china-auto-discourse",
    title: projectText.chinaAutoDiscourse.title,
    category: projectText.chinaAutoDiscourse.category,
    summary: projectText.chinaAutoDiscourse.summary,
    coverBw: image("1/15.png"),
    coverColor: image("1/15.png"),
    pages: [
      { src: image("1/15.png"), alt: projectText.chinaAutoDiscourse.pageAlts[0], actions: [actions.chinaAutoVideo] },
      { src: image("6/2.png"), alt: projectText.chinaAutoDiscourse.pageAlts[1] },
      { src: image("6/3.png"), alt: projectText.chinaAutoDiscourse.pageAlts[2] },
      { src: image("6/4.png"), alt: projectText.chinaAutoDiscourse.pageAlts[3] },
      { src: image("6/5.png"), alt: projectText.chinaAutoDiscourse.pageAlts[4] },
      { src: image("6/6.png"), alt: projectText.chinaAutoDiscourse.pageAlts[5] },
      { src: image("6/7.png"), alt: projectText.chinaAutoDiscourse.pageAlts[6] }
    ],
    actions: [actions.chinaAutoVideo]
  }
];

export const detailProjects: Project[] = [
  {
    id: "03-A",
    legacyPath: "/mychelle.html",
    slug: "mychelle-detail",
    title: projectText.mychelleDetail.title,
    category: projectText.mychelleDetail.category,
    summary: projectText.mychelleDetail.summary,
    coverBw: image("3/5.png"),
    coverColor: image("3/5.png"),
    pages: [
      {
        src: image("iPhone%2014%20Pro%20Max%20-%205.png"),
        alt: projectText.mychelleDetail.pageAlts[0],
        actions: [actions.mychelleVideo, actions.arPoster]
      }
    ],
    actions: [actions.mychelleVideo, actions.arPoster]
  },
  {
    id: "P-02",
    legacyPath: "/projects/rokid-sensaverse/",
    slug: "rokid-sensaverse",
    title: projectText.rokidSensaverse.title,
    category: projectText.rokidSensaverse.category,
    summary: projectText.rokidSensaverse.summary,
    coverBw: image("5/6.png"),
    coverColor: image("5/6.png"),
    pages: [
      {
        src: image("5/6.png"),
        alt: projectText.rokidSensaverse.pageAlts[0],
        actions: [actions.sansaverseVideo]
      }
    ],
    actions: [actions.sansaverseVideo]
  }
];

export const allPortfolioProjects = [...projects, ...detailProjects];

const chinaAutoProject = projects.find((project) => project.slug === "china-auto-discourse");
const rokidSensaverseProject = detailProjects.find((project) => project.slug === "rokid-sensaverse");
export const fullPortfolioProjects = [
  ...(chinaAutoProject ? [chinaAutoProject] : []),
  ...projects.filter((project) => project.slug !== "china-auto-discourse"),
  ...(rokidSensaverseProject ? [rokidSensaverseProject] : [])
];

export const homeHeroImages: PageAsset[] = [
  { src: image("1/1.png"), alt: homeImageText.heroAlts[0] },
  { src: image("1/2.png"), alt: homeImageText.heroAlts[1] },
  { src: image("1/3.png"), alt: homeImageText.heroAlts[2] },
  { src: image("1/14.png"), alt: homeImageText.heroAlts[3] }
];

export const homeFeatureImages: PageAsset[] = [
  { src: image("1/14.png"), alt: homeImageText.featureAlts[0] },
  {
    src: image("1/15.png"),
    alt: homeImageText.featureAlts[1],
    actions: [{ label: actionText.chinaAutoFeature, type: "detail", url: "/projects/china-auto-discourse/" }]
  },
  { src: image("1/4.png"), alt: homeImageText.featureAlts[2] },
  { src: image("5/8.png"), alt: homeImageText.featureAlts[3] }
];

export const routeToProjectSlug: Record<string, string> = {
  "/1.html": "low-carbon",
  "/2.html": "qintong",
  "/3.html": "mychelle",
  "/4.html": "subo-vis",
  "/5.html": "more",
  "/7.html": "china-auto-discourse",
  "/mychelle.html": "mychelle-detail",
  "/projects/low-carbon/": "low-carbon",
  "/projects/qintong/": "qintong",
  "/projects/mychelle/": "mychelle",
  "/projects/subo-vis/": "subo-vis",
  "/projects/more/": "more",
  "/projects/china-auto-discourse/": "china-auto-discourse",
  "/projects/mychelle-detail/": "mychelle-detail",
  "/projects/rokid-sensaverse/": "rokid-sensaverse"
};

export const routeAliases: Record<string, string> = {
  "/index.html": "/",
  "/1.html": "/projects/low-carbon/",
  "/2.html": "/projects/qintong/",
  "/3.html": "/projects/mychelle/",
  "/4.html": "/projects/subo-vis/",
  "/5.html": "/projects/more/",
  "/7.html": "/projects/china-auto-discourse/",
  "/mychelle.html": "/projects/mychelle-detail/",
  "/projects/low-carbon": "/projects/low-carbon/",
  "/projects/low-carbon/index.html": "/projects/low-carbon/",
  "/projects/qintong": "/projects/qintong/",
  "/projects/qintong/index.html": "/projects/qintong/",
  "/projects/mychelle": "/projects/mychelle/",
  "/projects/mychelle/index.html": "/projects/mychelle/",
  "/projects/subo-vis": "/projects/subo-vis/",
  "/projects/subo-vis/index.html": "/projects/subo-vis/",
  "/projects/more": "/projects/more/",
  "/projects/more/index.html": "/projects/more/",
  "/projects/china-auto-discourse": "/projects/china-auto-discourse/",
  "/projects/china-auto-discourse/index.html": "/projects/china-auto-discourse/",
  "/projects/mychelle-detail": "/projects/mychelle-detail/",
  "/projects/mychelle-detail/index.html": "/projects/mychelle-detail/",
  "/projects/rokid-sensaverse": "/projects/rokid-sensaverse/",
  "/projects/rokid-sensaverse/index.html": "/projects/rokid-sensaverse/",
  "/full": "/full/",
  "/full/index.html": "/full/",
  "/6.html": "/full/"
};

const luminanceMap: Record<string, number> = {
  "1/1.png": 211,
  "1/2.png": 182,
  "1/3.png": 224,
  "1/4.png": 250,
  "1/5.png": 142,
  "1/6.png": 246,
  "1/7.png": 248,
  "1/8.png": 244,
  "1/9.png": 242,
  "1/10.png": 214,
  "1/11.png": 219,
  "1/12.png": 249,
  "1/13.png": 19,
  "1/14.png": 248,
  "1/15.png": 107,
  "2/1.png": 174,
  "2/2.png": 249,
  "2/3.png": 244,
  "2/4.png": 240,
  "2/5.png": 243,
  "2/6.png": 244,
  "2/7.png": 246,
  "2/8.png": 180,
  "2/9.png": 239,
  "2/10.png": 243,
  "3/1.png": 218,
  "3/2.png": 234,
  "3/3.png": 232,
  "3/4.png": 225,
  "3/5.png": 225,
  "4/1.png": 149,
  "4/2.png": 237,
  "4/3.png": 240,
  "4/4.png": 226,
  "4/5.png": 244,
  "4/6.png": 241,
  "4/7.png": 200,
  "4/8.png": 252,
  "5/1.png": 143,
  "5/2.png": 32,
  "5/3.png": 111,
  "5/4.png": 235,
  "5/5.png": 166,
  "5/6.png": 63,
  "5/7.png": 21,
  "5/8.png": 250,
  "6/2.png": 76,
  "6/3.png": 23,
  "6/4.png": 35,
  "6/5.png": 25,
  "6/6.png": 27,
  "6/7.png": 31,
  "iPhone%2014%20Pro%20Max%20-%205.png": 219,
  "Cover/01.png": 18,
  "Cover/02.png": 107,
  "Cover/03.png": 88,
  "Cover/04.png": 37,
  "Cover/05.png": 38,
  "Cover/06.png": 18,
  "Cover/07.png": 107,
  "Cover/08.png": 189,
  "Cover/09.png": 38,
  "Cover/10.png": 28
};

const actionAreaLuminanceMap: Record<string, number> = {
  "1/5.png": 151,
  "1/13.png": 10,
  "2/1.png": 159,
  "3/1.png": 227,
  "3/5.png": 250,
  "4/8.png": 255,
  "5/2.png": 5,
  "5/3.png": 133,
  "5/6.png": 137,
  "5/7.png": 10,
  "1/15.png": 102,
  "iPhone%2014%20Pro%20Max%20-%205.png": 192
};

const getImagePathKey = (src: string) => {
  try {
    return decodeURIComponent(new URL(src).pathname.replace(/^\//, ""));
  } catch {
    return "";
  }
};

export const getImageLuminance = (src: string) => {
  const pathname = getImagePathKey(src);
  return luminanceMap[pathname] ?? luminanceMap[pathname.split(" ").join("%20")] ?? 90;
};

export const getActionAreaLuminance = (src: string) => {
  const pathname = getImagePathKey(src);
  return actionAreaLuminanceMap[pathname] ?? actionAreaLuminanceMap[pathname.split(" ").join("%20")] ?? getImageLuminance(src);
};
