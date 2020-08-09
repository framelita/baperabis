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
import Button from '~/components/UI/Button.vue';
import Card from '~/components/game/Card.vue';

import Questions from '~/assets/data/questions.json';

export default {
  components: {
    Button,
    Card,
  },
  data() {
    return {
      questions: Questions,
      selectedQuestion: {},
    };
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    setAllUnused() {
      this.questions.forEach((q) => {
        q.hasBeenUsed = false;
      });
    },
    setQuestionUsed(id) {
      const usedQuestion = this.questions.find((q) => q.id === id);
      if (usedQuestion) usedQuestion.hasBeenUsed = true;
    },
    getQuestion() {
      const unusedQuestions = this.questions.filter((q) => !q.hasBeenUsed);
      if (unusedQuestions.length === 0) {
        this.setAllUnused();
        this.getQuestion();
        return;
      }
      const totalQuestions = unusedQuestions.length;

      const max = totalQuestions - 1;
      const min = 0;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;

      const selectedQuestion = unusedQuestions[rand];
      this.setQuestionUsed(selectedQuestion.id);

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
