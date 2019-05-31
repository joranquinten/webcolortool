<template>
  <v-layout pa-2>
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
            v-clipboard:success="onCopy"
            v-clipboard:copy="color.hex"
            class="clickable"
          >
            {{ color.hex }}
          </dd>
          <dt>RGB</dt>
          <dd
            v-clipboard:success="onCopy"
            v-clipboard:copy="color.rgb"
            class="clickable"
          >
            {{ color.rgb }}
          </dd>
          <dt>HSL</dt>
          <dd
            v-clipboard:success="onCopy"
            v-clipboard:copy="color.hsl"
            class="clickable"
          >
            {{ color.hsl }}
          </dd>
        </dl>
      </li>
    </ul>

    <v-snackbar v-model="snackbarVisible" :timeout="4000" bottom>
      {{ snackbarText }}
      <v-btn color="#FF79C6" flat @click="snackbarVisible = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
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
              element.hasOwnProperty("isDark") &&
              (element.isDark === false || element.isDark === true) &&
              element.hasOwnProperty("hex") &&
              element.hasOwnProperty("rgb") &&
              element.hasOwnProperty("hsl")
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
    onCopy: function(e) {
      this.snackbarVisible = true;
      this.snackbarText = `You copied: "${e.text}" to the clipboard`;
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
