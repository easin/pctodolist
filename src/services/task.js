import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryPage(params) {
  return request('/api/task/page',{
    method:'POST',
    body:stringify(params),
  });
}

export async function save(params) {
    return request('/api/task/save',{
        method:'POST',
        body:stringify(params),
    });
}

export async function listTags(params) {
    return request('/api/tag/list',{
        method:'POST',
        body:stringify(params),
    });
}

export async function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: stringify(params),
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     // 'Content-Type': 'multipart/form-data'
    // },
  });
}
