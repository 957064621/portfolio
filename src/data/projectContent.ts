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
      pageAlts: ["SENSAVERSE 感官宇宙课程总览"]
    },
    chinaAutoDiscourse: {
      title: "全球视野下的中国汽车设计话语体系研究",
      category: "Strategic Research / Automotive Experience",
      summary:
        "中国汽车话语体系白皮书 2.0 项目。与吉利设计合作，负责场景体验研究，提炼汽车设计场景体验在不同时代边界跨越中的演变逻辑与人车关系，输出构建全新汽车使用场景和体验模式的行业白皮书。",
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
      pageAlts: ["MY CHELLE 移动端详情长图"]
    }
  },
  homeImages: {
    heroAlts: ["YUKO 作品集封面", "YUKO 简历页", "YUKO 获奖证书页", "YUKO 工作坊记录页"],
    featureAlts: ["作品集研究专题入口", "中国汽车话语体系研究入口", "精选作品目录引导页", "作品集结尾页"]
  }
} as const;
