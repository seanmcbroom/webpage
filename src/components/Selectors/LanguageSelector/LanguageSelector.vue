<template>
  <select
    id="language"
    @change="
      (event) => {
        const target = event.target as HTMLSelectElement
        const selectedLocaleValue = target.selectedOptions[0].dataset.locale

        if (selectedLocaleValue) {
          clientSettings.locale = selectedLocaleValue
        }
      }
    "
  >
    <option
      v-for="(item, index) in i18n.availableLocales"
      :key="index"
      :selected="item === clientSettings.locale"
      :data-locale="item"
    >
      {{ getLocaleNativeName(item) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { clientSettings } from '@/store/client-settings'
import { i18n } from '@/plugins/i18n'
import { getLocaleNativeName } from '@/utils/i18n'
</script>
