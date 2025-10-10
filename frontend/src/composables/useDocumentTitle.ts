import { watch, unref } from "vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";

const DEFAULT_TITLE = "SEAN MCBROOM";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function useDocumentTitle(titleKey: string | Ref<string> = "") {
  const { t, locale } = useI18n();

  const updateTitle = () => {
    const key = unref(titleKey);

    document.title =
      key.length > 0
        ? `${capitalizeFirstLetter(t(key))} | ${DEFAULT_TITLE}`
        : DEFAULT_TITLE;
  };

  updateTitle();

  watch([() => locale.value, () => unref(titleKey)], updateTitle, {
    immediate: true,
  });
}
