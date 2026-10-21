<template>
  <div class="select-menu" :class="{ open }">
    <button ref="button" type="button" class="sm-button" :class="buttonClass" aria-haspopup="listbox"
            :aria-expanded="open" :aria-label="label" :disabled="disabled"
            @click="toggle" @keydown.down.prevent="openList" @keydown.up.prevent="openList">
      <slot name="prefix"></slot>
      <span class="sm-value">{{ currentLabel() }}</span>
      <span class="sm-caret" aria-hidden="true"></span>
    </button>
    <ul v-if="open" ref="list" class="sm-list" role="listbox" tabindex="-1" :aria-label="label"
        :aria-activedescendant="activeIndex >= 0 ? optionId(activeIndex) : undefined" @keydown="onListKey">
      <li v-for="(option, index) in options" :key="option.id === null ? 'none' : option.id" :id="optionId(index)"
          role="option" :aria-selected="option.id === selected" :aria-disabled="option.disabled || undefined"
          :class="{ active: index === activeIndex, selected: option.id === selected, disabled: option.disabled }"
          @mousemove="activeIndex = index" @click="choose(option)">
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script>
let counter = 0;

// A drop-down that only applies a choice when it's clicked or confirmed with Enter. A native
// <select> applies every arrow key press, which sends a command (or loads a profile) for each
// option passed through.
export default {
  name: "SelectMenu",
  emits: ["select"],

  props: {
    options: {type: Array, required: true},   // [{id, label, disabled}]
    selected: {required: false, default: undefined},
    label: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    buttonClass: {type: String, required: false, default: ""},
  },

  data() {
    return {
      open: false,
      activeIndex: -1,
      uid: `select-menu-${++counter}`,
    }
  },

  mounted() {
    document.addEventListener("pointerdown", this.onOutside);
  },

  unmounted() {
    document.removeEventListener("pointerdown", this.onOutside);
  },

  methods: {
    optionId(index) {
      return `${this.uid}-${index}`;
    },

    currentLabel() {
      const option = this.options.find(option => option.id === this.selected);
      return option ? option.label : "";
    },

    toggle() {
      if (this.open) {
        this.close(false);
      } else {
        this.openList();
      }
    },

    openList() {
      if (this.disabled) return;
      this.open = true;
      this.activeIndex = Math.max(0, this.options.findIndex(option => option.id === this.selected));
      this.$nextTick(() => {
        this.$refs.list.focus();
        this.scrollToActive();
      });
    },

    close(focusButton) {
      this.open = false;
      if (focusButton) this.$nextTick(() => this.$refs.button.focus());
    },

    choose(option) {
      if (option.disabled) return;
      this.close(true);
      if (option.id !== this.selected) this.$emit("select", option.id);
    },

    move(step) {
      const count = this.options.length;
      for (let i = 1; i <= count; i++) {
        const next = (this.activeIndex + step * i + count) % count;
        if (!this.options[next].disabled) {
          this.activeIndex = next;
          break;
        }
      }
      this.$nextTick(this.scrollToActive);
    },

    scrollToActive() {
      const item = this.$refs.list && this.$refs.list.children[this.activeIndex];
      if (item) item.scrollIntoView({block: "nearest"});
    },

    onListKey(event) {
      switch (event.key) {
        case "ArrowDown": event.preventDefault(); this.move(1); break;
        case "ArrowUp": event.preventDefault(); this.move(-1); break;
        case "Home": event.preventDefault(); this.activeIndex = 0; break;
        case "End": event.preventDefault(); this.activeIndex = this.options.length - 1; break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (this.activeIndex >= 0) this.choose(this.options[this.activeIndex]);
          break;
        case "Escape":
          // Only close the list, not a dialog it may sit in
          event.preventDefault();
          event.stopPropagation();
          this.close(true);
          break;
        case "Tab":
          this.close(false);
          break;
      }
    },

    onOutside(event) {
      if (this.open && !this.$el.contains(event.target)) this.close(false);
    },
  }
}
</script>

<style scoped>
.select-menu {
  position: relative;
  display: inline-block;
  min-width: 0;
}

.sm-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 10px;
  border: 1px solid var(--c-line-strong);
  border-radius: 6px;
  background-color: var(--c-raised);
  color: var(--c-text);
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}

.sm-button:disabled {
  opacity: .5;
  cursor: default;
}

.sm-button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 1px;
}

.sm-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sm-caret {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--c-muted);
  flex: none;
}

.open .sm-caret {
  transform: rotate(180deg);
}

.sm-list {
  position: absolute;
  z-index: 50;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  max-height: 280px;
  overflow-y: auto;
  margin: 0;
  padding: 4px;
  list-style: none;
  box-sizing: border-box;
  background-color: var(--c-panel);
  border: 1px solid var(--c-line-strong);
  border-radius: 8px;
  box-shadow: 0 8px 24px var(--c-shadow);
}

.sm-list:focus {
  outline: none;
}

.sm-list li {
  padding: 6px 10px;
  border-radius: 4px;
  color: var(--c-text);
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
}

.sm-list li.active {
  background-color: var(--c-hover);
}

.sm-list li.selected {
  color: var(--c-accent);
  font-weight: 600;
}

.sm-list li.disabled {
  color: var(--c-faint);
  cursor: default;
}
</style>
