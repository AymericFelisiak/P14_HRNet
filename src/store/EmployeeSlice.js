import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        user: []
    },
    reducers: {
        addEmployee(state, action ){
            state.user = [...state.user, action.payload];
        }
    }
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;