<template>
  <div class="flex flex-col my-auto mx-5 items-center space-y-2">
    <a class="md:text-4xl text-xl font-bold italic text-center"> SEAN MCBROOM </a>

    <img :src="gunflint" class="md:w-[500px] w-[300px] h-auto" alt="" />

    <a class="text-lg font-600 text-center"
      >{{ $t('time in wdm') }} <a class="font-bold">{{ currentTime }}</a> CDT</a
    >

    <div class="flex flex-row space-x-1 text-sm">
      <template v-for="(link, index) in links" :key="index">
        <a :href="link.href" :target="link.target">{{ link.text }}</a>
        <span v-if="index !== links.length - 1"> // </span>
      </template>
    </div>

    <LanguageSelector />
  </div>
</template>

<script setup lang="ts">
import gunflint from '@/assets/images/gunflint.webp'
import { useDocumentTitle } from '@/composables/useDocumentTitle'
import { ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

useDocumentTitle()

interface Link {
  text: string
  href: string
  target: '_blank' | '_self'
}

const currentTime = ref('')
const links = ref<Link[]>([])

const updateLinks = () => {
  links.value = [
    { text: t('about'), href: 'about', target: '_self' },
    // { text: t('blog'), href: 'blog' },
    { text: t('resume'), href: 'resume', target: '_blank' },
    { text: t('contact'), href: 'contact', target: '_self' },
    { text: t('github'), href: 'https://github.com/seanmcbroom', target: '_blank' }
    // { text: t('sourceCode'), href: 'https://github.com/seanmcbroom', target: '_blank' }
  ]
}

const updateCurrentTime = () => {
  const dateTimeFormat = new Intl.DateTimeFormat([locale.value], {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  currentTime.value = dateTimeFormat.format(new Date())
}

updateLinks()
updateCurrentTime()

watch(locale, () => {
  updateLinks()
  updateCurrentTime()
})

watchEffect(() => {
  const intervalId = setInterval(updateCurrentTime, 1000)

  return () => clearInterval(intervalId)
})
</script>
