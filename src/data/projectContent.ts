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
        "年轻用户认同低碳理念，但行动中缺少即时反馈和持续动力。通过 PEST、问卷、画像和旅程图定位断点，将虚拟宠物、积分和社交竞赛转译为 MR 出行体验。",
      briefs: [
        {
          label: "BRIEF",
          body: "低碳出行缺少可感知反馈，用户难以形成持续行动动力。"
        },
        {
          label: "METHOD",
          body: "用 PEST、问卷、用户画像和旅程图分析出行前后的体验断点。"
        },
        {
          label: "ACTION",
          body: "主导机会点提炼，设计虚拟宠物、积分机制、社交竞赛和 MR 分镜。"
        },
        {
          label: "REFLECTION",
          body: "行为改变需要被看见、被反馈，也需要可持续的情绪激励。"
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
        "关注地方民俗如何被年轻人理解和参与。通过问卷、访谈和角色画像识别参与障碍，用服务系统图和触点地图组织从观看、参与到分享的完整体验链路。",
      briefs: [
        {
          label: "BRIEF",
          body: "地方民俗面临年轻群体参与度低、数字触点零散的问题。"
        },
        {
          label: "METHOD",
          body: "通过问卷、访谈和角色画像理解不同人群的参与动机与障碍。"
        },
        {
          label: "ACTION",
          body: "构建服务系统图和触点地图，串联 VR、移动端、导览与现场体验。"
        },
        {
          label: "REFLECTION",
          body: "服务体验需要端到端组织，每个触点都要回应真实参与情境。"
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
        "本科毕设。围绕智能包装的情感化与提醒体验，完成贝壳外观、Arduino 编程和多传感器集成（RFID、湿度检测、灯光反馈），验证提示清晰度、反馈及时性和硬件节奏。",
      briefs: [
        {
          label: "BRIEF",
          body: "智能包装容易停留在功能堆砌，缺少日常使用中的情感反馈。"
        },
        {
          label: "METHOD",
          body: "结合贝壳仿生造型、NFC 入口和 Arduino 多传感器原型验证。"
        },
        {
          label: "ACTION",
          body: "完成可运行原型，实现四步护肤提醒、湿度预警和灯光反馈。"
        },
        {
          label: "REFLECTION",
          body: "软硬件体验的关键在反馈时机、提示清晰度和真实使用节奏。"
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
        "围绕博物馆视觉识别和导视信息展开，将文化语汇、空间导览和数字触点整理为更清晰的视觉秩序，作为空间信息体验的补充案例。",
      briefs: [
        {
          label: "BRIEF",
          body: "苏州博物馆视觉识别与导视系统，需要兼顾文化表达和空间识别。"
        },
        {
          label: "METHOD",
          body: "从建筑、吴文化和苏绣色彩提取元素，整理字体、图标和导视层级。"
        },
        {
          label: "ACTION",
          body: "建立标志、字体、图标、应用和导视规范，补充大屏导览原型。"
        },
        {
          label: "REFLECTION",
          body: "VIS 不只是标志设计，也是在空间中建立可识别的信息秩序。"
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
        "收录实验性网页、动态影像、视觉编程与信息可视化装置。作为作品集的实验层，展示低成本原型、跨媒介触点和代码化表达能力。",
      briefs: [
        {
          label: "BRIEF",
          body: "不同媒介中的交互想法，需要被快速做成可观看或可运行的原型。"
        },
        {
          label: "METHOD",
          body: "用代码、视觉编程、NFC 和影像快速试错，连接平面、实体与网页。"
        },
        {
          label: "ACTION",
          body: "完成网页、影像、纸面触控和信息可视化装置等实验。"
        },
        {
          label: "REFLECTION",
          body: "形成低成本原型验证习惯，也训练了跨工具表达的手感。"
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
        "国美 x 港科大 x Rokid 沉浸创新课程项目。针对传统文化叙事停留于视觉展示的问题，尝试将视觉、听觉和嗅觉组织成多感官 MR 原型，完成 Rokid 交互流程、Unity 场景和气味设备联动。",
      briefs: [
        {
          label: "BRIEF",
          body: "传统文化叙事在数字媒介中容易停留于视觉展示。"
        },
        {
          label: "METHOD",
          body: "拆解文化叙事与感官线索，规划视觉、听觉、嗅觉联动流程。"
        },
        {
          label: "ACTION",
          body: "完成 Rokid 交互流程、Unity 原型和嗅觉气味设备联动。"
        },
        {
          label: "REFLECTION",
          body: "创新点在嗅觉融入，也在多设备触发节奏与叙事理解的匹配。"
        }
      ],
      pageAlts: ["SENSAVERSE 感官宇宙课程总览"]
    },
    chinaAutoDiscourse: {
      title: "全球视野下的中国汽车设计话语体系研究",
      category: "Strategic Research / Automotive Experience",
      summary:
        "与吉利设计合作的白皮书项目，偏战略和趋势研究。负责场景篇的体验研究与图谱表达，围绕速度结构、硬件软件、空间情境三重边界，梳理汽车从交通工具到智能空间的人车关系演变。",
      briefs: [
        {
          label: "BRIEF",
          body: "中国新能源汽车快速出海，需要从设计话语层面梳理人车关系演变。"
        },
        {
          label: "METHOD",
          body: "以场景体验研究和图谱可视化整理趋势、边界与体验判断。"
        },
        {
          label: "ACTION",
          body: "负责场景篇研究与表达，梳理感知维度下的人车关系演变。"
        },
        {
          label: "REFLECTION",
          body: "战略研究的价值在于前置判断，帮助团队讨论未来设计方向。"
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
        "My Chelle 的移动端详情页与 AR 动态海报入口，补充智能护肤盒从实体包装到移动端、再到 AR 展示的跨触点体验。",
      briefs: [
        {
          label: "BRIEF",
          body: "智能护肤盒需要从实体包装延展到移动端信息和 AR 展示。"
        },
        {
          label: "METHOD",
          body: "用 NFC 串联实体包装、网页与 AR，让盒盖成为体验入口。"
        },
        {
          label: "ACTION",
          body: "完成移动端详情页和 AR 海报，连接产品信息与展示场景。"
        },
        {
          label: "REFLECTION",
          body: "跨媒介体验要控制入口、层级和展示顺序，避免触点断裂。"
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
