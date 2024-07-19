<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh)]">
    <main
      class="flex flex-col items-center h-[100%] min-h-[calc(100vh)] pt-12 pb-12 bg-[var(--color-background)]"
    >
      <slot></slot>
    </main>
  </div>
</template>
