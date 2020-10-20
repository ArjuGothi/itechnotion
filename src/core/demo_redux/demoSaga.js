import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import demoAction from "./demoAction";
import { getPosts,getUsers } from "./demoService";

export function* getPostSaga() {
    yield takeEvery(demoAction.GET_POST,function*(){
        try {
            const response = yield call(getPosts);
            const data = yield call(response.json.bind(response));
            if(data){
                yield put({
                    type:demoAction.GET_POST_SUCCESS,
                    data:data
                })
            }   
            
        }
        catch(error){
            yield put({
                type:demoAction.FETCH_ERROR,
                status:false,
                message:"Something went wrong..!"
            });
        }
    })
}
export function* getUsersSaga() {
    yield takeEvery(demoAction.GET_USERS,function*(){
        try {
            const response = yield call(getUsers);
            const data = yield call(response.json.bind(response));
            console.log(data)
            if(data){
                yield put({
                    type:demoAction.GET_USERS_SUCCESS,
                    data:data
                })
            }   
            
        }
        catch(error){
            yield put({
                type:demoAction.GET_USERS_FAIL,
                status:false,
                message:"Something went wrong..!"
            });
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(getPostSaga),
        fork(getUsersSaga)
    ])
}