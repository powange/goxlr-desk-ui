<template>
  <!-- The Mute (cough) button of the device: mutes the microphone to its configured target. In
       Hold mode the device's button has to be held, so it can't be switched from here. -->
  <AppButton :variant="isMuted() ? 'danger' : 'secondary'" class="mic-mute" :disabled="!isToggle()"
             :aria-pressed="isMuted()" @click="toggle"
             :title="isToggle() ? $t('message.micMute.hint') : $t('message.micMute.holdMode')">
    <font-awesome-icon :icon="isMuted() ? 'fa-solid fa-microphone-slash' : 'fa-solid fa-microphone-lines'"/>
    <span>{{ isMuted() ? $t('message.micMute.muted') : $t('message.micMute.mute') }}</span>
  </AppButton>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "MicMuteButton",
  components: {AppButton},

  methods: {
    cough() {
      return store.getActiveDevice().cough_button;
    },

    isToggle() {
      return this.cough().is_toggle;
    },

    isMuted() {
      return this.cough().state !== "Unmuted";
    },

    toggle() {
      const state = this.isMuted() ? "Unmuted" : "MutedToX";
      websocket.send_command(store.getActiveSerial(), {SetCoughMuteState: state});
    },
  },
}
</script>
