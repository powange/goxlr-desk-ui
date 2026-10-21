<template>
  <button ref="button" role="button" :aria-labelledby="`button_title_${id}`" class="content" @click="clicked">
    <div class="img-section">
      <slot/>
    </div>
    <div class="iconTitle"><span :id="`button_title_${id}`" class="filler">{{ title }}</span></div>
  </button>
</template>

<script>
export default {
  name: "BigButton",

  props: {
    id: { type: String, required: true },
    title: String,
  },

  methods: {
    clicked: function (eventData){
      this.$emit("button-clicked", eventData)
    },
    focus: function() {
      this.$refs.button.focus();
    }
  }
}
</script>

<style scoped>
/* A tile: icon on top, label below */
button.content {
  min-width: 136px;
  max-width: min-content;
  height: 150px;
  background: var(--c-raised);
  border: 1px solid var(--c-line);
  border-radius: 10px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

button .img-section {
  flex: 1;
  font-size: 46px;
  color: var(--c-muted);

  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  cursor: pointer;
  border-color: var(--c-accent);
}

button:hover .img-section {
  color: var(--c-accent);
}

button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}

button .iconTitle {
  padding: 10px 12px 14px;
  color: var(--c-text);
  font-family: var(--f-body);
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}
</style>
