import { queryPage } from '@/services/task';

export default {
  namespace: 'task',

  state: {
    taskPage: {pageNo:1,pageSize:10,list:[]},
  },

  effects: {
    *fetchTaskList({ payload }, { call, put }) {
      const result = yield call(queryPage,payload);
      if(result.success)
      {
          yield put({
              type: 'appendTaskPage',
              payload: result.object,
          });
      }

    },
  },

  reducers: {
      appendTaskPage(state, action) {
      return {
        ...state,
          taskPage: action.payload,
      };
    },
  },
};
