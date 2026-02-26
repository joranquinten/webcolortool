<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="title--web">Web</span>
        <span class="title--color">Color</span>
        <span class="title--tool">Tool</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        variant="flat"
        href="https://github.com/joranquinten/webcolortool"
        target="_blank"
      >
        <span class="mr-2">github</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <color-tool />
    </v-main>
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
    ColorTool,
  },
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

a {
  color: #ff79c6;

  :hover,
  :focus {
    color: #50fa7b;
  }
  &:active {
    color: #bd93f9;
  }

  &:visited {
    color: #ff92df;
  }
}
</style>
<style lang="scss" scoped>
.title--web {
  color: #ff79c6;
}
.title--color {
  color: #50fa7b;
}
.title--tool {
  color: #bd93f9;
  font-weight: 600;
}
</style>
