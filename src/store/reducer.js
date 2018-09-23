import { combineReducers } from 'redux';

import { reducer as commonReducer } from './common';
import { reducer as sidebarReducer } from '@/layouts/SideBar/store';

const reducer = combineReducers({
  common: commonReducer,
  sidebar: sidebarReducer
});

export default reducer;
