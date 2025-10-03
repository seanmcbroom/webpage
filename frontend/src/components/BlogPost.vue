<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MarkdownIt from 'markdown-it'
import { posts } from '@/utils/blog-posts'

const route = useRoute()
const { locale } = useI18n()

const html = ref('')
const created = ref(new Date())
const updated = ref(new Date())
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
  created.value = new Date(meta.value.upload)
  updated.value = new Date(meta.value.update)
})
</script>

<template>
  <article class="prose md:max-w-[700px] max-w-[500px] mx-auto my-16 px-4 sm:px-6 lg:px-0">
    <!-- Title -->
    <h1 class="font-bold">{{ meta.title || 'Untitled Post' }}</h1>

    <!-- Metadata -->
    <p class="text-gray-500 text-sm mt-1 ">
      <span v-if="meta.author">{{$t('by')}} {{ meta.author }}</span>
      <span v-if="meta.upload"> - {{$t('created')}}: {{ created.toLocaleDateString(locale) }}</span>
      <span v-if="meta.update"> - {{$t('updated')}}: {{ updated.toLocaleDateString(locale) }}</span>
    </p>

    <p class="text-gray-500 text-sm mt-1">
      <em v-if="meta.description">{{ meta.description }}</em>
    </p>

    <hr/>

    <!-- Markdown content -->
    <div v-html="html" class="mt-6"></div>
  </article>
</template>
