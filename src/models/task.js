import { queryPage } from '@/services/task';
import _ from "lodash";

export default {
  namespace: 'task',

  state: {
      todayTaskPage: {pageNo:1,pageSize:10,list:[]},
      weekTaskPage: {pageNo:1,pageSize:10,list:[]},
      archiveTaskPage: {pageNo:1,pageSize:10,list:[]},
      todayLoading:false,
      weekLoading:false,
      archiveLoading:false,
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
      *fetchTodayTaskList({ payload }, { call, put }) {
          const result = yield call(queryPage,payload);
          if(result.success)
          {
              yield put({
                  type: 'appendTaskPage',
                  payload: result.object,
              });
          }

      },
      *fetchWeekTaskList({ payload }, { call, put }) {
          const result = yield call(queryPage,payload);
          if(result.success)
          {
              yield put({
                  type: 'appendTaskPage',
                  payload: result.object,
              });
          }

      },
      *fetchArchivTaskList({ payload }, { call, put }) {
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
          action.payload.list=_.concat(state.todayTaskPage.list, action.payload.list);

      return {
        ...state,
          todayTaskPage: JSON.parse(JSON.stringify(action.payload)),
      };
    },markTaskName(state, action) {
          const {todayTaskPage:{list}}=state;
          const idx=_.findIndex(list, { id:action.payload.id });
          if(idx>-1)
          {
              list[idx].taskName=action.payload.taskName;
              list[idx].edited=1;
              state.todayTaskPage.list=list;
          }

          return {
              ...state,
              todayTaskPage: JSON.parse(JSON.stringify(state.todayTaskPage)),
          };
      },
  },
};
