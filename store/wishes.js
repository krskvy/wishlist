export const state = () => ({
  wishes: [],
});

export const mutations = {
  ADD_WISH(state, {id, name}) {
    state.wishes.push({id, name});
  },
	REMOVE_WISH(state, id) {
		state.wishes = state.wishes.filter(wish => wish.id !== id);
	},
  EDIT_WISH(state, {id, newValue, imageUrl}) {
    state.wishes = state.wishes.map(wish =>
      wish.id === id ? { ...wish, name: newValue, image: imageUrl} : wish
    );
  },
};

export const actions = {
  addWish({ commit }, wish) {
    commit('ADD_WISH', wish);
  },
	removeWish({commit}, index){
		commit('REMOVE_WISH', index);
	},
  editWish({commit}, {id, newValue, imageUrl}) {
    commit('EDIT_WISH', {id, newValue,imageUrl})
  },
};

export const getters = {
  getWishes: (state) => state.wishes,
};
