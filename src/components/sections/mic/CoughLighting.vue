<template>
  <div class="cough-lighting">
    <section v-for="button in ['Cough', 'Bleep']" :key="button" class="sect">
      <h3>{{ button === 'Cough' ? $t('message.lighting.cough.buttons.cough') : $t('message.lighting.cough.buttons.bleep') }}</h3>
      <CoughLightingRows :button="button"/>
    </section>
  </div>
</template>

<script>
import CoughLightingRows from "@/components/sections/mic/CoughLightingRows.vue";

// The Cough and Bleep buttons' lighting, opened from the Mic section.
export default {
  name: "CoughLighting",
  components: {CoughLightingRows},
}
</script>

<style scoped>
.cough-lighting {
  color: var(--c-text);
}

.sect {
  display: grid;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--c-line);
}

.sect:last-child {
  border-bottom: 0;
}

.sect h3 {
  margin: 0;
  font-family: var(--f-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

:deep(.row) {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

:deep(.row-label) {
  color: var(--c-muted);
  font-size: 12px;
}
</style>
