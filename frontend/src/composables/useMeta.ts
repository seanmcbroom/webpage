import type { Ref } from "vue";
import { unref, watch } from "vue";
import { useI18n } from "vue-i18n";

const DEFAULT_TITLE = "SEAN MCBROOM";

export interface PageMeta {
  title: () => string | Ref<string>;
  description?: () => string | Ref<string>;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Resolves a value that may be:
 * - a Ref
 * - a string
 * - a function returning a string or a Ref
 */
function resolve<T>(value: T | Ref<T> | (() => T | Ref<T>)): T {
  if (typeof value === "function") {
    return unref((value as () => T | Ref<T>)());
  }
  return unref(value as T | Ref<T>);
}

export function useMeta(meta: PageMeta) {
  const { locale } = useI18n();

  const updateMeta = () => {
    const title = resolve(meta.title);

    document.title =
      title && title.length > 0
        ? `${capitalizeFirstLetter(title)} | ${DEFAULT_TITLE}`
        : DEFAULT_TITLE;

    const description = meta.description ? resolve(meta.description) : "";

    if (description) {
      let el = document.querySelector('meta[name="description"]');

      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }

      el.setAttribute("content", description);
    }
  };

  watch(
    [
      () => locale.value,
      () => resolve(meta.title),
      () => (meta.description ? resolve(meta.description) : "")
    ],
    updateMeta,
    { immediate: true }
  );
}
