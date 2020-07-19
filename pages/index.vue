<template lang="pug">
  .container
    Header
    main
      .login
        input(
          type="text"
          placeholder="Masukan kode game"
        )
        p atau
        button.button(
          type="button"
          @click="createNewGame"
        ) Buat game baru
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header,
  },
}
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

.login {
  margin: 30px 0;
  max-width: 300px;
}

input[type='text'] {
  @apply shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}

.button {
  @apply bg-blue-500 text-white rounded font-bold py-2 px-4 rounded;
}
</style>
