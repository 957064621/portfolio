/*
 * 每个作品页的文稿修改入口：
 * - projectPages：作品页顶部标题、分类、简介，以及每张图的替代文字。
 * - actionLabels：作品图片上的浮动按钮文字，也会作为弹窗标题使用。
 *
 * 只改引号里的文字；不要改对象 key，例如 lowCarbon、qintong。
 * 图片地址、视频链接、页面顺序仍在 src/data/portfolio.ts。
 */

export const projectContent = {
  actionLabels: {
    lowCarbonVideo: "观看视频",
    qintongVideo: "观看视频",
    mychelleVideo: "观看视频",
    mychelleDetail: "查看详情",
    suboPrototype: "查看原型",
    sansaverseVideo: "观看视频",
    vinylSite: "访问网站",
    moreVideoOne: "观看视频",
    moreVideoTwo: "观看视频",
    chinaAutoVideo: "观看视频",
    arPoster: "AR 动态海报",
    chinaAutoFeature: "查看项目"
  },
  projectPages: {
    lowCarbon: {
      title: "低碳宠行",
      category: "MR Interaction / Service Design",
      summary:
        "用户认同低碳但缺行动反馈。用 PEST、问卷、画像和旅程图分析断点，把虚拟宠物、积分和社交竞赛转成 MR 方案，让行为可感知、有反馈。",
      briefs: [
        {
          label: "BRIEF",
          body: "低碳出行的行动动力问题。让行为变得可感知有反馈。"
        },
        {
          label: "METHOD",
          body: "PEST、问卷、画像和旅程图分析断点。"
        },
        {
          label: "ACTION",
          body: "虚拟宠物、积分机制和社交竞赛。MR 场景和分镜脚本。"
        },
        {
          label: "REFLECTION",
          body: "研究到体验机制的完整转译。行为改变需要可感知反馈。"
        }
      ],
      pageAlts: [
        "低碳宠行项目首图",
        "低碳宠行展示页 02",
        "低碳宠行展示页 03",
        "低碳宠行展示页 04",
        "低碳宠行展示页 05",
        "低碳宠行展示页 06",
        "低碳宠行展示页 07",
        "低碳宠行展示页 08",
        "低碳宠行视频展示"
      ]
    },
    qintong: {
      title: "溱潼会昼",
      category: "Folk Culture / Service System",
      summary:
        "地方民俗如何被年轻人参与。通过问卷、访谈和角色画像理解参与障碍，用服务系统图和触点地图组织链路。让文化活动从看到、参与到分享，每步有触点支撑。",
      briefs: [
        {
          label: "BRIEF",
          body: "年轻人参与地方民俗的障碍。设计从观看到传播的完整链路。"
        },
        {
          label: "METHOD",
          body: "问卷、访谈和角色画像理解障碍。"
        },
        {
          label: "ACTION",
          body: "服务系统图和触点地图。VR、移动端和导览串联。"
        },
        {
          label: "REFLECTION",
          body: "熟悉服务系统的端到端设计。每步体验都需要触点支撑。"
        }
      ],
      pageAlts: [
        "溱潼会昼项目首图",
        "溱潼会昼展示页 02",
        "溱潼会昼展示页 03",
        "溱潼会昼展示页 04",
        "溱潼会昼展示页 05",
        "溱潼会昼展示页 06",
        "溱潼会昼展示页 07",
        "溱潼会昼展示页 08",
        "溱潼会昼展示页 09",
        "溱潼会昼展示页 10"
      ]
    },
    mychelle: {
      title: "My Chelle",
      category: "Smart Packaging / Soft-Hardware Interaction",
      summary:
        "本科毕设。软硬件联动的智能护肤盒，完成贝壳外观、Arduino 编程和多传感器集成（RFID、湿度检测、灯光反馈）。关注真实产品中提示清晰度、反馈及时性和硬件对节奏的影响。",
      briefs: [
        {
          label: "BRIEF",
          body: "智能护肤盒。包装变成提醒和状态入口。"
        },
        {
          label: "METHOD",
          body: "贝壳仿生造型。Arduino 多传感器集成。"
        },
        {
          label: "ACTION",
          body: "完成可运行原型。四步提醒、湿度预警和灯光反馈。"
        },
        {
          label: "REFLECTION",
          body: "体验细节：提示清晰度、反馈及时性、硬件对节奏的影响。"
        }
      ],
      pageAlts: [
        "My Chelle 项目首图",
        "My Chelle 展示页 02",
        "My Chelle 展示页 03",
        "My Chelle 展示页 04",
        "My Chelle 详情入口"
      ]
    },
    suboVis: {
      title: "苏博 VIS 手册",
      category: "VIS / Museum Identity",
      summary:
        "围绕博物馆视觉识别系统展开的手册与交互原型，将传统文化语汇、导览信息和数字触点组织成具有秩序感的品牌体验。",
      briefs: [
        {
          label: "BRIEF",
          body: "苏州博物馆视觉识别与导视系统。覆盖标志、IP、应用和空间。"
        },
        {
          label: "METHOD",
          body: "从建筑、吴文化和苏绣色彩提取元素。建立标志、字体和图标规范。"
        },
        {
          label: "ACTION",
          body: "建立标志、字体、图标和应用规范。把导视信息与博物馆场景整理进手册。"
        },
        {
          label: "REFLECTION",
          body: "文化符号到视觉规范的转译。VIS 是完整秩序而非单一标志。"
        }
      ],
      pageAlts: [
        "苏博 VIS 手册展示页 01",
        "苏博 VIS 手册展示页 02",
        "苏博 VIS 手册展示页 03",
        "苏博 VIS 手册展示页 04",
        "苏博 VIS 手册展示页 05",
        "苏博 VIS 手册展示页 06",
        "苏博 VIS 手册展示页 07",
        "苏博 VIS 手册展示页 08"
      ]
    },
    more: {
      title: "More",
      category: "Digital Experiments / Awards",
      summary:
        "收录实验性网页、动态影像、课程练习与奖项项目。它不是单一媒介分类，而是作品集的实验层，持续测试界面叙事、运动图像和可运行体验的边界。",
      briefs: [
        {
          label: "BRIEF",
          body: "网页、影像、VVVV 和可视化实验。记录不同媒介的快速原型。"
        },
        {
          label: "METHOD",
          body: "用代码、视觉编程、NFC 和影像快速试错。测试平面、实体与网页的连接。"
        },
        {
          label: "ACTION",
          body: "网页、影像和交互实验。代码、NFC 和视觉编程快速原型。"
        },
        {
          label: "REFLECTION",
          body: "低成本原型验证习惯。跨工具表达的手感。"
        }
      ],
      pageAlts: [
        "More 项目集合首图",
        "Vinyl 网站入口",
        "More 视频展示 01",
        "More 视频展示 02",
        "More 展示页 05",
        "More 展示页 06"
      ]
    },
    rokidSensaverse: {
      title: "SENSAVERSE 感官宇宙",
      category: "MR / Multisensory Prototype",
      summary:
        "国美 x 港科大 x Rokid 沉浸创新课程项目。围绕视觉、听觉和嗅觉的多感官叙事，完成前期调研、产品架构、Rokid 眼镜交互流程与场景设计，将传统文化叙事转译为可运行的 MR 原型。",
      briefs: [
        {
          label: "BRIEF",
          body: "基于 Rokid 的多感官 MR 原型。用视觉、听觉和嗅觉重构叙事。"
        },
        {
          label: "METHOD",
          body: "通过前期的调研和学习，搭建五感交互流程。完成 Unity 开发与气味设备联动。"
        },
        {
          label: "ACTION",
          body: "Rokid 交互开发、Unity 原型和嗅觉设备联动。"
        },
        {
          label: "REFLECTION",
          body: "MR 原型与 MCP 工作流。多设备协同节奏。"
        }
      ],
      pageAlts: ["SENSAVERSE 感官宇宙课程总览"]
    },
    chinaAutoDiscourse: {
      title: "全球视野下的中国汽车设计话语体系研究",
      category: "Strategic Research / Automotive Experience",
      summary:
        "与吉利设计合作的白皮书项目，偏战略和趋势研究。负责场景篇的体验研究和图谱表达。探索汽车设计穿越三重边界（速度结构·硬件软件·空间情境），以人的感知为核心，梳理从交通工具到智能空间的演变。",
      briefs: [
        {
          label: "BRIEF",
          body: "吉利设计合作。汽车从交通工具到智能空间的体验演变。"
        },
        {
          label: "METHOD",
          body: "场景体验研究方法。图谱可视化表达。"
        },
        {
          label: "ACTION",
          body: "从感知等多维度梳理人车关系演变。完成场景章节。"
        },
        {
          label: "REFLECTION",
          body: "研究服务前置判断。辅助团队讨论未来方向。"
        }
      ],
      pageAlts: [
        "中国汽车话语体系研究首图",
        "中国汽车话语体系研究展示页 02",
        "中国汽车话语体系研究展示页 03",
        "中国汽车话语体系研究展示页 04",
        "中国汽车话语体系研究展示页 05",
        "中国汽车话语体系研究展示页 06",
        "中国汽车话语体系研究展示页 07"
      ]
    },
    mychelleDetail: {
      title: "MY CHELLE Detail",
      category: "AR Detail / Mobile Poster",
      summary:
        "My Chelle 的移动端详情页与 AR 动态海报入口，用于补充智能护肤盒项目中的互动叙事与移动端体验。",
      briefs: [
        {
          label: "BRIEF",
          body: "My Chelle 的移动端与 AR 延展页。承接产品信息、场景和海报。"
        },
        {
          label: "METHOD",
          body: "用 NFC 串联实体包装、网页与 AR。从盒盖进入移动端体验。"
        },
        {
          label: "ACTION",
          body: "移动端详情页和 AR 海报。NFC 连接实体与网页。"
        },
        {
          label: "REFLECTION",
          body: "跨媒介触点的节奏控制。重视入口、层级和展示顺序。"
        }
      ],
      pageAlts: ["MY CHELLE 移动端详情长图"]
    }
  },
  homeImages: {
    heroAlts: ["YUKO 作品集封面", "YUKO 简历页", "YUKO 获奖证书页", "YUKO 工作坊记录页"],
    featureAlts: ["作品集研究专题入口", "中国汽车话语体系研究入口", "精选作品目录引导页", "作品集结尾页"]
  }
} as const;
