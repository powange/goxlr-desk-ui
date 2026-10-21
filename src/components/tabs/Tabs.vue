<template>
  <!-- Vertical: a side bar of sections, with a header slot above the active section -->
  <div v-if="vertical" class="tabs-vertical">
    <nav class="side" :aria-label="tabListLabel">
      <slot name="nav-top"></slot>
      <!-- The nav carries the name. Group titles are read as the description of their tabs (a
           tablist may only contain tabs). -->
      <div class="tab-list-vertical" role="tablist" aria-orientation="vertical">
        <template v-for="(tab, index) in tabs" :key="tab.id">
          <div v-if="tab.group && !tab.hidden && tab.group !== groupBefore(index)" :id="groupId(tab.group)"
               class="group-label" aria-hidden="true">{{ tab.group }}</div>
          <button :class="{ active: tab.isActive }" v-show="!tab.hidden" @click="selectTab(tab)" role="tab"
                  :id="tabId(tab)" :aria-controls="panelId" :aria-describedby="tab.group ? groupId(tab.group) : undefined"
                  :aria-selected="tab.isActive" :tabindex="tab.isActive ? 0 : -1" @keydown="onTabKeydown" :ref="tab.name">
            <font-awesome-icon v-if="tab.icon" :icon="tab.icon" class="tab-icon" fixed-width/>
            <span>{{ tab.name }}</span>
          </button>
        </template>
      </div>
      <slot name="nav-bottom"></slot>
    </nav>
    <div class="main-column">
      <slot name="header"></slot>
      <div class="tabs-details-vertical" role="tabpanel" :id="panelId" :aria-labelledby="tabId(getActiveTab())">
        <slot></slot>
      </div>
    </div>
  </div>

  <div v-else style="margin-left: 8px; margin-right: 8px;">
    <div class="tab" role="tablist" :aria-label="tabListLabel">
      <button v-for="tab in tabs" :key="tab.name"
        :class="{ active: tab.isActive }" v-show="!tab.hidden" @click="selectTab(tab)" role="tab"
        :id="tabId(tab)" :aria-controls="panelId"
        :aria-selected="tab.isActive" :tabindex="tab.isActive ? 0 : -1" @keydown="onTabKeydown" :ref="tab.name">
        {{ tab.name }}
      </button>
    </div>
    <div class="tabs-details" role="tabpanel" :id="panelId" :aria-labelledby="tabId(getActiveTab())">
      <slot></slot>
    </div>
  </div>
</template>

<script>
let counter = 0;

export default {
  emits: ["on-change"],
  name: "TabList",

  data() {
    return { tabs: [], uid: `tabs-${++counter}` };
  },
  computed: {
    tabListLabel() {
      return this.label || this.$t('message.common.tabList');
    },
    panelId() {
      return `${this.uid}-panel`;
    },
  },
  props: {
    label: {
      type: String,
      required: false,
      default: "Tab list",
    },
    // Renders the tabs as a side bar (with nav-top, nav-bottom and header slots)
    vertical: {type: Boolean, default: false},
    // Ctrl+Shift+1..9 select the visible tabs in order
    shortcuts: {type: Boolean, default: false},
  },

  created() {
    window.addEventListener("keydown", this.onTabKeydownGlobal)
  },
  unmounted() {
    window.removeEventListener("keydown", this.onTabKeydownGlobal)
  },
  methods: {
    selectTab(selectedTab) {
      let activeTab = this.tabs.find((tab) => tab.isActive);
      this.tabs.forEach((tab) => {
        tab.isActive = tab.id === selectedTab.id;
      });
      let newActive = this.tabs.find((tab) => tab.isActive);

      if (activeTab !== newActive) {
        // Make sure we mount the tab before we call an update..
        this.$nextTick(() => this.$emit("on-change", selectedTab));
      }
    },

    // This function is generally for external calls, to set directly by id.
    selectTabById(id) {
      let tab = this.tabs.find((tab) => tab.id === id);
      this.selectTab(tab);
    },

    getActiveTab() {
      //return the active tab
      const activeTab = this.tabs.find((tab) => tab.isActive);
      if (activeTab) {
        return activeTab;
      } else {
        return "";
      }
    },
    //keyboard navigation
    onTabKeydown(event) {
      const tabs = this.tabs.filter(tab => !tab.hidden);
      const activeTab = this.getActiveTab();
      const activeTabIndex = tabs.indexOf(activeTab);
      let nextTab;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          nextTab = tabs[(activeTabIndex + 1) % tabs.length];
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          nextTab = tabs[(activeTabIndex - 1 + tabs.length) % tabs.length];
          break;
        case "Home":
          nextTab = tabs[0];
          break;
        case "End":
          nextTab = tabs[tabs.length - 1];
          break;
        default:
          break;
      }


      if (nextTab) {
        this.selectTab(nextTab);
        //nextTab.$el is the button element
        //we need a ref on the button element to focus it
        this.$refs[nextTab.name][0].focus();
      }
    },
    tabId(tab) {
      return tab ? `${this.uid}-tab-${tab.id}` : undefined;
    },

    groupId(group) {
      return `${this.uid}-group-${group.replace(/\W+/g, "-")}`;
    },

    // The group of the closest visible tab before this one, to only label a group once.
    groupBefore(index) {
      for (let i = index - 1; i >= 0; i--) {
        if (!this.tabs[i].hidden) return this.tabs[i].group;
      }
      return undefined;
    },

    onTabKeydownGlobal(event) {
      if (!this.shortcuts) return;
      const tabs = this.tabs.filter(tab => !tab.hidden);
      // const activeTab = this.getActiveTab();
      // const activeTabIndex = tabs.indexOf(activeTab);
      let nextTab;
      if (event.shiftKey && event.ctrlKey) {
        // Shift(Number) have different symbol between US keyboard and Other language.
        switch (event.code) {
          case "Digit1":
          case "Digit2":
          case "Digit3":
          case "Digit4":
          case "Digit5":
          case "Digit6":
          case "Digit7":
          case "Digit8":
          case "Digit9":
            nextTab = tabs[Number(event.code[5]) - 1];
            break;
          default:
            break;
        }
      }

      if (nextTab) {
        this.selectTab(nextTab);
        //nextTab.$el is the button element
        //we need a ref on the button element to focus it
        this.$refs[nextTab.name][0].focus();
      }
    },
  },
  mounted() {
    this.$emit("on-change", this.getActiveTab());
  }
};
</script>

<style>
/* Horizontal tabs */
.tab {
  border-bottom: 1px solid var(--c-line);
  text-align: left;
  display: flex;
  gap: 4px;
}

.tab button {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  outline: none;
  cursor: pointer;
  padding: 10px 18px;
  margin-bottom: -1px;
  color: var(--c-muted);
  font-weight: 500;
  white-space: nowrap;
}

.tab button:hover:not(.active) {
  color: var(--c-text);
}

.tab button.active {
  color: var(--c-text);
  border-bottom-color: var(--c-accent);
}

.tab button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: -2px;
}

.tabs-details {
  padding: 0;
  margin: 0;
  overflow: auto;
  vertical-align: middle;
}

/* Vertical tabs: the application shell */
.tabs-vertical {
  display: grid;
  grid-template-columns: 212px minmax(0, 1fr);
  min-height: 100vh;
}

.tabs-vertical .side {
  position: sticky;
  top: 0;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 10px;
  background-color: var(--c-panel);
  border-right: 1px solid var(--c-line);
  overflow-y: auto;
}

.tab-list-vertical {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tab-list-vertical .group-label {
  font-family: var(--f-mono);
  font-size: 10px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--c-muted);
  padding: 14px 10px 4px;
}

.tab-list-vertical button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--c-muted);
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}

.tab-list-vertical button .tab-icon {
  font-size: 14px;
}

.tab-list-vertical button:hover:not(.active) {
  background-color: var(--c-raised);
  color: var(--c-text);
}

.tab-list-vertical button.active {
  background-color: var(--c-raised-2);
  color: var(--c-text);
  box-shadow: inset 3px 0 0 var(--c-accent);
}

.tab-list-vertical button:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: -2px;
}

.tabs-vertical .main-column {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tabs-details-vertical {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
}
</style>
