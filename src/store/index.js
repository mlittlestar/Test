import StudentReducer from './StudentReducer';
import {combineReducers,createStore} from 'redux';
import MemoReducer from './MemoReducer'; 
import TeacherReducer from './TeacherReducer';


// 合并reducers
let rootReducer = combineReducers({
    studentState:StudentReducer,
    memoState:MemoReducer,
    teacherState:TeacherReducer
  })

  // 创建仓库并且暴露给外部
export default createStore(rootReducer)