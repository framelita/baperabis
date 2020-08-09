<template lang="pug">
  .container
    .game__instruction
      p.game__title Kamu bosnya!
      p Baca kartu ini dan tekan Mulai. Setelah semua memainkan kartu, pilih kartu favoritmu!
    .game__play
      Card(
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
        ) Mulai
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Button from '~/components/UI/Button.vue';
import Card from '~/components/game/Card.vue';

export default {
  components: {
    Button,
    Card,
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
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;

      const selectedQuestion = unskippedQuestions[rand];
      this.setQuestionSkipped(selectedQuestion.id);

      this.$set(this, 'selectedQuestion', selectedQuestion);
    },
  },
};
</script>

<style lang="scss">
.game__instruction {
  width: 100%;
  max-width: 300px;
}

.game__title {
  font-size: 1.25em;
  font-weight: bold;
}

.game__play {
  text-align: center;
  margin: 50px auto;
}

.game__buttons {
  padding: 10px;

  .btn {
    margin: 0 5px;
    min-width: 100px;
  }
}
</style>
