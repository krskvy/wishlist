<template>
  <div class="add-wish container">
    <form class="add-wish__form flex w-full"
          @submit.prevent="addWish">
      <button class="add-wish__button bg-cyan-400 rounded-md px-2 py-1 text-white">
        Add wish
      </button>
      <input  type="text"
              class="add-wish__input px-2 py-1 text-cyan-600 focus:border-b-blue-400"
              v-model="newWish">
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newWish: '',
    };
  },

  methods: {
    ...mapActions({
      addWishToStore: 'wishes/addWish',
    }),

    addWish() {
      if (this.newWish.trim()) {
        this.addWishToStore({id: Date.now(), name: this.newWish.trim()});
        this.newWish = ''; // Clear input field
      }
    },
  }
};
</script>