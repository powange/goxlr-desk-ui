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

button.content {
  min-width: 130px;
  max-width: min-content;
  height: 170px;
  background: var(--c-bg);
  border: 0;
  margin: 0;
  padding: 0;
}

button .img-section {
  text-align: center;
  height: 130px;
  font-size: 80px;
  color: var(--c-muted);

  display: flex;
  justify-content: center;
  align-items: center;

  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
}

button:hover {
  cursor: pointer;
}

button:hover .img-section {
  color: var(--c-text);
  background-color: var(--c-hover);
}

button .iconTitle {
  height: 40px;
  line-height: 40px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-family: var(--f-body);
  text-align: center;
  white-space: nowrap;
  padding: 0px 10px;
}
button:hover .iconTitle {
  background-color: var(--c-hover-strong);
}



</style>
