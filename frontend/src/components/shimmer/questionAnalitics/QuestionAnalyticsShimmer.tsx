import styles from './QuestionAnalyticsShimmer.module.css';
type Props = {}

function QuestionAnalyticsShimmer({}: Props) {
  return (
    <div className={styles.container}>
    <div className={`${styles['shimmer-wrapper']} ${styles['loading-card']} ${styles.shimmer}`}></div>
    <div className={`${styles['shimmer-wrapper']} ${styles['loading-text']} ${styles.shimmer}`}></div>
    <div className={`${styles['shimmer-wrapper']} ${styles['loading-text']} ${styles.shimmer}`}></div>
    <div className={`${styles['shimmer-wrapper']} ${styles['loading-text']} ${styles.shimmer}`}></div>
  </div>
  )
}

export default QuestionAnalyticsShimmer