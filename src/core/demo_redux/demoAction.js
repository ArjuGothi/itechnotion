const demoAction = {
    GET_POST:"GET_POST",
    GET_POST_SUCCESS:"GET_POST_SUCCESS",
    GET_POST_FAIL:"GET_POST_FAIL",
    
    GET_USERS:"GET_USERS",
    GET_USERS_SUCCESS:"GET_USERS_SUCCES",
    GET_USERS_FAIL:"GET_USERS_FAIL",

    POST_DETAILS:"POST_DETAILS",
    POST_DETAILS_SUCCESS:"POST_DETAILS_SUCCESS",
    POST_DETAILS_FAIL:"POST_DETAILS_FAIL",

    FETCH_ERROR:"FETCH_ERROR",
    FACK_ACTION:"FACK_ACTION",
    getPostAction : () => ({
        type:demoAction.GET_POST
    }),
    getUsersAction : () => ({
        type:demoAction.GET_USERS
    }),
    feckAction:()=>({
        type:demoAction.FACK_ACTION,
    })
}
export default demoAction;