import demoAction from "./demoAction";
const initState = { demoAction: {} };
export default function demoReducer(state=initState,action ){
    switch (action.type) {
        case demoAction.GET_POST_SUCCESS:
            return {
                demoAction: action
            }
        case demoAction.GET_POST_FAIL:
            return {
                demoAction: action
            }
        case demoAction.FACK_ACTION:
            return {
                demoAction: action
            }
        case demoAction.GET_USERS_SUCCESS:
            return {
                demoAction: action
            }
        case demoAction.GET_USERS_FAIL:
            return {
                demoAction: action
            }
        default:
            return state;
    }
}