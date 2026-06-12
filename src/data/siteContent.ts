/*
 * 快速修改入口：
 * - 首页文稿、导航、通用按钮、联系信息：改这个文件。
 * - 每个作品页标题、简介、作品按钮文字：改 src/data/projectContent.ts。
 * - 微信二维码：改下面 thanks.wechatQrSrc，可以填 OSS 图片链接或 public 里的本地图片路径。
 */

export const siteContent = {
  documentTitle: {
    home: "YUKO / PORTFOLIO",
    full: "Full Portfolio / YUKO Portfolio",
    suffix: "YUKO Portfolio"
  },
  navigation: {
    ariaLabel: "作品集导航",
    home: "首页",
    back: "返回",
    backToTop: "返回顶部"
  },
  home: {
    heroEyebrow: "VIBE CODING PORTFOLIO / 2026",
    heroTitle: "YUKO / PORTFOLIO",
    heroSummary:
      "一份关于交互体验、服务系统、智能产品与数字媒介实验的作品集。这里的每个项目都从研究开始，最终落到可以被观看、操作或体验的原型。",
    directoryButton: "查看作品",
    fullPortfolioButton: "查看完整作品集",
    researchFeature: {
      eyebrow: "INDEPENDENT RESEARCH",
      title: "研究项目"
    },
    selectedEyebrow: "SELECTED WORKS",
    selectedTitle: "目录展墙",
    narratives: [
      {
        eyebrow: "DESIGN METHOD",
        title: "工作方式",
        body:
          "我的项目通常从场景与人的关系出发，通过全流程的用户研究，将结论转译成可以运行、观看或体验的原型。这里的案例覆盖用户研究、概念设计、MR / AR 交互、视觉系统、服务触点和影像表达。",
        meta: ["Research", "Prototype", "Interaction", "Visual System"]
      }
    ],
    practice: {
      eyebrow: "WORKSHOP / EXPERIENCE",
      title: "实践项目",
      items: [
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
          tags: ["MR 开发", "五感设计", "MCP 工作流"],
          detailUrl: "/projects/rokid-sensaverse/",
          detailLabel: "查看项目"
        },
        {
          title: "浙大 x 强脑科技人工智能产品设计",
          subtitle: "智能地垫产品概念",
          body:
            "基于强脑科技企业命题设计并开发智能地垫产品，独立完成 App 界面与产品视频，将产品概念、交互界面和展示叙事串联成完整提案。",
          tags: ["产品设计", "交互界面", "产品视频"]
        }
      ]
    },
    thanks: {
      eyebrow: "CONTACT / THANK YOU",
      title: "感谢观看",
      body:
        "感谢观看。这个作品集将持续记录我把研究、交互、影像、原型和代码组织成一个可被体验的系统——包括这个用 vibe coding 搭建的网页本身。",
      contactTitle: "联系方式",
      copyLabel: "复制微信号",
      copiedLabel: "已复制",
      copyFailedLabel: "复制失败，请手动复制",
      qrAlt: "微信二维码",
      contactLabels: {
        email: "Email",
        wechat: "WeChat",
        portfolio: "Portfolio"
      },
      email: "957064621@qq.com",
      wechatId: "Michael_Yuuu",
      wechatQrSrc: "https://yuko-portfolio.oss-cn-hangzhou.aliyuncs.com/1/wechat-qr.png",
      portfolioLabel: "YUKO / VIBE CODING PORTFOLIO"
    }
  },
  fullPortfolio: {
    eyebrow: "FULL PORTFOLIO",
    title: "完整作品集",
    summary:
      "这里保留作品集的连续阅读方式：先进入独立研究项目，再展开五个核心作品，最后延伸到一个沉浸式 MR 体验。你可以像翻阅画册一样浏览图像，也可以通过按钮进入视频、原型和详情页。",
    projectCountLabel: "PROJECTS",
    viewModeLabel: "CONTINUOUS VIEW"
  },
  modal: {
    close: "关闭",
    openNewTab: "新标签打开"
  },
  nextProject: {
    eyebrow: "NEXT"
  },
  notFound: {
    eyebrow: "404 / GALLERY CLOSED",
    title: "这个展厅入口不存在",
    backHome: "返回首页"
  }
};

export type SiteContent = typeof siteContent;
