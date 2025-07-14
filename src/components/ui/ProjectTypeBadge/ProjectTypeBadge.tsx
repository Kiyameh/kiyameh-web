import {getTypeColor, getTypeIcon} from '../../elements/ProjectsExplorer/functions'
import styles from './ProjectTypeBadge.module.css'

export default function ProjectTypeBadge({type}: {type: string}) {
  return (
    <div className={`${styles.typeBadge} ${getTypeColor(type)}`}>
      {getTypeIcon(type)}
      <span>{type}</span>
    </div>
  )
}
