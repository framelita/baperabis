<template lang="pug">
  .container
    .game__instruction
      p.game__title(v-html="title")
      p(v-html="text")
    QuestionOption(
      v-if="isBoss && isQuestionTurn"
      @selected="sendQuestion"
    )
    AnswerOption(
      v-if="!isBoss && isAnswerTurn"
      :question="selectedQuestion"
    )
    QuestionAnswerOption(
      v-if="isQuestionAnswerTurn"
    )
</template>

<script>
import { mapActions } from 'vuex';

import Button from '~/components/UI/Button.vue';
import QuestionOption from '~/components/game/QuestionOption.vue';
import AnswerOption from '~/components/game/AnswerOption.vue';
import QuestionAnswerOption from '~/components/game/QuestionAnswerOption.vue';

export default {
  components: {
    Button,
    QuestionOption,
    AnswerOption,
    QuestionAnswerOption,
  },
  data() {
    return {
      selectedQuestion: {},
      step: 1,
      isBoss: true,
    };
  },
  computed: {
    // isBoss() {
    //   return true;
    // },
    isQuestionTurn() {
      return this.step === 1;
    },
    isAnswerTurn() {
      return this.step === 2;
    },
    isQuestionAnswerTurn() {
      return this.step === 3;
    },
    title() {
      if (this.isBoss && this.isQuestionTurn) {
        return 'Kamu bosnya!';
      } else if (this.isQuestionTurn) {
        return 'Giliran bos';
      }

      if (this.isBoss && this.isAnswerTurn) {
        return 'Giliran anak buah';
      } else if (this.isAnswerTurn) {
        return 'Pilih kartu';
      }

      return 'Pilih kartu';
    },
    text() {
      if (this.isBoss && this.isQuestionTurn) {
        return 'Baca kartu ini dan tekan Mulai. Setelah semua memainkan kartu, pilih kartu favoritmu.';
      } else if (this.isQuestionTurn) {
        return 'Tunggu bos memilih dan membaca kartu.';
      }

      if (this.isBoss && this.isAnswerTurn) {
        return 'Tunggu mereka memilih kartu.';
      } else if (this.isAnswerTurn) {
        return 'Pilih kartu yang kira-kira bos bakal suka.';
      }

      return '';
    },
  },
  mounted() {
    const { id } = this.$route;
    // if there is no id,
    // create one
    if (id) {
      this.getGameRoom(id);
    } else {
      this.generateGameRoom();
    }
  },
  methods: {
    ...mapActions(['getGameRoom']),
    generateGameRoom() {
      console.log('test');
    },
    sendQuestion(question) {
      // tell everyone the selected question
      this.$set(this, 'selectedQuestion', question);
      this.step = 2;
      this.isBoss = false; // for testing
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
