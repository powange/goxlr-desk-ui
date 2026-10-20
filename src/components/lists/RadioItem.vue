<template>
  <div class="wrapper">
    <input ref="check" :name=group :id=id type="radio" @change="change" :value=id :checked="selected"
           :disabled="disabled" :aria-labelledby="`label_${id}`" class="screenreader-only"/>
    <label ref="label" :id="`label_${id}`" :for="id" :class="{ selected: this.selected, disabled: this.disabled }">
      <span v-if="detail !== undefined" class="detail">{{ detail }}</span>
      <font-awesome-icon v-if="icon !== undefined" :icon="icon"/>
      {{ text }}
      <span v-if="badge !== undefined" class="badge" :title="badgeLabel"><font-awesome-icon :icon="badge"/></span>
      <span v-if="badgeLabel !== undefined" class="screenreader-only">{{ badgeLabel }}</span>
    </label>
    <div ref="right_ref" class="right_side" :class="{ selected: this.selected, disabled: this.disabled }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  components: {FontAwesomeIcon},
  emits: ["radio-selected"],
  name: "RadioItem",

  props: {
    text: {type: String, required: true},
    icon: {type: String, required: false},
    id: {type: String, required: true},
    group: {type: String, required: true},

    selected: {type: Boolean, required: false, default: false},
    disabled: {type: Boolean, required: false, default: false},

    padding: {type: String, required: false, default: "8px"},
    background: {type: String, required: false, default: "#3b413f" },

    // Optional extra information shown on the right of the text, and a small icon after it
    detail: {type: String, required: false},
    badge: {type: String, required: false},
    badgeLabel: {type: String, required: false},
  },

  data: function () {
    return {
      local_selected: false,
    }
  },

  methods: {
    change() {
      this.$emit('radio-selected', this.id);
    },

    isSelected() {
      if (this.$refs.check === undefined) {
        return false;
      }
      return this.selected;
    },

    focus() {
      this.$refs.label.focus();
    }
  }
}
</script>

<style scoped>
.detail {
  float: right;
  margin-left: 10px;
  font-size: 0.85em;
  color: #a5a7a6;
}

label.selected .detail {
  color: #353937;
}

.badge {
  margin-left: 6px;
  font-size: 0.8em;
  color: #59b1b6;
}

label.selected .badge {
  color: #353937;
}

.wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

/* We're going to try and make the label look and behave like a legacy 'Button' */
label {
  display: block;
  box-sizing: border-box;

  /* Takes whatever the buttons on the right leave */
  flex: 1 1 auto;
  min-width: 0;
  margin: auto 0 auto auto;
  background-color: v-bind(background);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  padding: v-bind(padding);
  text-align: left;
  color: #fff;
}

/* Buttons on the right (menu, play..), side by side, on the same background as the item */
.right_side {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 0 auto;
  background-color: v-bind(background);
  margin-right: auto;
  color: #fff;
}

:slotted(.right_side > *) {
  color: #fff;
}

:slotted(.right_side.selected > *) {
  color: #353937;
}

.right_side.selected {
  background-color: #59b1b6;
  color: #353937;
}

label.selected {
  background-color: #59b1b6;
  color: #353937;
}

label:not(.selected):focus-within {
  background-color: #49514e;
}

label:not(.selected):hover, label:not(.selected):hover + div {
  background-color: #49514e;
}

label.disabled, label.disabled + div {
  background-color: #383D3B;
  color: #959796;
}

</style>
