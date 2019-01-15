import { queryPage } from '@/services/task';
import _ from "lodash";

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
      *markTaskName({ payload }, { call, put }) {
          const result = yield call(queryPage,payload);
          if(result.success)
          {
              yield put({
                  type: 'markTaskName',
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
    },markTaskName(state, action) {
          const {taskPage:{list}}=state;
          const idx=_.findIndex(list, { id:action.payload.id });
          if(idx>-1)
          {
              list[idx].taskName=action.payload.taskName;
              list[idx].edited=1;
              state.taskPage.list=list;
          }

          return {
              ...state,
              taskPage: JSON.parse(JSON.stringify(state.taskPage)),
          };
      },
  },
};
