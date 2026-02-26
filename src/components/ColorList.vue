<template>
  <v-container class="pa-2">
    <ul class="color-list">
      <li
        v-for="(color, index) in colors"
        :key="index"
        :class="{ dark: color.isDark }"
        :style="{ backgroundColor: color.hex }"
      >
        <dl>
          <dt>HEX</dt>
          <dd
            @click="copyToClipboard(color.hex)"
            class="clickable"
          >
            {{ color.hex }}
          </dd>
          <dt>RGB</dt>
          <dd
            @click="copyToClipboard(color.rgb)"
            class="clickable"
          >
            {{ color.rgb }}
          </dd>
          <dt>HSL</dt>
          <dd
            @click="copyToClipboard(color.hsl)"
            class="clickable"
          >
            {{ color.hsl }}
          </dd>
        </dl>
      </li>
    </ul>

    <v-snackbar v-model="snackbarVisible" :timeout="4000" location="bottom">
      {{ snackbarText }}
      <v-btn color="#FF79C6" variant="flat" @click="snackbarVisible = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import useClipboard from "vue-clipboard3";

export default {
  name: "colorList",

  data: function() {
    return {
      snackbarVisible: false,
      snackbarText: ""
    };
  },
  props: {
    colors: {
      type: Array,
      validator: value => {
        if (value.length === 0) return true;
        if (value.length > 0 && Array.isArray(value)) {
          let isValid;
          value.forEach(element => {
            if (
              Object.hasOwn(element, "isDark") &&
              (element.isDark === false || element.isDark === true) &&
              Object.hasOwn(element, "hex") &&
              Object.hasOwn(element, "rgb") &&
              Object.hasOwn(element, "hsl")
            )
              isValid = true;
          });
          return isValid || false;
        }
      },
      required: true
    }
  },
  methods: {
    async copyToClipboard(text) {
      const { toClipboard } = useClipboard();
      try {
        await toClipboard(text);
        this.snackbarVisible = true;
        this.snackbarText = `You copied: "${text}" to the clipboard`;
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.color-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;

  &:last-of-type:after {
    content: "";
    flex-grow: 100;
  }

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
