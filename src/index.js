import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";

import CmrCsModuleMainMenu from "./menus/CmrCsModuleMainMenu";

const DEFAULT_CONFIG = {
  "translations": [
    { key: "en", messages: messages_en },
    { key: "fr", messages: messages_fr },
  ],
  "core.MainMenu" : [CmrCsModuleMainMenu]
}

export const CmrCsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}