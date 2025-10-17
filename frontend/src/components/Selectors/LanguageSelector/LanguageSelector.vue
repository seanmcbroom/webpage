<template>
  <label id="language-desc" for="language" class="sr-only"
    >Select Language</label
  >
  <select
    id="language"
    aria-labelledby="language-desc"
    v-model="clientSettings.locale"
    @change="
      (event: Event) => {
        const target = event.target as HTMLSelectElement;
        const selectedLocale = target.value;
        clientSettings.locale = selectedLocale;
      }
    "
  >
    <option
      v-for="(item, index) in i18n.availableLocales"
      :key="index"
      :value="item"
    >
      {{ getLocaleNativeName(item) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { i18n } from "@/plugins/i18n";
import { clientSettings } from "@/store/client-settings";
import { getLocaleNativeName } from "@/utils/i18n";
</script>
