<template>
  <div class="flex flex-col my-auto items-center text-center space-y-6">
    <a>
      {{ t('contact-disclaimer') }}
    </a>

    <div class="flex flex-col items-center">
      <span>
        {{ t('email') }}—<a href="mailto:sean.mcbroom@outlook.com">sean.mcbroom@outlook.com</a>
      </span>
      <span>
        {{ t('linkedin') }}—<a href="https://www.linkedin.com/in/sean-mcbroom/" target="_blank">https://www.linkedin.com/in/sean-mcbroom</a>
      </span>
    </div>

    <a href="/">{{ t('home') }}</a>
  </div>
</template>

<script setup lang="ts">
import { useDocumentTitle } from '@/composables/useDocumentTitle'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useDocumentTitle('contact')
</script>
