import { createSlice } from '@reduxjs/toolkit';
import EmployeesList from '../data/EmployeesList.json';

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        user: EmployeesList,
        isLoading: false,
        isError: false
    },
    reducers: {
        addEmployee(state, action) {
            state.user = [...state.user, action.payload];
        }
    }
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
