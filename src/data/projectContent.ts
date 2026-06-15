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
        "从“认同低碳但缺少行动动力”的矛盾出发，完成 PEST、问卷、用户画像与旅程图，提炼 6 类机会点，并将虚拟宠物陪伴、积分激励与社交竞争转译为一套可体验的 MR 低碳出行方案。",
      briefs: [
        {
          label: "BRIEF",
          body: "基于 MR 的低碳出行陪伴方案。用虚拟宠物把绿色通勤变得可感知。"
        },
        {
          label: "METHOD",
          body: "从 PEST、问卷和用户画像切入。再把机会点转成具体的方案、路线、机制。"
        },
        {
          label: "ACTION",
          body: "完成低碳出行机制、MR 场景和分镜脚本。把虚拟宠物、积分和社交竞赛做成完整方案。"
        },
        {
          label: "REFLECTION",
          body: "把调研机会点转成体验机制。也理解了 MR 叙事和服务激励的关系。"
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
        "针对民俗文化在年轻群体中参与度低、数字触点零散的问题，通过问卷与访谈驱动设计，构建双轨服务系统与触点地图，让地方文化活动从一次性观看转向可参与、可传播的体验。",
      briefs: [
        {
          label: "BRIEF",
          body: "溱潼会船民俗的沉浸式服务系统。让地方文化从观看转向参与。"
        },
        {
          label: "METHOD",
          body: "通过问卷、访谈和角色画像提炼需求。再进行ip设计以及组织服务系统图与触点地图。"
        },
        {
          label: "ACTION",
          body: "梳理用户旅程、服务系统和关键触点。并将 VR、移动端和导览内容串成连续体验。"
        },
        {
          label: "REFLECTION",
          body: "理解文化内容如何落到服务触点。也练习了传统符号的系统化转译。"
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
        "本科毕设项目。针对智能包装停留于功能堆砌、缺少情感化体验的问题，主导贝壳仿生造型，完成 Arduino 编程与多传感器集成，交付四步护肤提醒与湿度预警的可运行原型。",
      briefs: [
        {
          label: "BRIEF",
          body: "软硬件联动的智能护肤盒原型。把包装变成护肤提醒和展示入口。"
        },
        {
          label: "METHOD",
          body: "完成贝壳造型、3D 打印和外观设计。用 Arduino 集成 RFID、湿度和灯光反馈。"
        },
        {
          label: "ACTION",
          body: "完成外观结构、硬件集成和交互流程。完成四步护肤提醒、湿度预警和灯光反馈原型。"
        },
        {
          label: "REFLECTION",
          body: "完成从结构到程序的原型闭环。更理解硬件限制、实际用户体验如何影响交互节奏。"
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
        "围绕博物馆视觉识别系统展开的手册与交互原型，将传统文化语汇、导览信息和数字触点组织成更具秩序感的品牌体验。",
      briefs: [
        {
          label: "BRIEF",
          body: "苏州博物馆视觉识别与导视系统。覆盖标志、IP、应用和空间信息。"
        },
        {
          label: "METHOD",
          body: "从建筑、吴文化和苏绣色彩提取视觉元素。再建立标志、字体和图标规范。"
        },
        {
          label: "ACTION",
          body: "建立标志、字体、图标和应用规范。并把导视信息与博物馆场景整理进 VIS 手册。"
        },
        {
          label: "REFLECTION",
          body: "训练文化符号到视觉规范的转译。也更理解 VIS 是完整秩序而不只是标志。"
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
        "收录实验性网页、动态影像、课程练习与奖项项目。它不是单一媒介分类，而是作品集的实验层：持续测试界面叙事、运动图像和可运行体验的边界。",
      briefs: [
        {
          label: "BRIEF",
          body: "网页、影像、VVVV 与信息可视化实验。记录不同媒介下的快速原型。"
        },
        {
          label: "METHOD",
          body: "用代码、视觉编程、NFC 和影像快速试错。重点测试平面、实体与网页的连接。"
        },
        {
          label: "ACTION",
          body: "我完成多个网页项目、影像和交互小实验。用代码、NFC 与视觉编程把想法快速做成可运行版本。"
        },
        {
          label: "REFLECTION",
          body: "建立低成本原型验证习惯。也积累了跨工具表达的手感。"
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
        "国美 x 港科大 x Rokid 沉浸创新课程项目。围绕视觉、听觉与嗅觉的多感官叙事，完成前期调研、产品架构、Rokid 眼镜交互流程与场景设计，将传统文化叙事转译为可运行的 MR 体验原型。",
      briefs: [
        {
          label: "BRIEF",
          body: "基于 Rokid 的多感官 MR 原型。用视觉、听觉和嗅觉重构文化叙事。"
        },
        {
          label: "METHOD",
          body: "通过前期的调研和学习，搭建五感交互流程。完成 Unity 开发与气味设备联动。"
        },
        {
          label: "ACTION",
          body: "完成五感流程构建，独立完成 Rokid 交互和 Unity 原型。并接入嗅觉设备，形成可演示的 MR 体验。"
        },
        {
          label: "REFLECTION",
          body: "沉淀 MR 原型与 MCP 工作流。也熟悉了多设备协同的节奏。"
        }
      ],
      pageAlts: ["SENSAVERSE 感官宇宙课程总览"]
    },
    chinaAutoDiscourse: {
      title: "全球视野下的中国汽车设计话语体系研究",
      category: "Strategic Research / Automotive Experience",
      summary:
        "中国汽车话语体系白皮书 2.0 项目。与吉利设计合作，负责场景体验研究，提炼汽车设计场景体验在不同时代边界跨越中的演变逻辑与人车关系，输出构建全新汽车使用场景和体验模式的行业白皮书。",
      briefs: [
        {
          label: "BRIEF",
          body: "与吉利设计合作的汽车话语白皮书研究。关注智能时代的人车关系与体验模式。"
        },
        {
          label: "METHOD",
          body: "负责场景体验研究与可视化图谱。梳理时代边界中的汽车设计演变。"
        },
        {
          label: "ACTION",
          body: "负责场景体验研究、资料梳理和图谱表达。并参与白皮书中体验模式部分的逻辑组织。"
        },
        {
          label: "REFLECTION",
          body: "强化战略研究与复杂信息表达。也理解白皮书需要兼顾判断、证据和叙事。"
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
          body: "My Chelle 的移动端与 AR 延展页。承接产品信息、场景和动态海报。"
        },
        {
          label: "METHOD",
          body: "用 NFC 串联实体包装、网页与 AR。让用户从盒盖自然进入移动端体验。"
        },
        {
          label: "ACTION",
          body: "搭建移动端详情页和 AR 动态海报入口。并用 NFC 把实体包装与网页体验连接起来。"
        },
        {
          label: "REFLECTION",
          body: "练习跨媒介触点的节奏控制。也更重视入口、层级和展示顺序。"
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
