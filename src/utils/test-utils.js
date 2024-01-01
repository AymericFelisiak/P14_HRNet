import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

// Contains the mockStore and mockData used in the unit tests.

const employee = [
    {
        city: 'Alabama',
        'date-of-birth': '1977-10-16',
        department: 'Sales',
        'first-name': 'John',
        'last-name': 'Mayer',
        'start-date': '2023-11-29',
        state: 'CT',
        street: 'Random Street',
        'zip-code': '06604'
    },
    {
        city: 'Los Angeles',
        'date-of-birth': '1988-03-05',
        department: 'Marketing',
        'first-name': 'John',
        'last-name': 'Frusciante',
        'start-date': '2023-11-29',
        state: 'CA',
        street: 'Random Street',
        'zip-code': '06604'
    }
];

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        user: employee,
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

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        store = configureStore({
            reducer: { employees: employeeSlice.reducer },
            preloadedState
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
