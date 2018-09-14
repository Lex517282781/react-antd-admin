import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import Page from './Page';
import store from './store';
import 'animate.css';
import './index.less';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
          <Component />
        </LocaleProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Page);

if (module.hot) {
  module.hot.accept(Page, () => {
    render(Page);
  });
}

registerServiceWorker();
