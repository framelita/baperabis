<template lang="pug">
  button.card(
    type="button"
    :class="{'card--question': isQuestion, 'is-selected': selectedAnswer.id === id}"
    @click="$emit('click', id)"
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
    selectedAnswer: {
      type: Object,
      default: () => {
        return {
          id: -1,
        };
      },
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
  min-height: 200px;
  padding: 15px;
  text-align: left;
  width: 100%;
  margin: 8px;
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out,
    border 0.25s ease-in-out, color 0.25s ease-in-out;
  outline: 0;

  &:not(.card--question) {
    border-color: $lightGrey;
    color: $grey;

    &.is-selected,
    &:hover {
      transform: translateY(-8px);
      // box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
      box-shadow: 0 10px 9px rgba(10, 31, 68, 0.1),
        0 0 5px rgba(10, 31, 68, 0.08);
      border-color: $blue1;
      color: $dark;
    }
  }
}

.card--question {
  background: $blue1;
  color: #fff;
  min-height: 300px;
}
</style>
