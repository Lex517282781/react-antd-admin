import { ajax } from '@/utils';

const Service = {};

[
  {
    fn: 'getTable',
    url: '/getTable.do'
  },
  {
    fn: 'updateTableCell',
    url: '/updateTableCell.do'
  },
  {
    fn: 'login',
    url: '/login.do'
  },
  {
    fn: 'logout',
    url: '/logout.do'
  }
].forEach(({ fn, url }) => {
  Service[fn] = ({ params, waitting, error } = {}) =>
    ajax({
      url,
      params,
      waitting,
      error
    });
});

export default Service;
