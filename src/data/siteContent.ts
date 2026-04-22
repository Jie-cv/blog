import type { SiteContent } from '../types/content'

export const siteContent: SiteContent = {
  hero: {
    eyebrow: 'Personal Blog / Frontend Developer',
    title: '你好，我是赵捷。',
    subtitle: '这里是我的个人博客，也是我记录成长、技术和实习经历的地方。',
    intro:
      '目前就读于东华理工大学，正在持续深耕前端开发。我希望把学习、项目、实习和阶段性的思考，慢慢沉淀成真正属于自己的作品。',
    avatarSrc: '/avatar.jpg',
    links: [
      { label: '查看博客', href: '#thoughts-blog' },
      { label: '查看经历', href: '#internships' },
    ],
    profileFacts: [
      { label: '生日', value: '2005.11.03' },
      { label: '大学', value: '东华理工大学' },
      { label: '邮箱', value: '3382865253@qq.com' },
      { label: '方向', value: '前端开发' },
    ],
    metrics: [
      { label: '当前阶段', value: '大三学生' },
      { label: '学习起点', value: '2025-02-11' },
      { label: '博客定位', value: '成长 / 技术 / 实习记录' },
    ],
  },
  about: {
    title: '关于我',
    body:
      '我不是一路顺利地走到前端这条路上的。也正因为经历过方向摇摆、专业受阻和现实压力，我更想把自己的路径认真记录下来。这个页面对我来说不只是展示页，也是一个长期更新的个人博客入口。',
  },
  internships: [
    {
      company: '华顺信安',
      team: '第一段实习',
      summary: '这是我第一次真正进入职场的起点。我开始理解团队协作、业务目标和工程实践，也是在这里，我对前端路线第一次有了更坚定的认知。',
    },
    {
      company: '字节跳动国际化广告与技术',
      team: '第二段实习',
      summary: '进入更复杂的业务和工程环境后，我开始从更高的要求重新理解前端能力边界，也对协作、质量和技术深度有了更强意识。',
    },
    {
      company: 'TikTok Shop',
      team: '第三段实习',
      summary: '在更成熟的业务体系里继续积累，让我进一步理解产品、工程和落地之间的联系，也让我对未来的前端方向更明确。',
    },
  ],
  journey: [
    {
      year: '高中',
      title: '三个月的逆袭',
      description:
        '就读南丰县第一中学。高考前 3 个月，我把自己的名次从约 200 名冲到了全校 68 名，也第一次真正相信，结果是可以靠自己一点点改变的。',
    },
    {
      year: '高考后',
      title: '第一次面对落差',
      description:
        '高考的结果并不理想，原本的 211 梦想落空。那一刻我开始意识到，如果想走到更远的地方，未来还需要靠自己继续翻盘。',
    },
    {
      year: '大一',
      title: '专业受阻，但没有停下',
      description:
        '原本想靠转专业接近计算机方向，但政策变化打断了这条路。最后我转去了 GIS，一个依然能接触开发的专业，也是在那时，我第一次认真思考自己的长期路线。',
    },
    {
      year: '2025-02-11',
      title: '开始学习前端',
      description:
        '我想先试试看前端开发到底适不适合自己。结果是，我越学越确定，这就是我真正感兴趣并愿意长期投入的方向。',
      highlight: true,
    },
    {
      year: '学习途中',
      title: '被打断，也重新回来',
      description:
        '中途因为比赛和其他安排短暂偏离，但我最后还是回到了前端学习中。这次回归让我更确定，自己不是一时兴起，而是真的想走这条路。',
    },
    {
      year: '后续',
      title: '从成长到沉淀',
      description:
        '随着学习和实习不断推进，我开始把经历慢慢整理成自己的博客内容，也更希望用作品记录变化。',
      highlight: true,
    },
  ],
  skillTags: [
    { label: 'React' },
    { label: 'TypeScript' },
    { label: 'JavaScript' },
    { label: 'GSAP' },
    { label: '组件化' },
    { label: '前端工程化' },
    { label: 'Node.js' },
  ],
  projects: [
    {
      title: '个人博客首页',
      summary: '一个融合自我介绍、技术栈、实习经历和成长记录的个人博客首页。',
      stack: ['React', 'TypeScript', 'GSAP'],
      highlight: '用博客首页的方式承接个人表达与技术记录。',
    },
    {
      title: '前端学习沉淀区',
      summary: '用博客卡片和阶段思考承接学习记录、实习总结与技术复盘。',
      stack: ['React', 'CSS Modules'],
      highlight: '支持后续自然扩展成长期维护的个人博客。',
    },
  ],
  thinking: [
    {
      title: '为什么我最后坚定走前端',
      summary: '不是因为容易，而是因为我真的愿意长时间投入，并且始终保持兴趣。',
      tag: '成长思考',
    },
    {
      title: '第一段实习让我重新理解什么叫成长',
      summary: '真正进入公司以后，我开始把技术、协作和目标放到一个更真实的坐标系里看。',
      tag: '实习反思',
    },
    {
      title: '非科班和双非，真的没有机会吗',
      summary: '很多焦虑来自想象，很多信心来自真实行动。',
      tag: '路径选择',
    },
  ],
  blog: [
    {
      title: 'React 学习笔记',
      summary: '记录组件化、状态管理与渲染机制的学习过程。',
      tag: 'React',
    },
    {
      title: 'Fiber 架构学习记录',
      summary: '从第一段实习后的建议出发，继续补足 React 底层理解。',
      tag: '原理',
    },
    {
      title: '前端实习总结',
      summary: '从第一段实习中看到协作、业务与工程实践的真实样子。',
      tag: '实习',
    },
  ],
  footer: {
    quote: '把成长变成记录，把记录继续变成作品。',
    contacts: [
      { label: 'Email', href: 'mailto:3382865253@qq.com' },
      { label: '联系我', href: 'mailto:3382865253@qq.com' },
    ],
  },
}
