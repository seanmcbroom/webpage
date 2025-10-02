<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MarkdownIt from 'markdown-it'
import { posts } from '@/utils/blog-posts'

const route = useRoute()
const { locale } = useI18n()

const html = ref('')
const meta = ref<Record<string, string>>({})

onMounted(() => {
  const slug = route.params.slug as string
  const lang = locale.value

  const file = Object.keys(posts).find(path =>
    path.endsWith(`${slug}.${lang}.md`)
  )

  if (!file) return

  const raw = posts[file]
  const match = /^---([\s\S]*?)---/.exec(raw)
  let markdown = raw

  if (match) {
    match[1].trim().split('\n').forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim())
      if (key) meta.value[key] = value?.replace(/"/g, '')
    })
    markdown = raw.slice(match[0].length).trim()
  }

  const md = new MarkdownIt()
  html.value = md.render(markdown)
})
</script>

<template>
  <article class="prose prose-lg max-w-none mx-auto p-6">
    <h1>{{ meta.title }}</h1>
    <p class="text-gray-500 text-sm">{{ meta.date }}</p>
    <div v-html="html"></div>
  </article>
</template>
