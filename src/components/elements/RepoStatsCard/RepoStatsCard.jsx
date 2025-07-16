import {useEffect} from 'react'
import {createRepoCard} from 'github-repo-stats-card'
import styles from './RepoStatsCard.module.css'

export default function RepoStatsCard({repo, githubAuthToken}) {
  useEffect(() => {
    if (repo) {
      createRepoCard('#repo-stats-card', repo, githubAuthToken)
    }
  }, [repo, githubAuthToken])

  return (
    <div
      id="repo-stats-card"
      className={styles.container}
    >
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
        <span>Loading stats...</span>
      </div>
    </div>
  )
}
