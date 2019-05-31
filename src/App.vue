<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>WebColorTool</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/joranquinten/webcolortool"
        target="_blank"
      >
        <span class="mr-2">github</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <color-tool />
    </v-content>
    <v-footer dark height="auto">
      <v-card-text class="white--text">
        &copy; 2019 —
        <a href="https://joranquinten.nl/">Joran Quinten</a>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
import ColorTool from "./components/ColorTool";

export default {
  name: "App",
  components: {
    ColorTool
  }
};
</script>

<style lang="scss">
*::-moz-selection {
  color: #44475a;
  background-color: #f1fa8c;
}
*::selection {
  color: #44475a;
  background-color: #f1fa8c;
}

.clickable {
  cursor: pointer;
}
</style>
