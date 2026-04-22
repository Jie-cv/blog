import { Routes, Route } from 'react-router-dom'
import styles from './App.module.css'
import { HomePage } from './pages/HomePage'
import { ArticlePage } from './pages/ArticlePage'

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.glowA} />
      <div className={styles.glowB} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </div>
  )
}

export default App
