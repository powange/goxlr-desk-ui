<template>
  <!-- A group of settings on a System page, with its title -->
  <section class="settings-card" :class="{ danger }" :aria-labelledby="title ? headingId : undefined">
    <div v-if="title" class="card-head">
      <h3 :id="headingId" class="card-title">{{ title }}</h3>
      <p v-if="description" class="card-description">{{ description }}</p>
    </div>
    <slot></slot>
  </section>
</template>

<script>
let next = 0;

export default {
  name: "SettingsCard",
  props: {
    title: {type: String, default: ""},
    description: {type: String, default: ""},
    // Actions that can't be undone (reset, stop): set apart, in red
    danger: {type: Boolean, default: false},
  },
  data() {
    return {headingId: `settings-card-${next++}`};
  },
}
</script>

<style scoped>
.settings-card {
  background-color: var(--c-panel);
  border: 1px solid var(--c-line);
  border-radius: 10px;
}

.settings-card.danger {
  border-color: color-mix(in srgb, var(--c-danger) 40%, var(--c-line));
}

.card-head {
  padding: 16px 20px 10px;
}

.card-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.card-description {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--c-muted);
}

.danger .card-title {
  color: var(--c-danger);
}

/* Rows are separated by a line, the first one from the title too */
.settings-card > :slotted(*:not(.card-head)) {
  border-top: 1px solid var(--c-line);
}

.settings-card > :slotted(*:first-child:not(.card-head)) {
  border-top: none;
}
</style>
