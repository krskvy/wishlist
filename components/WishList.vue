<template>
 	<ul class="wish-list container">
		<WishListItem v-for="wish in wishes"
									:key="wish.id"
									@remove="removeWishFromStoreList(wish.id)"
									@edit="editWishinStoreList"
									:wish="wish"/>
	</ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      wishes: 'wishes/getWishes',
    }),
  },

  methods: {
    ...mapActions({
      removeWishFromStoreList: 'wishes/removeWish',
			editWishinStoreList: 'wishes/editWish',
    }),
  }
};
</script>