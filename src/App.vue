<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Webcolortool</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/joranquinten/webcolortool"
        target="_blank"
      >
        <span class="mr-2">sourcecode</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <color-tool />
    </v-content>
  </v-app>
</template>

<script>
import ColorTool from "./components/ColorTool";

export default {
  name: "App",
  components: {
    ColorTool
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss">
.clickable {
  cursor: pointer;
}
</style>
