import { visible } from "ansi-colors";

// reducer，用于将action与modal关联起来
//状态初始化
let initState={
    list:[],
    loading:false,
    visible:false
}
function StudentReducer(state=initState,action){
    switch(action.type){
        case "BIGIN_LOADING":
            state.loading=true;
        return state;
        case "RELOAD_STUTENT":
                state = {
                  list:action.payload
                }
                return state;
            case "GET_STUDENT":
              return state;
            default:
        return state;
    }

}

export default StudentReducer;