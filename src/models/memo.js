import { queryProjectNotice } from '@/services/api';

export default {
  namespace: 'memo',

  state: {
    memoPage: [],
  },

  effects: {
    *fetchMemoList(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveMemoPage',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
      saveMemoPage(state, action) {
      return {
        ...state,
          memoPage: action.payload,
      };
    },
  },
};
