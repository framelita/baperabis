<template lang="pug">
  .container
    main
      .login
        input(
          type="text"
          placeholder="Masukan kode game"
        )
        p atau
        Button(
          type="button"
          isPrimary=true
          isNuxt=true
          to="/game"
        ) Buat game baru
</template>

<script>
import Button from '~/components/UI/Button.vue';

export default {
  components: {
    Button,
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  padding: 0 30px;
}
</style>
