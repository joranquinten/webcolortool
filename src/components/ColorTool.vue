<template>
  <div class="colortool">
    <div class="colors-input">
      <div class="instruction">
        <p>Paste a ; or separated list of colors to start tooling!</p>
      </div>
      <v-textarea
        autofocus
        background-color="#BD93F9"
        outline
        auto-grow
        rows="1"
        name="colorsInput"
        browser-autocomplete="false"
        label="Paste your colors here"
        v-model="colorInput"
        persistent-hint
        hint="Only hexadecimal values are supported at the moment."
        @change="formatInput($event)"
      ></v-textarea>
    </div>
    <div v-if="colorListObject">
      <ul class="color-list">
        <li
          v-for="(color, index) in colorListObject"
          :key="index"
          :class="{ dark: color.isDark }"
          :style="{ backgroundColor: color.hex }"
        >
          <dl>
            <dt>HEX</dt>
            <dd
              flat
              small
              v-clipboard:success="onCopy"
              v-clipboard:copy="color.hex"
              class="clickable"
            >{{ color.hex }}</dd>
            <dt>RGB</dt>
            <dd
              v-clipboard:success="onCopy"
              v-clipboard:copy="color.rgb"
              class="clickable"
            >{{ color.rgb }}</dd>
            <dt>HSL</dt>
            <dd
              v-clipboard:success="onCopy"
              v-clipboard:copy="color.hsl"
              class="clickable"
            >{{ color.hsl }}</dd>
          </dl>
        </li>
      </ul>
      <v-snackbar v-model="snackbarVisible" :timeout="4000" top>
        {{ snackbarText }}
        <v-btn color="#FF79C6" flat @click="snackbarVisible = false">Close</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Color from "color";

const isValidColor = color => {
  const isHexadecimal = str => /^#[0-9a-fA-F]+$/.test(str);
  return isHexadecimal(color);
};

export default {
  name: "ColorTool",
  data: function() {
    return {
      colorInput:
        "#282A36; #F8F8F2; #44475A; #6272A4; #8BE9FD; #50FA7B; #FFB86C; #FF79C6; #BD93F9; #FF5555; #F1FA8C; #21222C; #FF5555; #50FA7B; #F1FA8C; #BD93F9; #FF79C6; #8BE9FD; #F8F8F2; #6272A4; #FF6E6E; #69FF94; #FFFFA5; #D6ACFF; #FF92DF; #A4FFFF; #FFFFFF; #E9F284; #8BE9FE; #44475A; #424450; #FFFFFF; #44475A; #424450; #343746; #21222C; #191A21;",
      snackbarVisible: false,
      snackbarText: ""
    };
  },
  methods: {
    formatInput: function(value) {
      const formattedValue = value.replace(/\n/g, " ");

      this.colorInput = formattedValue;
    },
    onCopy: function(e) {
      this.snackbarVisible = true;
      this.snackbarText = `You copied: "${e.text}" to the clipboard`;
    }
  },
  computed: {
    colorListObject: function() {
      return this.colorInput
        .replace(/\s+/g, "")
        .split(";")
        .reduce((colors, item) => {
          if (item !== "" && isValidColor(item)) {
            const color = Color(item);

            const round = (value, precision) =>
              Number(Math.round(value + "e" + precision) + "e-" + precision);

            const formatNumbericValues = (hsl, precision) =>
              hsl.color.map(value => round(value, precision));

            const hslFormatted = (hsl = [], precision = 1) => {
              const niceNumbers = formatNumbericValues(hsl, precision);
              return `hsl(${niceNumbers[0]}%, ${niceNumbers[1]}%, ${
                niceNumbers[2]
              }%)`;
            };

            return [
              ...colors,
              {
                original: item,
                hex: color.hex(),
                rgb: color.rgb().string(),
                hsl: hslFormatted(color.hsl(), 1),
                isDark: color.isDark()
              }
            ];
          } else {
            return colors;
          }
        }, []);
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

.color-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;

  li {
    width: 18em;
    height: 9em;
    color: #282a36;
    border: 1px solid #fff;
    padding: 1em;
    font-size: 0.725em;
    transition: all 0.08s ease-in-out;
    flex-grow: 1;

    &:hover {
      transform: scale(1.1, 1.1);
      box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    }

    &.dark {
      color: #fff;
      border-color: #6272a4;
    }

    dl {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      width: 24em;
      overflow: visible;

      dt {
        flex: 0 0 15%;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      dd {
        flex: 0 0 85%;
        margin-left: auto;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
