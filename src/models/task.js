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
      *fetchTodayTaskList({ payload }, { call, put }) {
          const result = yield call(queryPage,payload);
          if(result.success)
          {
              result.cate=0;
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
              result.cate=1;
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
              result.cate=-1;
              yield put({
                  type: 'appendTaskPage',
                  payload: result.object,
              });
          }

      },
  },

  reducers: {
      appendTaskPage(state, action) {
          const {cate}=action.payload;
          delete action.payload.cate;
          switch(cate)
          {
              case 0:action.payload.list=_.concat(state.todayTaskPage.list, action.payload.list);break;
              case 1:action.payload.list=_.concat(state.weekTaskPage.list, action.payload.list);break;
              default: action.payload.list=_.concat(state.archiveTaskPage.list, action.payload.list);break;
          }
          switch(cate)
          {
              case 0:return {...state,todayTaskPage: JSON.parse(JSON.stringify(action.payload))};
              case 1:return {...state,weekTaskPage: JSON.parse(JSON.stringify(action.payload))};
              default: return {...state,archiveTaskPage: JSON.parse(JSON.stringify(action.payload))};
          }

    },firstTaskPage(state, action) {
          const {cate}=action.payload;
          delete action.payload.cate;
          switch(cate)
          {
              case 0:return {...state,todayTaskPage: action.payload};
              case 1:return {...state,weekTaskPage: action.payload};
              default: return {...state,archiveTaskPage: action.payload};
          }
      },
  },
};
