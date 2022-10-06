import { createStore } from "redux";
import rootStore from "./glovalstatereducer/reducer";

const store = createStore(rootStore);

export default store;