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
}

const oss = "https://yuko-portfolio.oss-cn-hangzhou.aliyuncs.com";
const image = (path: string) => `${oss}/${path}`;

export const actions = {
  lowCarbonVideo: {
    label: "观看视频",
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1Ga411t7Gn&page=1&high_quality=1"
  },
  qintongVideo: {
    label: "观看视频",
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV19r421J7tV&page=1&high_quality=1"
  },
  mychelleVideo: {
    label: "观看视频",
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1o6421c7zK&page=1&high_quality=1"
  },
  mychelleDetail: {
    label: "查看详情",
    type: "detail",
    url: "/projects/mychelle-detail/"
  },
  suboPrototype: {
    label: "查看原型",
    type: "embed",
    embedMode: "iframe",
    url: "https://xd.adobe.com/embed/26a1951a-a89d-4bd3-abfe-3c8ebd34dcc5-73f2/?fullscreen&hints=off"
  },
  sansaverseVideo: {
    label: "观看视频",
    type: "video",
    embedMode: "video",
    url: image("5/sansaverse.mp4")
  },
  vinylSite: {
    label: "访问网站",
    type: "embed",
    embedMode: "iframe",
    url: "https://957064621.github.io/vinyl/"
  },
  moreVideoOne: {
    label: "观看视频",
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1Tu4m1u7Le&page=1&high_quality=1"
  },
  moreVideoTwo: {
    label: "观看视频",
    type: "embed",
    embedMode: "iframe",
    url: "https://player.bilibili.com/player.html?bvid=BV1ht421V7hZ&page=1&high_quality=1"
  },
  chinaAutoVideo: {
    label: "观看视频",
    type: "video",
    embedMode: "video",
    url: image("bps.mp4")
  },
  arPoster: {
    label: "AR 动态海报",
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
    title: "低碳宠行",
    category: "Service Design / Low Carbon",
    summary: "围绕宠物出行与城市低碳行为的视觉化服务系统。",
    coverBw: image("Cover/01.png"),
    coverColor: image("Cover/06.png"),
    pages: [
      { src: image("1/5.png"), alt: "低碳宠行项目首图", actions: [actions.lowCarbonVideo] },
      { src: image("1/6.png"), alt: "低碳宠行展示页 02" },
      { src: image("1/7.png"), alt: "低碳宠行展示页 03" },
      { src: image("1/8.png"), alt: "低碳宠行展示页 04" },
      { src: image("1/9.png"), alt: "低碳宠行展示页 05" },
      { src: image("1/10.png"), alt: "低碳宠行展示页 06" },
      { src: image("1/11.png"), alt: "低碳宠行展示页 07" },
      { src: image("1/12.png"), alt: "低碳宠行展示页 08" },
      { src: image("1/13.png"), alt: "低碳宠行视频展示", actions: [actions.lowCarbonVideo] }
    ],
    actions: [actions.lowCarbonVideo]
  },
  {
    id: "02",
    legacyPath: "/2.html",
    slug: "qintong",
    title: "溱潼会昼",
    category: "Branding / Cultural Event",
    summary: "地方文化活动的视觉叙事与传播系统。",
    coverBw: image("Cover/02.png"),
    coverColor: image("Cover/07.png"),
    pages: [
      { src: image("2/1.png"), alt: "溱潼会昼项目首图", actions: [actions.qintongVideo] },
      { src: image("2/2.png"), alt: "溱潼会昼展示页 02" },
      { src: image("2/3.png"), alt: "溱潼会昼展示页 03" },
      { src: image("2/4.png"), alt: "溱潼会昼展示页 04" },
      { src: image("2/5.png"), alt: "溱潼会昼展示页 05" },
      { src: image("2/6.png"), alt: "溱潼会昼展示页 06" },
      { src: image("2/7.png"), alt: "溱潼会昼展示页 07" },
      { src: image("2/8.png"), alt: "溱潼会昼展示页 08" },
      { src: image("2/9.png"), alt: "溱潼会昼展示页 09" },
      { src: image("2/10.png"), alt: "溱潼会昼展示页 10" }
    ],
    actions: [actions.qintongVideo]
  },
  {
    id: "03",
    legacyPath: "/3.html",
    slug: "mychelle",
    title: "My Chelle",
    category: "Interactive Poster / AR",
    summary: "面向移动端与 AR 场景的交互视觉项目。",
    coverBw: image("Cover/03.png"),
    coverColor: image("Cover/08.png"),
    pages: [
      { src: image("3/1.png"), alt: "My Chelle 项目首图", actions: [actions.mychelleVideo] },
      { src: image("3/2.png"), alt: "My Chelle 展示页 02" },
      { src: image("3/3.png"), alt: "My Chelle 展示页 03" },
      { src: image("3/4.png"), alt: "My Chelle 展示页 04" },
      { src: image("3/5.png"), alt: "My Chelle 详情入口", actions: [actions.mychelleDetail] }
    ],
    actions: [actions.mychelleVideo, actions.mychelleDetail]
  },
  {
    id: "04",
    legacyPath: "/4.html",
    slug: "subo-vis",
    title: "苏博 VIS 手册",
    category: "VIS / Museum Identity",
    summary: "博物馆视觉识别系统与交互原型展示。",
    coverBw: image("Cover/04.png"),
    coverColor: image("Cover/09.png"),
    pages: [
      { src: image("4/1.png"), alt: "苏博 VIS 手册展示页 01" },
      { src: image("4/2.png"), alt: "苏博 VIS 手册展示页 02" },
      { src: image("4/3.png"), alt: "苏博 VIS 手册展示页 03" },
      { src: image("4/4.png"), alt: "苏博 VIS 手册展示页 04" },
      { src: image("4/5.png"), alt: "苏博 VIS 手册展示页 05" },
      { src: image("4/6.png"), alt: "苏博 VIS 手册展示页 06" },
      { src: image("4/7.png"), alt: "苏博 VIS 手册展示页 07" },
      { src: image("4/8.png"), alt: "苏博 VIS 手册展示页 08", actions: [actions.suboPrototype] }
    ],
    actions: [actions.suboPrototype]
  },
  {
    id: "05",
    legacyPath: "/5.html",
    slug: "more",
    title: "More",
    category: "Digital Experiments / Motion",
    summary: "实验性网页、影像与数字体验合集。",
    coverBw: image("Cover/05.png"),
    coverColor: image("Cover/10.png"),
    pages: [
      { src: image("5/1.png"), alt: "More 项目集合首图" },
      { src: image("5/6.png"), alt: "Sansaverse 视频入口", actions: [actions.sansaverseVideo] },
      { src: image("5/7.png"), alt: "Vinyl 网站入口", actions: [actions.vinylSite] },
      { src: image("5/2.png"), alt: "More 视频展示 01", actions: [actions.moreVideoOne] },
      { src: image("5/3.png"), alt: "More 视频展示 02", actions: [actions.moreVideoTwo] },
      { src: image("5/4.png"), alt: "More 展示页 05" },
      { src: image("5/5.png"), alt: "More 展示页 06" }
    ],
    actions: [actions.sansaverseVideo, actions.vinylSite, actions.moreVideoOne, actions.moreVideoTwo]
  },
  {
    id: "06",
    legacyPath: "/7.html",
    slug: "china-auto-discourse",
    title: "全球视野下的中国汽车话语体系研究",
    category: "Research / Editorial System",
    summary: "面向全球语境的中国汽车话语体系研究与视觉表达。",
    coverBw: image("1/15.png"),
    coverColor: image("1/15.png"),
    pages: [
      { src: image("1/15.png"), alt: "中国汽车话语体系研究首图", actions: [actions.chinaAutoVideo] },
      { src: image("6/2.png"), alt: "中国汽车话语体系研究展示页 02" },
      { src: image("6/3.png"), alt: "中国汽车话语体系研究展示页 03" },
      { src: image("6/4.png"), alt: "中国汽车话语体系研究展示页 04" },
      { src: image("6/5.png"), alt: "中国汽车话语体系研究展示页 05" },
      { src: image("6/6.png"), alt: "中国汽车话语体系研究展示页 06" },
      { src: image("6/7.png"), alt: "中国汽车话语体系研究展示页 07" }
    ],
    actions: [actions.chinaAutoVideo]
  }
];

export const detailProjects: Project[] = [
  {
    id: "03-A",
    legacyPath: "/mychelle.html",
    slug: "mychelle-detail",
    title: "MY CHELLE Detail",
    category: "AR Detail / Mobile Poster",
    summary: "My Chelle 的移动端详情页与 AR 动态海报入口。",
    coverBw: image("3/5.png"),
    coverColor: image("3/5.png"),
    pages: [
      {
        src: image("iPhone%2014%20Pro%20Max%20-%205.png"),
        alt: "MY CHELLE 移动端详情长图",
        actions: [actions.mychelleVideo, actions.arPoster]
      }
    ],
    actions: [actions.mychelleVideo, actions.arPoster]
  }
];

export const allPortfolioProjects = [...projects, ...detailProjects];

const chinaAutoProject = projects.find((project) => project.slug === "china-auto-discourse");
export const fullPortfolioProjects = [
  ...(chinaAutoProject ? [chinaAutoProject] : []),
  ...projects.filter((project) => project.slug !== "china-auto-discourse")
];

export const homeHeroImages: PageAsset[] = [
  { src: image("1/1.png"), alt: "YUKO 作品集封面" },
  { src: image("1/2.png"), alt: "YUKO 简历页" },
  { src: image("1/3.png"), alt: "YUKO 获奖证书页" },
  { src: image("1/14.png"), alt: "YUKO 工作坊记录页" }
];

export const homeFeatureImages: PageAsset[] = [
  { src: image("1/14.png"), alt: "作品集研究专题入口" },
  {
    src: image("1/15.png"),
    alt: "中国汽车话语体系研究入口",
    actions: [{ label: "查看项目", type: "detail", url: "/projects/china-auto-discourse/" }]
  },
  { src: image("1/4.png"), alt: "精选作品目录引导页" },
  { src: image("5/8.png"), alt: "作品集结尾页" }
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
  "/projects/mychelle-detail/": "mychelle-detail"
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

export const getImageLuminance = (src: string) => {
  try {
    const pathname = decodeURIComponent(new URL(src).pathname.replace(/^\//, ""));
    return luminanceMap[pathname] ?? luminanceMap[pathname.split(" ").join("%20")] ?? 90;
  } catch {
    return 90;
  }
};
