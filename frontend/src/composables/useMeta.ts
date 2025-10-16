import { watch, unref } from "vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";

const DEFAULT_TITLE = "SEAN MCBROOM";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface MetaOptions {
  title?: string | Ref<string>;
  description?: string | Ref<string>;
  ogTitle?: string | Ref<string>;
  ogDescription?: string | Ref<string>;
  ogUrl?: string | Ref<string>;
  ogImage?: string | Ref<string>;
}

export function useMeta(options: MetaOptions = {}) {
  const { t, locale } = useI18n();

  const updateMeta = () => {
    // TITLE
    const titleKey = options.title;
    const resolvedTitle = titleKey
      ? `${capitalizeFirstLetter(t(unref(titleKey)))} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE;
    document.title = resolvedTitle;

    // DESCRIPTION
    if (options.description) {
      const desc = unref(options.description);
      let el = document.querySelector(
        'meta[name="description"]',
      ) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", desc);
    }

    // OPEN GRAPH / SOCIAL META
    if (
      options.ogTitle ||
      options.ogDescription ||
      options.ogUrl ||
      options.ogImage
    ) {
      const setOgTag = (property: string, value: string) => {
        let el = document.querySelector(
          `meta[property="${property}"]`,
        ) as HTMLMetaElement;
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute("property", property);
          document.head.appendChild(el);
        }
        el.setAttribute("content", value);
      };

      if (options.ogTitle) setOgTag("og:title", unref(options.ogTitle));
      if (options.ogDescription)
        setOgTag("og:description", unref(options.ogDescription));
      if (options.ogUrl) setOgTag("og:url", unref(options.ogUrl));
      if (options.ogImage) setOgTag("og:image", unref(options.ogImage));
    }
  };

  updateMeta();

  // Re-run on locale change or reactive refs
  watch(
    [
      () => locale.value,
      () => options.title && unref(options.title),
      () => options.description && unref(options.description),
      () => options.ogTitle && unref(options.ogTitle),
      () => options.ogDescription && unref(options.ogDescription),
      () => options.ogUrl && unref(options.ogUrl),
      () => options.ogImage && unref(options.ogImage),
    ],
    updateMeta,
    { immediate: true },
  );
}
