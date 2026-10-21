<template>
  <div class="sampler-lighting">
    <section class="sect">
      <div class="sect-head">
        <h3>{{ $t('message.sampler.lighting.bank', { bank }) }}</h3>
        <AppButton variant="link" @click="applyToAll()">{{ $t('message.sampler.lighting.applyBanks') }}</AppButton>
      </div>
      <p class="note">{{ $t('message.sampler.lighting.note') }}</p>
      <ButtonLighting flat :active-colour="activeColor()" :inactive-colour="inactiveColor()" :off-style="selectedInactiveOption()"
                      :active-label="$t('message.lighting.sampler.active')"
                      @active-changed="onActiveColourChange" @inactive-changed="onInactiveColourChange"
                      @off-style-changed="onInactiveSelectionChange">
        <div class="row">
          <span class="row-label">{{ $t('message.lighting.sampler.empty') }}</span>
          <ColourPicker inline :title="$t('message.lighting.sampler.empty')" :color-value="emptyColor()"
                        @colour-changed="onEmptyColourChange"/>
        </div>
      </ButtonLighting>
    </section>
  </div>
</template>

<script>
import AppButton from "@/components/design/AppButton.vue";
import lightingSampler from "@/mixins/lightingSampler";
import ButtonLighting from "@/components/sections/lighting/elements/ButtonLighting.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

// The colours of a bank's sample buttons (the device sets them per bank, not per button), from the
// Lighting section's sampler settings.
export default {
  name: "SamplerLighting",
  extends: lightingSampler,
  components: {AppButton, ButtonLighting, ColourPicker},

  props: {
    bank: {type: String, required: true},   // A, B, C
  },

  watch: {
    bank: {
      immediate: true,
      handler(bank) {
        this.selectedButtonOption = "SamplerSelect" + bank;
      },
    },
  },
}
</script>

<style scoped>
.sampler-lighting {
  color: var(--c-text);
}

.sect {
  display: grid;
  gap: 10px;
  padding: 14px 18px;
}

.sect-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.sect-head h3 {
  margin: 0;
  font-family: var(--f-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--c-muted);
}

.note {
  margin: 0;
  font-size: 12px;
  color: var(--c-muted);
}




:deep(.row) {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

:deep(.row-label) {
  color: var(--c-muted);
  font-size: 12px;
}
</style>
