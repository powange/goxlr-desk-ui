<template>
  <GoXLR/>
</template>

<script>
import GoXLR from "@/components/GoXLR.vue";

export default {
  name: 'App',
  components: {
    GoXLR,
  },
}
</script>

<style>
body {
  background-color: var(--c-bg);
  color: var(--c-text);
  padding: 0;
  margin: 0;
}

@font-face {
  src: url('./assets/LeagueMono-NarrowRegular.ttf');
  font-family:'LeagueMonoCondensed';
  font-style: normal;
  font-stretch: 1% 500%; /* Required by Chrome */
}

@font-face {
  src: url('./assets/LeagueMono.ttf');
  font-family:'LeagueMono';
  font-style: normal;
  font-stretch: 1% 500%; /* Required by Chrome */
}

#app {
  font-family: var(--f-body);

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--c-text);
}

/* Text can be selected (serial numbers, versions, errors to paste in a help request), the
   controls can't, so dragging them doesn't select the page. */
button, [role="slider"], [role="switch"], [role="tab"], svg, input[type="range"] {
  user-select: none;
}

button, input, select, textarea {
  font-family: var(--f-body);
}
</style>
