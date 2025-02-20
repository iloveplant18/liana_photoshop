import styles from './Editor.module.css'
import Sidebar from './Sidebar.jsx'
import WorkingArea from './WorkingArea.jsx'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

function Editor() {
    return (
        <div className={styles.editor}>
            <TransformWrapper centerOnInit={true} limitToBounds={false} minScale={0.05} initialScale={0.5}>
                <Sidebar />
                <WorkingArea />
            </TransformWrapper>
        </div>
    )
}

export default Editor