<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// import { Header } from '../HeaderItem'
// import { NavBar } from '../NavBarItem'
import { Footer } from '../FooterItem'
import { PSABanner } from '../PSABanner'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh)]">
    <!-- <PSABanner :message="$t('psa-message')"></PSABanner> -->

    <main
      class="flex flex-col items-center min-h-[calc(100vh-165px)] pt-12 pb-12 bg-[var(--color-background)]"
    >
      <slot></slot>
    </main>
  </div>
</template>
