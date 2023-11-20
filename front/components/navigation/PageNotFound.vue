<script setup lang="ts">
const canGoBack = window.history.length > 1;
function goBack () {
    window.history.go(-1)
}
</script>
<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>
      <q-btn
        v-if="canGoBack"
        class="q-mt-xl"
        color="white"
        text-color="blue"
        push
        @click="goBack"
        icon="keyboard_arrow_left"
        label="Go back"
      />
      <br/>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        push
        to="/"
        label="Go Home"
        icon="home"
      />
    </div>
  </div>
</template>
