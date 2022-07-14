import { configureStore }       from '@reduxjs/toolkit';
import dataReducer              from './dataReducer';
import { loadState, saveState } from './localStorage';
export const store = configureStore({
    reducer: {
        getData: dataReducer,
    },
    preloadedState: loadState(),
});
store.subscribe(() => {
    saveState(store.getState());
});