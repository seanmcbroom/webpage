<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PSABanner from '../PSABanner/PSABanner.vue';

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh)]">
    <PSABanner :message="t('psa-message')" />
    <main
      class="flex flex-col items-center h-[100%] min-h-[calc(100vh)] bg-[var(--color-background)]"
    >
      <slot></slot>
    </main>
  </div>
</template>
