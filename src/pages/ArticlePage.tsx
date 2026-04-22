import { useParams, Link } from 'react-router-dom'
import { GlowPanel } from '../components/GlowPanel'
import { siteContent } from '../data/siteContent'
import styles from './ArticlePage.module.css'
import appStyles from '../App.module.css'

export function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  
  // Try to find the article in thinking or blog
  const article = 
    siteContent.thinking.find(item => item.id === id) || 
    siteContent.blog.find(item => item.id === id)

  return (
    <div className={appStyles.layout} style={{ display: 'block', maxWidth: '800px', margin: '0 auto', paddingTop: '64px' }}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <span className={styles.backIcon}>←</span> 返回首页
        </Link>
        
        {article ? (
          <GlowPanel className={styles.articleCard}>
            <div className={styles.header}>
              <span className={styles.tag}>{article.tag}</span>
              <h1 className={styles.title}>{article.title}</h1>
              <p className={styles.summary}>{article.summary}</p>
            </div>
            
            <div className={styles.content}>
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🚧</div>
                <h3>文章内容建设中</h3>
                <p>博主正在努力码字，敬请期待...</p>
              </div>
            </div>
          </GlowPanel>
        ) : (
          <div className={styles.notFound}>
            <h2>文章未找到</h2>
            <p>该内容可能已被移除或地址有误</p>
          </div>
        )}
      </div>
    </div>
  )
}
