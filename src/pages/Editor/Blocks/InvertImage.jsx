import useInvert from "@/hooks/useInvert.js";

function InvertImage() {
  const {invertImage} = useInvert()

  return (
    <button onClick={invertImage}>Инвертировать</button>
  );
}

export default InvertImage;