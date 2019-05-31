let initState={
    list:[],
    loading:false
}




function TeacherReducer(state=initState,action){
    switch(action.type){
        case "":
            return{
                ...state
            }

        default:
            return state;

    }
}

export default TeacherReducer;