import { watch, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Ref } from 'vue'

const DEFAULT_TITLE = 'SEAN MCBROOM'

export function useDocumentTitle(titleKey: string | Ref<string> = '') {
  const { t, locale } = useI18n()

  const updateTitle = () => {
    const key = unref(titleKey) // unwrap ref if needed
    document.title = key.length > 0 ? `${t(key)} | ${DEFAULT_TITLE}` : DEFAULT_TITLE
  }

  // Initial set
  updateTitle()

  // Watch both the locale and the titleKey
  watch([() => locale.value, () => unref(titleKey)], updateTitle, { immediate: true })
}
