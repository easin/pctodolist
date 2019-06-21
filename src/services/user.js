import request from '@/utils/request';
import { stringify } from 'qs';

export async function query() {
  return request('/api/users');
}

//  let formData = new FormData();
//  formData.append('c','login');
//  formData.append('username', this.state.userName);
//  formData.append('password', this.state.passWord);
//  formData.append('client', 'android');
//
//  fetch(url,{
//     method: 'post',
//     body: formData,
// }).then(function (res) {
//     return res.json();
// }).then(function (json) {
//     if (json.code == "200") {
//         console.log("232323233-----正确")
//     }else if (json.code == "400") {
//         console.log("2323232323------错了～")
//     }
// })
//
//  作者：走走婷婷1215
//  链接：https://www.jianshu.com/p/5a33458e4a84
//  來源：简书
//  简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
//  fetch("api/xxx", {
//     body: "email=test@example.com&password=pw",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//     },
//     method: "post",
// }

export async function queryCurrent() {
  return request('/api/user/currentUser');
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
