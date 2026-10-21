<template>
  <div class="network-access" role="region" :aria-label="$t('message.system.networkAccess.title')">
    <p v-if="!access.enabled" class="hint">{{ $t('message.system.networkAccess.restart') }}</p>
    <template v-else>
      <p class="hint">{{ $t('message.system.networkAccess.explain') }}</p>
      <ul class="links">
        <li v-for="url in access.urls" :key="url">
          <code>{{ url }}</code>
          <button type="button" class="small" @click="copy(url)">{{ copied === url ? $t('message.system.networkAccess.copied') : $t('message.system.networkAccess.copy') }}</button>
        </li>
      </ul>
      <p v-if="access.urls.length === 0" class="hint">{{ $t('message.system.networkAccess.noAddress') }}</p>
      <button type="button" class="small" @click="regenerate">{{ $t('message.system.networkAccess.regenerate') }}</button>
    </template>
  </div>
</template>

<script>
import {websocket} from "@/util/sockets";

// The links to open on other devices when network access is on. They carry the access token
// the daemon asks other machines for.
export default {
  name: "NetworkAccessLinks",

  data() {
    return {
      access: {enabled: false, urls: []},
      copied: undefined,
    }
  },

  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      websocket.get_network_access()
          .then(result => this.access = result.NetworkAccess)
          .catch(() => this.access = {enabled: false, urls: []});
    },

    copy(url) {
      navigator.clipboard.writeText(url).then(() => {
        this.copied = url;
        setTimeout(() => this.copied = undefined, 2000);
      }).catch(() => {});
    },

    regenerate() {
      websocket.send_daemon_command("RegenerateNetworkToken").then(() => this.refresh());
    },
  }
}
</script>

<style scoped>
.network-access {
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  border-left: 3px solid var(--c-accent);
  background-color: var(--c-raised);
  color: var(--c-text);
}

.hint {
  margin: 0;
  font-size: 12px;
  color: var(--c-muted);
}

.links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.links li {
  display: flex;
  align-items: center;
  gap: 8px;
}

code {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: var(--f-mono);
  font-size: 12px;
  user-select: text;
}

.small {
  justify-self: start;
  padding: 4px 10px;
  border: 1px solid var(--c-line-strong);
  border-radius: 6px;
  background: transparent;
  color: var(--c-text);
  font-size: 12px;
  cursor: pointer;
}

.small:hover {
  border-color: var(--c-accent);
}
</style>
