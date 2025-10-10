<script setup lang="ts">
import { RouterView } from "vue-router";

import { Page } from "./components/Layout/Page";
</script>

<template>
  <Page>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback>
                <h1>Loading...</h1>
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </Page>
</template>
