<template lang="pug">
.game__play
  GameCard(
    isQuestion=true
    :content="question.text"
  )
  .game__answers
    GameCard(
      v-for="answer in answers"
      :key="answer.id"
      :id="answer.id",
      :content="answer.text"
      :selectedAnswer="selectedAnswer"
      @click="selectAnswer"
    )
  .game__buttons
    Button(
      type="button"
      isPrimary=true
      :disabled="isDisabled"
      @click="submitAnswer"
    ) Pilih kartu
</template>

<script>
import Answers from '~/assets/data/answers.json';

import Button from '~/components/UI/Button.vue';
import GameCard from '~/components/game/GameCard.vue';

export default {
  components: {
    Button,
    GameCard,
  },
  props: {
    question: { type: Object, default: () => {} },
  },
  data() {
    return {
      selectedAnswer: {},
      answers: Answers,
    };
  },
  computed: {
    isDisabled() {
      return !this.selectedAnswer.text;
    },
  },
  mounted() {},
  methods: {
    selectAnswer(id) {
      this.$set(
        this,
        'selectedAnswer',
        this.answers.find((a) => a.id === id)
      );
      this.$emit('select', this.selectedAnswer);
    },
    submitAnswer() {
      // send this.selectedAnswer
    },
  },
};
</script>
