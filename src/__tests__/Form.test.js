import { screen } from '@testing-library/react';
import Form from '../components/form/Form';
import { renderWithProviders } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import Home from '../pages/home/Home';
import { act } from 'react-dom/test-utils';

describe('Form page', () => {
    test('Renders without errors', () => {
        renderWithProviders(<Form />);
        const text = screen.getByText(/First Name/);
        expect(text).toBeInTheDocument();
    });

    describe('I click the save button', () => {
        test('Adds employee', async () => {
            const { store } = renderWithProviders(<Home />);
            const button = screen.getByText(/Save/);
            expect(button).toBeInTheDocument();
            await act(async () => await userEvent.click(button));
            const employees = store.getState().employees.user;
            expect(employees).toHaveLength(3);
        });
        test('Shows modal window', async () => {
            renderWithProviders(<Home />);
            const button = screen.getByText(/Save/);
            expect(button).toBeInTheDocument();
            await act(async () => await userEvent.click(button));
            const modal = screen.getByText(/Employee Created!/);
            expect(modal).toBeInTheDocument();
        });
    });
});
