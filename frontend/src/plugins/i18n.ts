import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";

const DEFAULT_LANGUAGE = "en";

export const vuePlugin = createI18n({
  fallbackLocale: DEFAULT_LANGUAGE,
  globalInjection: true,
  legacy: false,
  messages: messages
});

export const i18n = vuePlugin.global;
