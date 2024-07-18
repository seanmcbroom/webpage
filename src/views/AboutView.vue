<template>
  <div class="flex flex-col my-auto max-w-[700px] items-center space-y-5 mx-5 md:space-x-5">
    <div class="flex flex-col items-center space-y-5 md:space-x-5 md:flex-row">
      <img :src="pfp" alt="profile" class="w-[150px] rounded-full" />

      <a>
        {{ $t('about-description') }}
      </a>
    </div>

    <a class="text-left w-[100%]">
      <a>{{ $t('birthday') }}: {{ birthday.toLocaleDateString(locale) }}</a
      ><br />
      <a>{{ $t('age') }}: {{ getYearsSince(birthday) }} <br /></a>
    </a>

    <a href="/">{{ $t('home') }}</a>
  </div>
</template>

<script setup lang="ts">
import pfp from '@/assets/images/pfp.webp'
import { useDocumentTitle } from '@/composables/useDocumentTitle'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const birthday = new Date('7/11/2004')

useDocumentTitle('about')

const getYearsSince = (dateOfBirth: Date, dateToCalculate = new Date()) => {
  const dob = new Date(dateOfBirth).getTime()
  const dateToCompare = new Date(dateToCalculate).getTime()
  const age = (dateToCompare - dob) / (365.25 * 24 * 60 * 60 * 1000)
  return Math.floor(age)
}
</script>
