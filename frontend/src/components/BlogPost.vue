<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { useMeta } from "@/composables/useMeta";
import { posts } from "@/utils/blog-posts";

const route = useRoute();
const { locale } = useI18n();

const html = ref("");
const created = ref(new Date());
const updated = ref(new Date());
const meta = ref<Record<string, string>>({});
const title = ref("");
const description = ref("");

useMeta({
  title: title,
  description: description,
});

// Function to load Markdown for a given slug + locale
const loadMarkdown = (slug: string, lang: string) => {
  const file = Object.keys(posts).find((path) =>
    path.endsWith(`${slug}.${lang}.md`),
  );

  if (!file) {
    if (lang !== "en") {
      loadMarkdown(slug, "en");
      return;
    }

    html.value = "";
    meta.value = {};
    return;
  }

  const raw = posts[file];
  const match = /^---([\s\S]*?)---/.exec(raw);
  let markdown = raw;

  if (match) {
    meta.value = {};
    match[1]
      .trim()
      .split("\n")
      .forEach((line) => {
        const [key, value] = line.split(":").map((s) => s.trim());
        if (key) meta.value[key] = value?.replace(/"/g, "");
      });
    markdown = raw.slice(match[0].length).trim();
  }

  const md = new MarkdownIt({ html: true });
  html.value = md.render(markdown);
  created.value = new Date(meta.value.upload);
  updated.value = new Date(meta.value.update);
  title.value = meta.value.title;
  description.value = meta.value.description;
};

// Watch both slug and locale
watch(
  [() => locale.value],
  ([lang]) => {
    if (lang) loadMarkdown(route.params.slug as string, lang);
  },
  { immediate: true },
);
</script>

<template>
  <article
    class="prose md:max-w-[700px] max-w-[500px] mx-auto my-10 px-4 sm:px-6 lg:px-0"
  >
    <!-- Header -->
    <header class="border-b border-gray-200 [&>*]:mb-5 [&>*]:mt-0 mb-5">
      <!-- Title -->
      <h1 class="font-extrabold text-3xl md:text-4xl leading-tight">
        {{ meta.title || $t("unavailable-blog-post") }}
      </h1>

      <!-- Metadata -->
      <p class="text-gray-500 text-sm flex flex-wrap gap-x-2 gap-y-1">
        {{
          [
            meta.author ? `${$t("by")} ${meta.author}` : null,
            meta.upload
              ? `${$t("uploaded")} ${created.toLocaleDateString(locale)}`
              : null,
            meta.update
              ? `${$t("updated")} ${updated.toLocaleDateString(locale)}`
              : null,
          ]
            .filter(Boolean)
            .join(" • ")
        }}
      </p>

      <!-- Description -->
      <p v-if="meta.description" class="text-gray-600 italic text-sm">
        {{ meta.description }}
      </p>

      <!-- Language selector -->
      <LanguageSelector />
    </header>

    <!-- Markdown content -->
    <div v-html="html" class="[&>*]:mb-4 [&>*]:mt-4"></div>
  </article>
</template>
