import useBlackAndWhite from "@/hooks/useBlackAndWhite.js"
import {memo} from "react";

const MakeImageBlackAndWhite = memo(() => {
  const {makeImageBlackAndWhite} = useBlackAndWhite()

  console.log(makeImageBlackAndWhite)
  return (
    <button onClick={() => makeImageBlackAndWhite?.()}>
      ЧБ
    </button>
  );
})

MakeImageBlackAndWhite.displayName = "MakeImageBlackAndWhite"

export default MakeImageBlackAndWhite;