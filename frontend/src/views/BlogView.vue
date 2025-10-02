<template>
  <a>{{ $t('blog') }}</a>
  <div>
    <ul class="space-y-4">
      <li v-for="post in posts" :key="post.slug">
        <a :href="`/blog/${post.slug}`" target="_blank">{{ post.metadata.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAllPosts } from '@/utils/blog-posts'
import { useDocumentTitle } from '@/composables/useDocumentTitle'

const { t, locale } = useI18n()

const posts = computed(() => getAllPosts(locale.value))

console.log(posts.value.length)
console.log(posts.value)

useDocumentTitle('blog')
</script>
