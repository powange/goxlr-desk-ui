// Shared logic (data, methods) of the former Faders page, used by the components
// that replaced it. It has no template of its own.
import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { driverMix2, driverPreVOD, driverVOD, firmwareSupportsMix2, isDeviceMini, isStreamNoMusic, isWindowsDriver, versionNewerOrEqualTo } from "@/util/util";

export default {
  /**
   * Everything here focuses around the 'Channel' input,
   */


  data() {
    return {
      activeChannel: "A",
    }
  },

  methods: {
    getFaderOptions() {
      return [
        { id: "A", label: this.$t('message.faders.A') },
        { id: "B", label: this.$t('message.faders.B') },
        { id: "C", label: this.$t('message.faders.C') },
        { id: "D", label: this.$t('message.faders.D') }
      ];
    },

    getSourceOptions() {
      return [
        { id: "Mic", label: this.$t('message.channels.Mic') },
        { id: "Chat", label: this.$t('message.channels.Chat') },
        { id: "Music", label: this.$t('message.channels.Music') },
        { id: "Game", label: this.$t('message.channels.Game') },
        { id: "Console", label: this.$t('message.channels.Console') },
        { id: "LineIn", label: this.$t('message.channels.LineIn') },
        { id: "System", label: this.$t('message.channels.System') },
        { id: "Sample", label: this.$t('message.channels.Sample') },
        { id: "Headphones", label: this.$t('message.channels.Headphones') },
        { id: "LineOut", label: this.$t('message.channels.LineOut') }
      ];
    },

    getMuteBehaviours() {
      let behaviours = [];
      behaviours.push({ id: "All", label: this.$t('message.configuration.mute_behaviour.all') });
      behaviours.push({ id: "ToStream", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.getNameForChannel("BroadcastMix") })});

      // This one is going to depend on the Firmware AND the driver...
      if (firmwareSupportsMix2()) {
        let channelName = `${this.$t('message.channels.StreamMix1')} + 2`;

        if (!isWindowsDriver() || !driverPreVOD()) {
          if (driverVOD()) channelName = `${this.$t('message.channels.StreamMix')} + ${this.$t('message.channels.VOD')}`;

          behaviours.push({ id: "ToStream2", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.getNameForChannel("StreamMix2") })});
          behaviours.push({ id: "ToStreams", label: this.$t('message.configuration.mute_behaviour.base', { channel: channelName })});
        }
      }

      behaviours.push({ id: "ToVoiceChat", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.$t('message.channels.ChatMic') })});
      behaviours.push({ id: "ToPhones", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.$t('message.channels.Headphones') })});
      behaviours.push({ id: "ToLineOut", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.$t('message.channels.LineOut') })});
      
      return behaviours;
    },

    channelChanged: function (id) {
      this.activeChannel = id;
    },

    sourceChanged: function (channelName) {
      let serial = store.getActiveSerial();
      let fader = this.activeChannel;

      let command = {
        "SetFader": [fader, channelName]
      }

      websocket.send_command(serial, command);
      store.getActiveDevice().fader_status[this.activeChannel].channel = channelName;

      if (this.isMuteFunctionDisabled(this.getActiveMuteBehaviour())) {
        this.muteFunctionChanged("All")
      }
    },

    muteFunctionChanged(mute_function) {
      let serial = store.getActiveSerial();
      let fader = this.activeChannel;

      // Check the make sure this combination is allowed..
      // Build the Command..
      let command = {
        "SetFaderMuteFunction": [
          fader,
          mute_function
        ]
      }

      websocket.send_command(serial, command);
    },

    updateDisabledMuteFunctions(source, behaviours) {
      for (let mute_option of behaviours) {
        if (source === "Chat" && mute_option.id === "ToVoiceChat") {
          mute_option.disabled = true;
          continue;
        }

        if ((source === "Headphones" || source === "LineOut") && (mute_option.id !== "All")) {
          mute_option.disabled = true;
          continue;
        }
        mute_option.disabled = false;
      }
      return behaviours;
    },

    isMuteFunctionDisabled: function (muteFunction) {
      // According to the GoXLR UI, The Voice Chat mute button can't mute to voice chat..
      if (this.getActiveSource() === "Chat") {
        if (muteFunction === "ToVoiceChat") {
          return true;
        }
      }

      // The Headphone and Line Out channels can only mute to 'All'.
      if (this.getActiveSource() === "Headphones" || this.getActiveSource() === "LineOut") {
        if (muteFunction !== "All") {
          return true;
        }
      }
    },

    getActiveSource: function () {
      return store.getActiveDevice().fader_status[this.activeChannel].channel;
    },

    getActiveMuteBehaviour: function () {
      let mute_type = store.getActiveDevice().fader_status[this.activeChannel].mute_type;

      if (isDeviceMini() && isStreamNoMusic() && mute_type === "ToStreams") {
        return "ToStream";
      }
      return mute_type;
    },

    getMuteBehaviour: function () {
      return this.updateDisabledMuteFunctions(this.getActiveSource(), this.getMuteBehaviours());
    },
    getActiveChannelName: function () {
      return this.getFaderOptions().find((option) => option.id === this.activeChannel).label;
    },

    getNameForChannel(name) {
      if (name === "StreamMix2") {
        let vod = this.$t('message.channels.VOD');
        let mix2 = this.$t('message.channels.StreamMix2');

        if (isWindowsDriver() && driverVOD()) return vod;
        return mix2;
      }

      if (name === "BroadcastMix") {
        let streamMix = this.$t('message.channels.StreamMix');
        let streamMix1 = this.$t('message.channels.StreamMix1');

        if (firmwareSupportsMix2()) {
          if (isWindowsDriver() && !driverMix2()) return streamMix;
          return streamMix1;
        }

        return streamMix;
      }
    },
  },
}
