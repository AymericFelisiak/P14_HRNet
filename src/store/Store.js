import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./EmployeeSlice";

// Redux store containing the state.

const store = configureStore({
    reducer:{
        employees: employeeReducer,
    }
});

export default store;