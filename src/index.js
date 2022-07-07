import messages_en from "./translations/en.json";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
}

console.log("Cmr CS Module Specific")
export const CmrCsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}