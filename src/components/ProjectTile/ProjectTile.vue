<script setup lang="ts">
import { Divider } from '../DividerElement'
import { DotDivider } from '../DotDividerElement'
import { Button } from '../ButtonElement'

interface ProjectData {
  title?: string
  date?: Date
  description?: string
  imageUrl?: string
  linkUrl?: string
}

defineProps({
  projectData: Object as () => ProjectData
})

function timeSince(date: Date | undefined) {
  if (!date) return

  console.log(date)

  const millisecondsSince = new Date().getTime() - date.getTime()
  const secondsSince = millisecondsSince / 1000
  const secondsToYears = secondsSince / 31536000

  if (secondsToYears > 1) {
    return `${Math.floor(secondsToYears)}y`
  }
}
</script>

<template>
  <div class="project-tile">
    <div class="project-title">
      <h3>
        {{ projectData?.title }}
      </h3>
      <DotDivider :size="5" v-if="timeSince(projectData?.date) != null"></DotDivider>
      <p>{{ timeSince(projectData?.date) }}</p>
    </div>

    <Divider :thickness="1" :padding="5"></Divider>

    <p>{{ projectData?.description }}</p>
    <img :src="projectData?.imageUrl" :alt="projectData?.title" />
    <Button :text="'Learn More'" :href="projectData?.linkUrl"></Button>
  </div>
</template>

<style scoped>
.project-tile {
  background-color: var(--color-background-soft);
  border: 2px solid var(--color-border);
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: auto;
}

.project-tile:hover {
  border: 2px solid var(--color-border-hover);
}

.project-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.project-tile h3 {
  font-weight: 600;
  margin-top: 0;
}

.project-tile p {
  font-size: 1rem;
}

.project-tile img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
