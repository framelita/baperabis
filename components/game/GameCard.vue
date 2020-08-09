<template lang="pug">
  button.card(
    type="button"
    @click="$emit('click', { isQuestion, id })"
    :class="{'card--question': isQuestion}"
  ) {{ content }}
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
      required: true,
    },
    isQuestion: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 5px;
  border: 1px solid $blue1;
  display: inline-flex;
  line-height: 1.4;
  max-width: 230px;
  min-height: 300px;
  padding: 15px;
  text-align: left;
  width: 100%;

  &:focus {
    outline-color: $blue2;
  }
}

.card--question {
  background: $blue1;
  color: #fff;
}
</style>
