<template>
  <a>{{ $t('blog') }}</a>
</template>

<script setup lang="ts">
import { useDocumentTitle } from '@/composables/useDocumentTitle'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useDocumentTitle('blog')
</script>
