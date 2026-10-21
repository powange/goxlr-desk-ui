<template>
  <!-- Inline: the content shown in place, as a titled panel (no mask, no close button) -->
  <section v-if="inline" class="inline-panel" :aria-labelledby="`${id}_label`">
    <h2 :id="`${id}_label`" class="inline-title"><slot name="title"></slot></h2>
    <div class="inline-body"><slot></slot></div>
  </section>
  <div v-else v-show=is_visible class="modal-mask">
    <div class="modal-wrapper">
      <div ref="dialog" class="modal-container" role="dialog" aria-modal="true" :aria-labelledby="`${id}_label`"
           :aria-describedby="`${id}_body`" @keydown.esc.stop.prevent="closeModalEsc">
        <div class="modal-header" tabindex="0">
          <div :id="`${id}_label`" role="heading" aria-level="2" >
            <slot name="title" ref="title"></slot>
          </div>
          <button v-show=show_close ref="close" @click="closeModal()">
            <font-awesome-icon :title="$t('message.common.close')" icon="fa-solid fa-xmark"/>
          </button>
        </div>
        <div class="modal-body" :id="`${id}_body`">
          <slot></slot>
        </div>
        <div v-if="show_footer" class="modal-footer">
          <slot name="footer">
            <button ref="ok" class="modal-default-button" @click="closeModal()">{{ $t('message.modalButtons.ok') }}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as focusTrap from "focus-trap";

export default {
  name: "AccessibleModal",
  emits: ["modal-close"],

  props: {
    id: {type: String, required: true},
    show_close: {type: Boolean, default: true},
    show_footer: {type: Boolean, default: true},
    prevent_esc: {type: Boolean, default: false},

    bodyPadding: {type: String, default: "20px"},
    width: {type: String, default: "500px"},
    inline: {type: Boolean, default: false},
  },

  data() {
    return {
      is_visible: false,
      returnFocus: undefined,
      trap: undefined,
    }
  },

  methods: {
    openModal(focusRef, returnFocus) {
      if (this.inline) return;
      this.returnFocus = returnFocus;
      this.is_visible = true;

      this.$nextTick(() => {
        if (focusRef === undefined) {
          if (this.$refs.ok !== undefined) {
            this.$refs.ok.focus();
          } else {
            this.$refs.close.focus();
          }
        } else {
          focusRef.focus();
        }

        // Create the focus trap, to prevent moving out..
        this.trap = focusTrap.createFocusTrap(this.$refs.dialog);
        this.trap.activate();
      })
    },

    closeModalEsc() {
      if (this.prevent_esc) {
        return;
      }
      this.closeModal()
    },

    closeModal() {
      if (this.inline) return;
      // Deactivate the Trap (if active)..
      this.trap.deactivate();

      // Hide the UI..
      this.is_visible = false;

      // Return focus to the requested element.
      if (this.returnFocus !== undefined) {
        this.returnFocus.focus();
      }

      this.$emit('modal-close');
    },

    isOpen() {
      return this.inline || this.is_visible;
    }
  }
}


</script>

<style scoped>
.inline-panel {
  display: grid;
  gap: 16px;
  align-content: start;
  color: var(--c-text);
}

.inline-title {
  margin: 0;
  font-family: var(--f-title);
  font-size: 18px;
  font-weight: normal;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.inline-body {
  text-align: left;
}

/* Turn the background of the screen grey */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: table;
  transition: opacity 0.3s ease;
}

/* Positions the Modal in the Middle of the Screen */
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

/* The Actual Border / Setup of the Modal */
.modal-container {
  border: 1px solid var(--c-line);

  min-width: v-bind(width);
  max-width: min-content;
  margin: 0 auto;
  background-color: var(--c-text);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

/* Header Styling.. */
.modal-header {
  text-transform: uppercase;
  font-family: var(--f-title);
  background-color: var(--c-raised-2);
  text-align: center;
  color: var(--c-text);
  overflow: hidden;
  outline: none;
}

.modal-header div {
  padding: 15px;
  float: left;
  display: block;
  clear: both;
}

.modal-header button {
  padding: 14px;
  float: right;
  cursor: pointer;
  background-color: transparent;
  color: var(--c-text);
  border: 0;
}

.modal-body {
  background-color: var(--c-panel);
  color: var(--c-text);
  padding: v-bind(bodyPadding);
}

.modal-footer {
  background-color: var(--c-panel);
  text-align: right;
  padding-right: 10px;
  padding-bottom: 10px;
}

.modal-footer button {
  background-color: var(--c-raised);
  color: var(--c-text);
  padding: 8px 30px;
  border: none;
}

.modal-footer button:hover {
  background-color: var(--c-hover-strong);
}
</style>
