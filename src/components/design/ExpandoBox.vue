<template>
  <button class="expander" @click="handleClick">
    <font-awesome-icon v-if=expanded :title="$t('message.common.collapseSection')" :icon="'fa-solid ' + expand_left" />
    <font-awesome-icon v-else :title="$t('message.common.expandSection')" :icon="'fa-solid ' + expand_right" />
  </button>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: "ExpandoBox",
  components: {FontAwesomeIcon},
  props: {
    expanded: {type: Boolean, default: false },
    expand_right: { type: String, required: false, default: 'fa-chevron-right'},
    expand_left: { type: String, required: false, default: 'fa-chevron-left'}
  },

  methods: {
    expandText() {
      if (this.expanded) {
        return "<"
      }
      return ">"
    },
    handleClick() {
      this.$emit("expando-clicked");
    }
  }
}
</script>

<style scoped>
.expander {
  display:inline-flex;
  align-items: center;

  color: var(--c-text);
  vertical-align: middle;
  background-color: var(--c-raised-2);
  padding: 15px;

  border: 0;
}

.expander:hover {
  background-color: var(--c-hover);
}
</style>

