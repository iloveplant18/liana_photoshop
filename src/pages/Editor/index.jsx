import styles from './Editor.module.css'
import Sidebar from './Sidebar'
import WorkingArea from './WorkingArea.jsx'
import {TransformWrapper} from 'react-zoom-pan-pinch'

function Editor() {
  return (
    <div className={styles.editor}>
      <TransformWrapper  limitToBounds={false} minScale={0.05} initialScale={0.35}>
        <Sidebar/>
        <WorkingArea/>
      </TransformWrapper>
    </div>
  )
}

export default Editor