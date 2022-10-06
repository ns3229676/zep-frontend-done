const initialstate = {
    user : null
}

const userReducer = (state=initialstate,action)=>{

    
    switch(action.type){
        case "ADD_USER" : {
            return{
                ...state,
                user : action.user
            }

        }

        case "REMOVE_USER" : {
            return{
                ...state,
                user : action.user
            }

        }

        default: return initialstate
    }

}

export default userReducer;