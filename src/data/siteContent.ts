/*
 * 快速修改入口：
 * - 首页文稿、导航、通用按钮、联系信息：改这个文件。
 * - 每个作品页标题、简介、作品按钮文字：改 src/data/projectContent.ts。
 * - 微信二维码：改下面 thanks.wechatQrSrc，可以填 OSS 图片链接或 public 里的本地图片路径。
 */

export const siteContent = {
  documentTitle: {
    home: "YUKO PORTFOLIO",
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
    heroTitle: "YUKO PORTFOLIO",
    heroSummary:
      "一份以用户研究为起点的体验作品集。从场景、行为和需求出发，通过研究提炼问题，再转译为服务系统、交互原型与多感官体验。页面以“光影档案”为视觉主题，让每个项目像被光照亮的研究记录一样逐步显影。",
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
          "我的项目通常从问题场景进入，通过访谈、问卷、画像、旅程图、服务系统图和原型测试梳理判断，再把结论做成可以运行、观看或体验的方案。案例覆盖策略研究、服务体验、智能产品与多感官原型。",
        meta: ["User Research", "Scenario", "Prototype", "Experience"]
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
            "保密工作坊项目。围绕智能座舱年轻化体验，梳理年轻用户的注意力状态与座舱场景关系，将研究判断转译为“场景感知-感官重塑-交互响应”的体验方向。",
          tags: ["智能座舱", "新感官体验", "隐性交互"],
          briefs: [
            {
              label: "BRIEF",
              body: "保密项目。聚焦年轻用户在座舱场景中的注意力与体验状态。"
            },
            {
              label: "METHOD",
              body: "以场景感知、感官体验和隐性交互为线索，整理体验判断。"
            },
            {
              label: "ACTION",
              body: "参与座舱体验方向梳理与概念转译，输出可沟通的体验方案。"
            },
            {
              label: "REFLECTION",
              body: "理解保密项目中研究表达的边界，也训练了企业命题协作节奏。"
            }
          ]
        },
        {
          title: "国美 x 港科大 x Rokid 沉浸创新课程",
          subtitle: "传统文化叙事的多感官原型",
          body:
            "传统文化叙事常停留在视觉展示，本项目尝试用 Rokid、Unity 与嗅觉气味设备，把视觉、听觉、嗅觉组织成可运行的 MR 体验原型。",
          tags: ["多感官 MR", "嗅觉交互", "体验创新"],
          briefs: [
            {
              label: "BRIEF",
              body: "传统文化叙事在数字媒介中容易停留于视觉展示。"
            },
            {
              label: "METHOD",
              body: "拆解文化叙事与感官线索，搭建视觉、听觉、嗅觉联动流程。"
            },
            {
              label: "ACTION",
              body: "完成 Rokid 交互流程、Unity 原型和嗅觉气味设备联动。"
            },
            {
              label: "REFLECTION",
              body: "多感官体验需要控制触发节奏，让创新感服务叙事理解。"
            }
          ],
          detailUrl: "/projects/rokid-sensaverse/",
          detailLabel: "查看项目"
        },
        {
          title: "浙大 x 强脑科技人工智能产品设计",
          subtitle: "智能地垫产品概念",
          body:
            "基于企业命题，将智能地垫的使用场景、App 流程和产品视频组织为快速概念验证，补充软硬件交互与产品叙事能力。",
          tags: ["软硬件交互", "快速原型", "产品叙事"],
          briefs: [
            {
              label: "BRIEF",
              body: "基于强脑科技命题的智能地垫概念，聚焦 AI 硬件使用场景。"
            },
            {
              label: "METHOD",
              body: "用 App 流程、产品概念和影像表达快速验证体验方向。"
            },
            {
              label: "ACTION",
              body: "完成 App 界面、产品概念和展示视频，形成完整提案。"
            },
            {
              label: "REFLECTION",
              body: "训练企业命题下的快速收敛，以及软硬件概念表达能力。"
            }
          ]
        }
      ]
    },
    thanks: {
      eyebrow: "CONTACT / THANK YOU",
      title: "感谢观看",
      body:
        "感谢观看。\n这个作品集将持续记录我把研究、交互、影像、原型和代码组织成一个可被体验的系统，也包括这个用 vibe coding 搭建的网页本身。",
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
      "这里保留作品集的连续阅读方式，并延续“光影档案”的视觉主题：先进入策略研究，再展开用户研究到服务/交互的案例，同时补充多感官 MR、软硬件原型与视觉系统等实践。你可以像翻阅一份展陈记录一样浏览图像，也可以通过按钮进入视频、原型和详情页。",
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
