<template>
  <div class="flex flex-col my-auto items-center space-y-1">
    <span class="md:text-4xl text-xl font-bold italic text-center">
      SEAN MCBROOM
    </span>

    <img
      :src="gunflint.src"
      :srcset="gunflint.srcset"
      sizes="(max-width: 768px) 300px, 500px"
      class="md:w-[500px] w-[300px] h-auto"
      alt="Gunflint"
    />

    <span class="text-lg font-600 text-center">
      {{ $t("time in wdm") }}{{ $i18n.locale === "ja" ? "" : " "
      }}<span class="font-bold">{{ currentTime }}</span> CDT
    </span>

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
import { ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

import gunflint from "@/assets/images/gunflint.jpg?w=300;500;700&format=webp";
import { useMeta } from "@/composables/useMeta";

const { t, locale } = useI18n();

useMeta({
  title: () => t("home"),
  description: () => t("home-meta-description"),
});

interface Link {
  text: string;
  href: string;
  target: "_blank" | "_self";
}

const currentTime = ref("");
const links = ref<Link[]>([]);

const updateLinks = () => {
  links.value = [
    { text: t("about"), href: "about", target: "_self" },
    { text: t("blog"), href: "blog", target: "_self" },
    { text: t("resume"), href: "resume", target: "_blank" },
    { text: t("contact"), href: "contact", target: "_self" },
    {
      text: t("github"),
      href: "https://github.com/seanmcbroom",
      target: "_blank",
    },
    // { text: t('sourceCode'), href: 'https://github.com/seanmcbroom', target: '_blank' }
  ];
};

const updateCurrentTime = () => {
  const dateTimeFormat = new Intl.DateTimeFormat([locale.value], {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  currentTime.value = dateTimeFormat.format(new Date());
};

updateLinks();
updateCurrentTime();

watch(locale, () => {
  updateLinks();
  updateCurrentTime();
});

watchEffect(() => {
  const intervalId = setInterval(updateCurrentTime, 1000);

  return () => clearInterval(intervalId);
});
</script>
