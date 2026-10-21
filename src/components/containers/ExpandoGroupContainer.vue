<script>
import ExpandoBox from "@/components/design/ExpandoBox.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";

export default {
  name: "ExpandoGroupContainer",
  components: {GroupContainer, ExpandoBox},
  props: {
    title: String,
    expanded: Boolean,
    // Without the arrow, when the content is always shown
    collapsible: {type: Boolean, default: true},
  }
}
</script>

<template>
  <div class="expando">
    <GroupContainer :title="title">
      <template #right><slot name="right"></slot></template>
      <slot></slot>
    </GroupContainer>
    <ExpandoBox v-if="collapsible" @expando-clicked="$emit('expando-clicked')" :expanded="expanded"/>
  </div>

</template>

<style scoped>
.expando {
  display: flex;
  flex-direction: row;
}
</style>
