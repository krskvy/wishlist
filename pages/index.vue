<template>
  <div>
    <AddWish/>
    <WishList/>
  </div>
</template>

<script lang="ts">
import AddWish from '../components/AddWish.vue';
import WishList from '../components/WishList.vue';

export default {
  components: {
    AddWish,
    WishList
  },
};
</script>
