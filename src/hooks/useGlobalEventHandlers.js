import useUndo from "@/hooks/useUndo.js";

function useGlobalEventHandlers() {
  useUndo()
}

export default useGlobalEventHandlers;