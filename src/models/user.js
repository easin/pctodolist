import { query as queryUsers, queryCurrent, login } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { routerRedux } from 'dva/router';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      console.log(response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.success) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    changeLoginStatus(state, { payload }) {
      console.log(payload);
      if (payload.success) {
        setAuthority('admin');
        localStorage.setItem('user', JSON.stringify(payload.object));
        localStorage.setItem('userId', payload.object.userId);
        localStorage.setItem('token', payload.object.message);
      } else {
        // setAuthority('admin');
        // localStorage.setItem("user",JSON.stringify(payload.object));
        localStorage.setItem('userId', '-1');
        localStorage.setItem('token', '');
      }

      return {
        ...state,
        status: payload.success,
        type: payload.type,
      };
    },
  },
};
