import { all } from "redux-saga/effects";
import demoSagas from "./demo_redux/demoSaga"
export default function* rootSaga(getState) {
  yield all([ demoSagas() ]);
}
