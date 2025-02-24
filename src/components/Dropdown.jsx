import styles from "./Dropdown.module.css"
import {useRef, useState, useEffect} from "react"

function Dropdown({buttonText, buttonClass, children, wrapperClass}) {
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const dropdownRef = useRef(null)

  function toggleIsDropdownShown() {
    if (!isDropdownShown) {
      setIsDropdownShown(true)
    } else {
      setIsDropdownShown(false)
    }
  }

  useEffect(() => {
    function clickHandler(event) {
      if (checkIsClickedOutside()) {
        setIsDropdownShown(false)
      }
    }

    document.addEventListener("click", clickHandler)
    return () => {
      document.removeEventListener("click", clickHandler)
    }
  })

  function checkIsClickedOutside() {
    return dropdownRef.current && !dropdownRef.current.contains(event.target)
  }

  return (
    <div
      className={`${styles.dropdownContainer} ${wrapperClass}`}
      ref={dropdownRef}
    >
      <button
        className={`${styles.dropdownButton} ${buttonClass}`}
        onClick={toggleIsDropdownShown}
      >
        {buttonText}
      </button>
      {isDropdownShown && (
        <div className={styles.dropdown}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown