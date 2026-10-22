<template>
  <div>
    <BigButton v-if="!inline" id="license_button" ref="license_button" :title="$t('message.system.licenses')" @button-clicked="$refs.licenseModal.openModal(undefined, $refs.license_button)">
      <font-awesome-icon icon="fa-solid fa-book-open"/>
    </BigButton>
    <AccessibleModal :inline="inline" width="680px" ref="licenseModal" id="license_modal" :show_footer=false>
      <template v-slot:title>{{ $t('message.system.licenses') }}</template>
      <div class="settings-page">
        <p class="page-intro">{{ $t('message.system.pages.licences.intro') }}</p>
        <SettingsCard>
          <details v-for="(licence, index) in licences" :key="licence.name" class="licence" :open="index === 0">
            <summary>
              <span class="licence-name">{{ licence.name }}</span>
              <span class="licence-kind">{{ licence.kind }}</span>
              <font-awesome-icon icon="fa-solid fa-chevron-down" class="chevron" aria-hidden="true"/>
            </summary>
            <pre class="licence-text">{{ licence.text }}</pre>
          </details>
        </SettingsCard>
      </div>
    </AccessibleModal>
  </div>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import SettingsCard from "@/components/sections/system/settings/SettingsCard.vue";

const UTILITY_LICENCE = "Copyright (c) 2022 - 2024 Craig McLure, Nathan Adams (GoXLR Utility)\nCopyright (c) 2026 powange (GoXLR Desk)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.";

const MUSIC_TRIBE_LICENCE = "Copyright 2022 Music Tribe Brands CA Ltd.\n\nThis code and documentation contain information and intellectual property that\nis owned by MUSIC TRIBE. Permission is hereby granted to any person obtaining a\ncopy of this software and associated documentation files to use the information\nwithout restriction, including without limitation the rights to use, copy, modify,\nmerge, publish, distribute, sublicense, and to permit persons to whom the software\nand documentation is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.";

export default {
  props: {
    // Shows the content in place (System section) instead of a button opening a dialog
    inline: {type: Boolean, default: false},
  },
  name: "LicenseButton",
  components: {SettingsCard, BigButton, AccessibleModal},

  data() {
    return {
      setupTitle: "Licenses",
      licences: [
        {name: "GoXLR Desk (GoXLR Utility)", kind: "MIT", text: UTILITY_LICENCE},
        {name: "Music Tribe", kind: "Music Tribe", text: MUSIC_TRIBE_LICENCE},
      ],
    }
  }
}
</script>

<style scoped>
.licence + .licence {
  border-top: 1px solid var(--c-line);
}

.licence summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  cursor: pointer;
  list-style: none;
}

.licence summary::-webkit-details-marker {
  display: none;
}

.licence-name {
  flex: 1;
  font-weight: 500;
  color: var(--c-text);
}

.licence-kind {
  padding: 2px 8px;
  border-radius: 10px;
  background-color: var(--c-raised);
  color: var(--c-text-soft);
  font-size: 12px;
}

.chevron {
  color: var(--c-muted);
  transition: transform .15s;
}

.licence[open] .chevron {
  transform: rotate(180deg);
}

.licence-text {
  margin: 0 20px 16px;
  padding: 14px 16px;
  max-height: 320px;
  overflow: auto;
  border: 1px solid var(--c-line);
  border-radius: 6px;
  background-color: var(--c-bg);
  color: var(--c-text-soft);
  font-family: var(--f-mono);
  font-size: 12px;
  line-height: 1.55;
  white-space: pre-wrap;
}
</style>