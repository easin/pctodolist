import { list } from '@/services/memo';

export default {
  namespace: 'memo',

  state: {
    memoPage: {pageNo:1,pageSize:10,list:[]},
  },

  effects: {
    *fetchMemoList({ payload }, { call, put }) {
      const result = yield call(list,payload);
      if(result.success)
      {
          yield put({
              type: 'appendMemoPage',
              payload: result.object,
          });
      }

    },
  },

  reducers: {
      appendMemoPage(state, action) {
      return {
        ...state,
          memoPage: action.payload,
      };
    },
  },
};
