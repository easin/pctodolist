import { queryPage,save } from '@/services/task';
import _ from "lodash";

export default {
  namespace: 'task',

  state: {
      todayTaskPage: {pageNo:1,pageSize:10,list:[]},
      weekTaskPage: {pageNo:1,pageSize:10,list:[]},
      archiveTaskPage: {pageNo:1,pageSize:10,list:[]},
      isFinished:0,// 0未完成,1已完成，-1所有
      isArchived:-1,// 0未归档,1归档，-1所有
      keyword:''
  },

  effects: {
      *fetchTodayTaskList({ payload }, { call, put }) {
          // payload.isArchived=0
          const result = yield call(queryPage,payload);
          if(result.success)
          {

              result.object.cate=0;
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
              result.object.cate=1;
              yield put({
                  type: 'appendTaskPage',
                  payload: result.object,
              });
          }

      },
      *fetchArchiveTaskList({ payload }, { call, put }) {
          const result = yield call(queryPage,payload);
          if(result.success)
          {
              result.object.cate=-1;
              yield put({
                  type: 'appendTaskPage',
                  payload: result.object,
              });
          }

      },
      *save({ payload }, { call }) {
          const result = yield call(save,payload);
          if(result.success)
          {
            console.log('保存成功')
          }

      },
      *toggleFinished({ payload }, { put }) {
          yield put({
              type: 'toggleFinishedState',
              payload,
          });

      },
      *toggleArchived({ payload }, { put }) {
          yield put({
              type: 'toggleArchivedState',
              payload,
          });
      },
      *keywordChange({ payload }, { put }) {
          yield put({
              type: 'keywordChangeState',
              payload,
          });
      },
  },

  reducers: {
      appendTaskPage(state, action) {
          const {cate}=action.payload;
          delete action.payload.cate;

          if(action.payload.pageNo <2)
          {
              switch(cate)
              {
                  case 0:return {...state,todayTaskPage: action.payload};
                  case 1:return {...state,weekTaskPage: action.payload};
                  default: return {...state,archiveTaskPage: action.payload};
              }
          }
          else {
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
          }


    },toggleFinishedState(state, action) {
          console.log(action.payload)
          return {...state,isFinished: parseInt(action.payload.isFinished)};
      },toggleArchivedState(state, action) {
          console.log(action.payload)
          return {...state,isArchived: parseInt(action.payload.isArchived)};
      },keywordChangeState(state, action) {
          console.log(action.payload)
          return {...state,keyword: action.payload.keyword};
      },
  },
};
