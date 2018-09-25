import axios from 'axios';
import { message } from 'antd';
import { baseUrl } from '@/config/env';
import store from 'store';
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

let hide = null;
const ajax = async ({ url, params, waitting, error }) => {
  if (waitting) {
    // 自定义请求等待状态
    waitting();
  } else {
    hide = message.loading('加载中..', 0);
  }

  try {
    const user = store.get('react__antd_admin_template_user');
    if (user) axios.defaults.headers['token'] = user.token;
    const { data: res } = await axios.post(baseUrl + url, params);
    // const { data: res } = await axios.get(baseUrl + url, {
    //   params
    // });

    if (res.success) {
      // 成功返回
      if (!waitting) hide();
      return res.data || res;
    }

    if (!waitting) hide();

    if (error) {
      await error(res);
    } else {
      message.error(res.errorMessage);
    }

    return false;
  } catch (err) {
    console.log(err, 'err axios');
    hide && hide();
    message.error(JSON.stringify(err) || '连接失败');
  }
};

export default ajax;
