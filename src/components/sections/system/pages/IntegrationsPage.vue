<template>
  <!-- How other software (Stream Deck, OBS, scripts) drives the utility: the HTTP API, with
       examples ready to copy for this device -->
  <section class="integrations">
    <h2 class="title">{{ $t('message.integrations.title') }}</h2>
    <p class="intro">{{ $t('message.integrations.intro') }}</p>

    <dl class="endpoints">
      <dt>{{ $t('message.integrations.commandUrl') }}</dt>
      <dd><code>POST {{ baseUrl() }}api/command</code></dd>
      <dt>{{ $t('message.integrations.statusUrl') }}</dt>
      <dd><code>GET {{ baseUrl() }}api/get-devices</code></dd>
      <dt>{{ $t('message.integrations.websocketUrl') }}</dt>
      <dd><code>{{ websocketUrl() }}</code></dd>
    </dl>
    <p class="note">{{ $t('message.integrations.format') }}</p>

    <h3>{{ $t('message.integrations.examples') }}</h3>
    <div v-for="example in examples()" :key="example.label" class="example">
      <div class="example-head">
        <span>{{ example.label }}</span>
        <AppButton variant="link" @click="copy(example.curl)">
          {{ copied === example.curl ? $t('message.system.networkAccess.copied') : $t('message.integrations.copyCurl') }}
        </AppButton>
        <AppButton variant="link" @click="copy(example.json)">
          {{ copied === example.json ? $t('message.system.networkAccess.copied') : $t('message.integrations.copyJson') }}
        </AppButton>
      </div>
      <pre><code>{{ example.curl }}</code></pre>
    </div>
    <p class="note">{{ $t('message.integrations.more') }}</p>

    <!-- Any control as an API command: record, move it, copy -->
    <h3>{{ $t('message.integrations.recordTitle') }}</h3>
    <p class="note">{{ $t('message.integrations.recordIntro') }}</p>
    <div class="record">
      <label class="record-toggle">
        <input type="checkbox" v-model="recorder.enabled"/>
        <span>{{ $t('message.integrations.record') }}</span>
      </label>
      <AppButton v-if="recorder.commands.length" variant="link" @click="clearCommands()">
        {{ $t('message.integrations.clear') }}
      </AppButton>
    </div>
    <p v-if="recorder.enabled && !recorder.commands.length" class="note" aria-live="polite">
      {{ $t('message.integrations.recordEmpty') }}
    </p>
    <div v-for="(entry, index) in recorder.commands" :key="index + entry.json" class="example">
      <div class="example-head">
        <span>{{ entry.name }}</span>
        <AppButton variant="link" @click="copy(curl(entry.json))">
          {{ copied === curl(entry.json) ? $t('message.system.networkAccess.copied') : $t('message.integrations.copyCurl') }}
        </AppButton>
        <AppButton variant="link" @click="copy(entry.json)">
          {{ copied === entry.json ? $t('message.system.networkAccess.copied') : $t('message.integrations.copyJson') }}
        </AppButton>
      </div>
      <pre><code>{{ entry.json }}</code></pre>
    </div>

    <h3>{{ $t('message.integrations.schemaTitle') }}</h3>
    <p class="note">{{ $t('message.integrations.schemaIntro') }}</p>
    <dl class="endpoints">
      <dt>{{ $t('message.integrations.schemaUrl') }}</dt>
      <dd><a :href="baseUrl() + 'api/schema'" target="_blank" rel="noopener"><code>GET {{ baseUrl() }}api/schema</code></a></dd>
    </dl>
  </section>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";
import {store} from "@/store";
import {apiRecorder, clearApiCommands} from "@/util/apiRecorder";

export default {
  name: "IntegrationsPage",
  components: {AppButton},
  props: {inline: {type: Boolean, default: true}},

  data() {
    return {copied: undefined, recorder: apiRecorder};
  },

  methods: {
    baseUrl() {
      return `${window.location.protocol}//${window.location.host}/`;
    },

    websocketUrl() {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      return `${protocol}//${window.location.host}/api/websocket`;
    },

    // A few useful commands for this device, as curl and as the JSON body
    examples() {
      const serial = store.getActiveSerial();
      const device = store.getActiveDevice();
      const list = [
        {label: this.$t('message.integrations.exampleMicMute'), command: {SetCoughMuteState: "MutedToX"}},
        {label: this.$t('message.integrations.exampleVolume'), command: {SetVolume: ["Music", 128]}},
        {label: this.$t('message.integrations.exampleProfile', {name: device.profile_name}), command: {LoadProfile: [device.profile_name, true]}},
      ];
      for (const name of Object.keys(device.scenes || {})) {
        list.push({label: this.$t('message.integrations.exampleScene', {name}), command: {RunScene: name}});
      }
      return list.map(({label, command}) => {
        const json = JSON.stringify({Command: [serial, command]});
        return {label, json, curl: this.curl(json)};
      });
    },

    curl(json) {
      const body = json.replace(/'/g, "'\\''");
      return `curl -X POST -H "Content-Type: application/json" -d '${body}' ${this.baseUrl()}api/command`;
    },

    clearCommands() {
      clearApiCommands();
    },

    copy(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.copied = text;
        setTimeout(() => {
          if (this.copied === text) this.copied = undefined;
        }, 2000);
      }).catch(() => store.addToast("error", this.$t('message.integrations.copyFailed')));
    },
  },
}
</script>

<style scoped>
.integrations {
  display: grid;
  gap: 12px;
  padding: 4px 0;
  color: var(--c-text);
  user-select: text;
}

.title {
  margin: 0;
  font-family: var(--f-title);
  font-weight: normal;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-size: 18px;
}

h3 {
  margin: 8px 0 0;
  font-size: 14px;
}

.intro, .note {
  margin: 0;
  color: var(--c-text-soft);
  font-size: 13px;
  max-width: 70ch;
}

.endpoints {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 6px 14px;
  margin: 0;
  font-size: 13px;
}

.endpoints dt {
  color: var(--c-muted);
}

.endpoints dd {
  margin: 0;
  overflow-wrap: anywhere;
}

code {
  font-family: var(--f-mono);
  font-size: 12px;
}

.example {
  border: 1px solid var(--c-line);
  border-radius: 8px;
  background-color: var(--c-raised);
  padding: 8px 12px;
}

.example-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
  font-size: 13px;
  font-weight: 600;
}

.example-head > span {
  flex: 1;
}

.record {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  font-size: 13px;
}

.record-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

a {
  color: inherit;
}

pre {
  margin: 6px 0 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: var(--c-text-soft);
}
</style>
