import { stringify } from 'qs';
import request from '../utils/request';
import { GATEWAY_ADDRESS } from '../utils/msa';

export async function query(params) {
  return request(`${GATEWAY_ADDRESS}/api/users?${stringify(params)}`);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function authenticate(params) {
  return request(`${GATEWAY_ADDRESS}/api/authenticate`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
