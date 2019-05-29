import _ from 'lodash';

let initState={
    list:["hello","tom"],
    loading:false
}

// action generator
export function delMemo(payload){
    return {
      type:"DEL_MEMO",
      payload
    }
  }
  export function saveMemo(payload){
    return {
      type:"SAVE_MEMO",
      payload
    }
  }

function MemoReducer(state=initState,action){
    switch(action.type){
        case "DEL_MEMO":
            _.remove(state.list,item=>item===action.payload)
            return {
                ...state,
                list:state.list
            };
            case "SAVE_MEMO":
            return {
                ...state,
                list:[...state.list,action.payload]
            };
            default:
        return state;
    }

}

export default MemoReducer;