<template>
  <div class="color-renderer">{{ colorList }}</div>
</template>

<script>
export default {
  name: "ColorRenderer",
  props: {
    colors: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    colorList: () => {
      console.log(this);
      return this.colors.split(";");
    }
  }
};
</script>

<style lang="scss" scoped></style>
