<template>
  <section class="panel" :aria-label="title">
    <div v-if="title || $slots.actions" class="panel-head">
      <h2 v-if="title" class="panel-title">{{ title }}</h2>
      <span v-if="subtitle" class="panel-sub">{{ subtitle }}</span>
      <span class="grow"></span>
      <slot name="actions"></slot>
    </div>
    <div class="panel-body" :style="{ padding: bodyPadding }">
      <slot></slot>
    </div>
  </section>
</template>

<script>
// A titled card: the base block of every section.
export default {
  name: "Panel",
  props: {
    title: {type: String, required: false, default: ""},
    subtitle: {type: String, required: false, default: ""},
    bodyPadding: {type: String, required: false, default: "14px"},
  }
}
</script>

<style scoped>
.panel {
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 8px;
  min-width: 0;
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px 0;
}

.panel-title {
  margin: 0;
  font-family: var(--f-title);
  font-size: 15px;
  font-weight: normal;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--c-text);
}

.panel-sub {
  color: var(--c-muted);
  font-size: 12px;
}

.grow {
  flex: 1;
}
</style>
