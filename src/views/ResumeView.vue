<template>
  <a>{{ $t('resume') }}</a>
</template>

<script setup lang="ts">
import { useDocumentTitle } from '@/composables/useDocumentTitle'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useDocumentTitle('resume')
</script>
