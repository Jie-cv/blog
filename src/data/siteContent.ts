import type { SiteContent } from '../types/content'

export const siteContent: SiteContent = {
  hero: {
    eyebrow: 'Frontend / React / Growth Journey',
    title: '从曲折里走出来的前端学习者',
    subtitle:
      '我不是一路顺利地走到这里，但每一次偏离，最后都让我更坚定地走向前端开发。',
    links: [
      { label: '查看成长历程', href: '#journey' },
      { label: '查看博客与思考', href: '#thoughts-blog' },
    ],
    metrics: [
      { label: '当前阶段', value: '大三 / 前端方向' },
      { label: '起点时间', value: '2025-02-11' },
      { label: '目标', value: '持续成长，冲击更高平台' },
    ],
  },
  about: {
    title: '现在的我',
    body:
      '我是东华理工大学的一名大三学生。走到前端这条路并不算顺利，但也正因为经历过专业受阻、方向摇摆和现实压力，我才更确定自己真正想长期投入的事情是什么。',
  },
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
      year: '暑期',
      title: '在现实挤压里继续前进',
      description:
        '补修课程、当前专业课程、自学技术、找实习计划同时交织在一起。即使计划被打乱，我还是选择继续准备，继续投递。',
    },
    {
      year: '第一段实习',
      title: '走进华顺信安',
      description:
        '进入公司之后，我第一次真正理解团队协作、业务目标和工程实践，也第一次从真实工作环境里重新认识自己。',
      highlight: true,
    },
    {
      year: '实习之后',
      title: '把“想进大厂”变成具体目标',
      description:
        '和 leader 的交流、真实的工作体验、以及身边案例，让我对前端路线越来越坚定。我开始把目标明确成字节，并决定继续深耕 React 和工程能力。',
      highlight: true,
    },
    {
      year: '回校后',
      title: '不再被标签束缚',
      description:
        '有了第一段实习后，我开始相信双非和非科班并不是绝对限制。与其继续焦虑，不如把时间投入到技术成长和下一段机会里。',
    },
    {
      year: '后续冲刺',
      title: '接到字节面试电话',
      description:
        '从最初屡屡受挫，到后来终于迎来机会，这通电话让我知道，持续投入不会立刻兑现，但它一定会留下回响。',
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
      title: '成长叙事型个人主页',
      summary: '一个强调成长路径、技术表达与持续输出的科技感个人主页。',
      stack: ['React', 'TypeScript', 'GSAP'],
      highlight: '用时间轴叙事替代传统简历堆砌。',
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
    quote: '我走得不算顺，但我一直在向前。',
    contacts: [
      { label: 'Email', href: 'mailto:hello@example.com' },
      { label: 'GitHub', href: 'https://github.com/' },
    ],
  },
}
