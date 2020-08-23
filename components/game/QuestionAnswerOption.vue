<template lang="pug">
.game__play
  GameCard(
    isQuestion=true
    :content="selectedQuestion.text"
  )
  .game__buttons
    Button(
      type="button"
      isPrimary=true
      isGhost=true
      @click="getQuestion"
    ) Ganti kartu
    Button(
      type="button"
      isPrimary=true
      @click="startGame"
    ) Mulai
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { randomInt } from '~/assets/scripts/utilities';

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
      questions: [],
      selectedQuestion: {},
    };
  },
  computed: {
    ...mapGetters(['getQuestions']),
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    ...mapMutations(['useQuestion']),
    setAllUnskipped() {
      this.questions.forEach((q) => {
        q.hasBeenSkipped = false;
      });
    },
    setQuestionSkipped(id) {
      const skippedQuestion = this.questions.find((q) => q.id === id);
      if (skippedQuestion) skippedQuestion.hasBeenSkipped = true;
    },
    getQuestion() {
      // when a user choose to skip this question,
      // remember it for this round so that they won't keep seeing same question
      this.questions = this.getQuestions;
      const unskippedQuestions = this.questions.filter(
        (q) => !q.hasBeenSkipped
      );
      if (unskippedQuestions.length === 0) {
        this.setAllUnskipped();
        this.getQuestion();
        return;
      }
      const totalQuestions = unskippedQuestions.length;

      const max = totalQuestions - 1;
      const min = 0;
      const rand = randomInt(min, max);

      const selectedQuestion = unskippedQuestions[rand];
      this.setQuestionSkipped(selectedQuestion.id);

      this.$set(this, 'selectedQuestion', selectedQuestion);
    },
    startGame() {
      this.$emit('selected', this.selectedQuestion);
    },
  },
};
</script>
