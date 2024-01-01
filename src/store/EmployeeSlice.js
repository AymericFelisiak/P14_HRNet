import { createSlice } from '@reduxjs/toolkit';
import EmployeesList from '../data/EmployeesList.json';

/**
 * Slice and reducers for the redux store.
 * Only stores in redux for now and the data has no persistence.
 * If an API is added later, will need changes :
 * - Adding asyncThunk fetching the data at the endpoint
 * - Same for updating the database when adding an employee
 */

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
