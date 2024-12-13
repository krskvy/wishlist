export default function localStoragePlugin(store) {
  const savedState = JSON.parse(localStorage.getItem('vuex'));
  if (savedState) {
    store.replaceState({ ...store.state, ...savedState });
  }

  store.subscribe((mutation, state) => {
    localStorage.setItem('vuex', JSON.stringify(state));
  });
}