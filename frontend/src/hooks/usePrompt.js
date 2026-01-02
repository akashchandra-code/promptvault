import { useContext } from "react";
import { PromptContext } from "../context/PromptContext";

export const usePrompt = () => useContext(PromptContext);
