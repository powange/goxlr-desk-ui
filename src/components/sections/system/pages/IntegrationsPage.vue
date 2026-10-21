<template>
  <!-- How other software (Stream Deck, OBS, scripts) drives the utility: the HTTP API, with
       examples ready to copy for this device -->
  <section class="integrations settings-page" aria-labelledby="integrations-title">
    <div>
      <h2 id="integrations-title" class="title">{{ $t('message.integrations.title') }}</h2>
      <p class="page-intro">{{ $t('message.integrations.intro') }}</p>
    </div>

    <!-- Access from other devices on the network (Stream Deck on another PC, a phone..) -->
    <SettingsCard :title="$t('message.integrations.networkTitle')">
      <BooleanSetting :label="$t('message.system.pages.integrations.allowNetwork')" :enabled="allowNetworkAccess()" restart
                      :help="$t('message.system.pages.integrations.allowNetworkHelp')"
                      @change="setAllowNetworkAccess"
                      :description="$t('message.system.settings.allowNetworkAccessAccessibility')"/>
      <div v-if="allowNetworkAccess()" class="card-body">
        <NetworkAccessLinks :key="String(allowNetworkAccess())"/>
      </div>
    </SettingsCard>

    <SettingsCard :title="$t('message.system.pages.integrations.api')">
      <dl class="endpoints">
        <div><dt>{{ $t('message.integrations.commandUrl') }}</dt><dd><code><span class="method">POST</span>{{ baseUrl() }}api/command</code></dd></div>
        <div><dt>{{ $t('message.integrations.statusUrl') }}</dt><dd><code><span class="method">GET</span>{{ baseUrl() }}api/get-devices</code></dd></div>
        <div><dt>{{ $t('message.integrations.websocketUrl') }}</dt><dd><code><span class="method">WS</span>{{ websocketUrl() }}</code></dd></div>
        <div><dt>{{ $t('message.integrations.schemaUrl') }}</dt><dd><a :href="baseUrl() + 'api/schema'" target="_blank" rel="noopener"><code><span class="method">GET</span>{{ baseUrl() }}api/schema</code></a></dd></div>
      </dl>
      <p class="card-note">{{ $t('message.integrations.format') }} {{ $t('message.integrations.schemaIntro') }}</p>
    </SettingsCard>

    <SettingsCard :title="$t('message.integrations.examples')">
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
        <pre><code>{{ example.json }}</code></pre>
      </div>
      <p class="card-note">{{ $t('message.integrations.more') }}</p>
    </SettingsCard>

    <!-- Any control as an API command: record, move it, copy -->
    <SettingsCard :title="$t('message.integrations.recordTitle')">
      <SettingRow :label="$t('message.integrations.record')" :help="$t('message.integrations.recordIntro')">
        <AppButton v-if="recorder.commands.length" variant="link" @click="clearCommands()">
          {{ $t('message.integrations.clear') }}
        </AppButton>
        <Toggle v-model="recorder.enabled" :label="$t('message.integrations.record')"/>
      </SettingRow>
      <p v-if="recorder.enabled && !recorder.commands.length" class="card-note" aria-live="polite">
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
    </SettingsCard>
  </section>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";
import Toggle from "@/components/design/Toggle.vue";
import BooleanSetting from "@/components/sections/system/modals/settings/BooleanSetting.vue";
import NetworkAccessLinks from "@/components/sections/system/NetworkAccessLinks.vue";
import SettingsCard from "@/components/sections/system/settings/SettingsCard.vue";
import SettingRow from "@/components/sections/system/settings/SettingRow.vue";
import {store} from "@/store";
import {apiRecorder, clearApiCommands} from "@/util/apiRecorder";
import {websocket} from "@/util/sockets";

export default {
  name: "IntegrationsPage",
  components: {AppButton, Toggle, BooleanSetting, NetworkAccessLinks, SettingsCard, SettingRow},
  props: {inline: {type: Boolean, default: true}},

  data() {
    return {copied: undefined, recorder: apiRecorder};
  },

  methods: {
    allowNetworkAccess() {
      const config = store.getConfig();
      return config !== undefined && config.allow_network_access;
    },

    setAllowNetworkAccess(value) {
      websocket.send_daemon_command({"SetAllowNetworkAccess": value});
    },

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
  color: var(--c-text);
  user-select: text;
}

.title {
  margin: 0 0 6px;
  font-family: var(--f-title);
  font-weight: normal;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-size: 18px;
}

.card-body {
  padding: 4px 20px 16px;
}

.card-note {
  margin: 0;
  padding: 12px 20px 16px;
  color: var(--c-muted);
  font-size: 12.5px;
}

code {
  font-family: var(--f-mono);
  font-size: 12.5px;
}

.endpoints {
  margin: 0;
}

.endpoints div {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  padding: 11px 20px;
  border-top: 1px solid var(--c-line);
}

.endpoints div:first-child {
  border-top: none;
}

.endpoints dt {
  width: 200px;
  flex: none;
  color: var(--c-muted);
}

.endpoints dd {
  flex: 1 1 260px;
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.endpoints a {
  color: var(--c-text);
}

.method {
  display: inline-block;
  width: 44px;
  color: var(--c-accent);
}

.example {
  padding: 12px 20px;
}

.example-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
  font-size: 13px;
  font-weight: 500;
}

.example-head > span {
  flex: 1;
}

pre {
  margin: 8px 0 0;
  padding: 10px 12px;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-bg);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: var(--c-text-soft);
}
</style>
