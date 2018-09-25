import { combineReducers } from 'redux';

import { reducer as commonReducer } from './common';
import { reducer as sidebarReducer } from '@/layouts/SideBar/store';
import { reducer as aabReducer } from '@/pages/AAB/store';

const reducer = combineReducers({
  common: commonReducer,
  sidebar: sidebarReducer,
  aab: aabReducer
});

export default reducer;
