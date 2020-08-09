<template lang="pug">
  .container
    .game__instruction
      p.game__title(v-html="title")
      p(v-html="text")
    QuestionOption(
      v-if="isBoss && isQuestionTurn"
    )
</template>

<script>
import { mapActions } from 'vuex';

import Button from '~/components/UI/Button.vue';
import QuestionOption from '~/components/game/QuestionOption.vue';

export default {
  components: {
    Button,
    QuestionOption,
  },
  computed: {
    isBoss() {
      return true;
    },
    isQuestionTurn() {
      return true;
    },
    title() {
      if (this.isBoss && this.isQuestionTurn) {
        return 'Kamu bosnya!';
      } else if (this.isQuestionTurn) {
        return 'Giliran bos';
      }
      return 'Pilih kartu';
    },
    text() {
      if (this.isBoss && this.isQuestionTurn) {
        return 'Baca kartu ini dan tekan Mulai. Setelah semua memainkan kartu, pilih kartu favoritmu.';
      } else if (this.isQuestionTurn) {
        return 'Tunggu bos memilih dan membaca kartu.';
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
