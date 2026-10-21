<template>
  <div v-if='isActive'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabButton",
  props: {
    id: {type: String, required: true},
    name: {type: String, required: true},
    selected: {type: Boolean, default: false},
    // Side bar only: a FontAwesome icon, and the group heading the tab sits under
    icon: {type: String, required: false, default: undefined},
    group: {type: String, required: false, default: undefined},
    hidden: {type: Boolean, default: false},
  },
  data() {
    return {
      isActive: true
    }
  },

  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-');
    }
  },

  mounted() {
    this.isActive = this.selected;
  },

  created() {
    this.$parent.tabs.push(this);
  }
}
</script>

<style scoped>
</style>
