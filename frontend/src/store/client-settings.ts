import { useNavigatorLanguage, watchImmediate } from "@vueuse/core";
import { computed } from "vue";

import { CommonStore } from "./super/common-store";

import { i18n } from "@/plugins/i18n";

/**
 * == INTERFACES AND TYPES ==
 * Casted typings for the CustomPrefs property of DisplayPreferencesDto
 */
export interface ClientSettingsState {
  locale: string;
}

class ClientSettingsStore extends CommonStore<ClientSettingsState> {
  private readonly _navigatorLanguage = useNavigatorLanguage();
  private readonly _BROWSER_LANGUAGE = computed<string>(() => {
    const rawString = this._navigatorLanguage.language.value ?? "";
    /**
     * Removes the culture info from the language string, so 'es-ES' is recognised as 'es'
     */
    const cleanString = rawString.split("-");

    return cleanString[0];
  });

  public set locale(newVal: ClientSettingsState["locale"]) {
    this._state.locale =
      i18n.availableLocales.includes(newVal) && newVal !== "auto"
        ? newVal
        : "auto";
  }

  public get locale(): ClientSettingsState["locale"] {
    return this._state.locale;
  }

  private readonly _updateLocale = (): void => {
    i18n.locale.value =
      this.locale === "auto"
        ? this._BROWSER_LANGUAGE.value || String(i18n.fallbackLocale.value)
        : this.locale;
  };

  public constructor() {
    super(
      "clientSettings",
      {
        locale: "auto",
      },
      "localStorage",
    );
    /**
     * == WATCHERS ==
     */

    /**
     * Locale change
     */
    watchImmediate(
      [this._BROWSER_LANGUAGE, (): typeof this.locale => this.locale],
      this._updateLocale,
    );
  }
}

export const clientSettings = new ClientSettingsStore();
