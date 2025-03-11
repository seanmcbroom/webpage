import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const DEFAULT_TITLE = 'SEAN MCBROOM'
export function useDocumentTitle(titleKey: string = '') {
  const { t, locale } = useI18n()

  const updateTitle = () => {
    document.title = titleKey.length > 0 ? `${DEFAULT_TITLE} | ${t(titleKey)}` : DEFAULT_TITLE
  }

  updateTitle()

  watch(locale, updateTitle)
}
