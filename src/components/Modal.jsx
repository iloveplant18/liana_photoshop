import {useEffect, useRef} from "react";
import styles from './Modal.module.css'
import {createPortal} from "react-dom";

function Modal({children, openingButton}) {
  const dialogRef = useRef()

  function openModal() {
    dialogRef.current?.showModal()
  }

  return (
    <>
      <span onClick={openModal}>
        {openingButton}
      </span>
      {createPortal(
        <dialog className={styles.modal} ref={dialogRef}>
          <form method="dialog">
            <button className={styles.backdropButton}></button>
          </form>
          <div className={styles.modalInner}>
            <form method="dialog">
              <button className={styles.closeButton}></button>
            </form>

            {children}</div>
        </dialog>,
        document.body
      )
      }
    </>
  )
}

export default Modal