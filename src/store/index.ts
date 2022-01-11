import configureStore from './configureStore';

const { store, history, persist } = configureStore();

export { history, persist };
export default store;

