<template>
  <div class="flex flex-col my-auto items-center">
    <ul class="space-y-1">
      <li v-for="post in posts" :key="post.slug" class="space-x-2">
        <a :href="`/posts/${post.slug}`" target="_blank">{{ post.metadata.title }}</a>
        <a class="text-gray-500 text-sm">{{ post.metadata.update }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAllPosts } from '@/utils/blog-posts'
import { useDocumentTitle } from '@/composables/useDocumentTitle'

const { locale } = useI18n()

const posts = computed(() => getAllPosts(locale.value))

useDocumentTitle('blog')
</script>
