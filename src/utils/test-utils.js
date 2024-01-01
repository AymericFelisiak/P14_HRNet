import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        user: [],
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
      // Automatically create a store instance if no store was passed in
      store = configureStore({ reducer: { employees: employeeSlice.reducer }, preloadedState }),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
  }