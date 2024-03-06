<script setup lang="ts">
withDefaults(defineProps<{useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showKind?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showKind: true,
});
</script>
<template>
  <q-card bordered class="q-ma-sm full-width" >
    <q-card-section class="text-center text-white">
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none"><q-skeleton type="text" /></div>
    </q-card-section>
    <q-card-section class="text-center">
      <q-markup-table class="full-width">
        <thead>
          <tr>
            <th class="text-left" :style="`width: 150px`" v-if="showNamespace">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-left" :style="`width: ${Math.trunc(Math.random()*10)+100}px`">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right" :style="`width: ${Math.trunc(Math.random()*10)+100}px`">
              <q-skeleton animation="blink" type="text" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in Math.trunc(Math.random()*4)+1" :key="n">
            <td class="text-left"  v-if="showNamespace">
              <q-skeleton animation="blink" type="text" :width="(Math.trunc(Math.random()*18)*5+10).toString()" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" :width="(Math.trunc(Math.random()*18)*5+10).toString()" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" :width="(Math.trunc(Math.random()*18)*5+10).toString()" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>
