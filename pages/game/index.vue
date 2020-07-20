<template lang="pug">
  .container
    .game__direction
      p.game__title Kamu bosnya!
      p Baca kartu ini dan tekan Mulai. Setelah semua memainkan kartu, pilih kartu favoritmu!
    .game__play
      Card(
        isQuestion=true
        content="Pada tahun 2020, Raja Majapahit ter-isekai menjadi seorang ________"
      )
      .game__buttons
        Button(
          type="button"
          isPrimary=true
          isGhost=true
        ) Ganti kartu
        Button(
          type="button"
          isPrimary=true
        ) Mulai
</template>

<script>
import Button from '~/components/UI/Button.vue';
import Card from '~/components/game/Card.vue';

export default {
  components: {
    Button,
    Card,
  },
};
</script>

<style lang="scss">
.game__direction {
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
