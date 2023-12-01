import styles from '../../styles/scoped/home.module.scss'
import FeedCard from '../../components/FeedCard'

export default function Home() {

  

  return (
    <div className={styles.container}>
      <div className={styles['carousel-area']}>
        carousel-area
      </div>
      <FeedCard></FeedCard>
      <FeedCard></FeedCard>
      <FeedCard></FeedCard>
      <FeedCard></FeedCard>
      <FeedCard></FeedCard>
      <FeedCard></FeedCard>
    </div>
  )
}
