<template>
  <div class="flex flex-col my-auto items-center text-center space-y-6">
    <ul class="flex flex-col items-start space-y-1">
      <li v-for="post in posts" :key="post.slug" class="space-x-2">
        <a :href="`/posts/${post.slug}`" target="_blank">{{
          post.metadata.title
        }}</a>

        <a v-if="post.metadata.upload" class="text-gray-500 text-sm">{{
          new Date(post.metadata.upload).toLocaleDateString(locale)
        }}</a>
      </li>
    </ul>

    <a href="/">{{ t("home") }}</a>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { useMeta } from "@/composables/useMeta";
import { getAllPosts } from "@/utils/blog-posts";
import { getLocaleShort } from "@/utils/i18n";

const { t, locale } = useI18n();

const posts = computed(() => getAllPosts(getLocaleShort(locale.value)));

useMeta({
  title: () => t("blog"),
  description: () => t("blog-meta-description"),
});
</script>
