<template>
  <div class="colortool">
    <div class="colors-input">
      <div class="instruction">
        <p>
          Paste a ; or separated list of colors to generate the colored tiles!
        </p>
      </div>
      <v-textarea
        autofocus
        background-color="#BD93F9"
        variant="outlined"
        auto-grow
        rows="1"
        name="colorsInput"
        autocomplete="false"
        label="Paste your colors here"
        v-model="colorInput"
        persistent-hint
        hint="Supported formats: rgb, rgba, hexadecimal, hexadicimal with alpha, color names"
        @change="formatInput($event)"
        @focus="$event.target.select()"
      ></v-textarea>
    </div>
    <div v-if="colorListObject">
      <v-row align="center" justify="space-between">
        <v-col cols="6" class="pa-2">
          <v-select
            :items="sortByProperties"
            v-model="sortBy"
            label="Order by"
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="6" class="pa-2">
          <v-select
            :items="sortOrderProperties"
            v-model="sortOrder"
            label="Direction"
            variant="outlined"
          ></v-select>
        </v-col>
      </v-row>

      <color-list :colors="colorListObject" pa-2></color-list>
    </div>
  </div>
</template>

<script>
import ColorList from "./ColorList";

import { formatInput, transformColorList } from "../helpers/color";

const SORT = {
  DIRECTION: {
    ASC: "ASC",
    DESC: "DESC"
  }
};

export default {
  name: "ColorTool",
  components: {
    ColorList
  },
  data: function() {
    return {
      colorInput:
        "#282A36; #F8F8F2; #44475A; #6272A4; #8BE9FD; #50FA7B; #FFB86C; #FF79C6; #BD93F9; #FF5555; #F1FA8C; #21222C; #FF5555; #50FA7B; #F1FA8C; #BD93F9; #FF79C6; #8BE9FD; #F8F8F2; #6272A4; #FF6E6E; #69FF94; #FFFFA5; #D6ACFF; #FF92DF; #A4FFFF; #FFFFFF; #E9F284; #8BE9FE; #44475A; #424450; #FFFFFF; #44475A; #424450; #343746; #21222C; #191A21;",
      sortBy: null,
      sortOrder: SORT.DIRECTION.ASC,
      sortByProperties: [
        { title: "Hex value", value: "color" },
        { title: "Luminosity", value: "luminosity" },
        { title: "None", value: null }
      ],
      sortOrderProperties: [
        { title: "Ascending", value: SORT.DIRECTION.ASC },
        { title: "Descending", value: SORT.DIRECTION.DESC }
      ]
    };
  },
  methods: {
    formatInput: function(value) {
      this.colorInput = formatInput(value);
    }
  },
  computed: {
    colorListObject: function() {
      return transformColorList(this.colorInput).sort((a, b) => {
        if (this.sortBy) {
          return this.sortOrder === SORT.DIRECTION.ASC
            ? a.sortProps[this.sortBy] - b.sortProps[this.sortBy]
            : b.sortProps[this.sortBy] - a.sortProps[this.sortBy];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.colortool {
  margin: 1em;
}
.colors-input {
  max-width: 600px;
  margin: 0 auto 1em;
}
</style>
