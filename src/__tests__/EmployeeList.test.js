import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import EmployeeList from '../pages/employee-list/EmployeeList';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Employee list page', () => {
    test('Renders employee page without errors', () => {
        renderWithProviders(<EmployeeList />);
        const text = screen.getByText(/Current Employee/);
        expect(text).toBeInTheDocument();
    });
    test('Shows employee data in table', () => {
        renderWithProviders(<EmployeeList />);

        const data = screen.getByText(/Mayer/);

        expect(data).toBeInTheDocument();
    });
    test('Input search working', async () => {
        renderWithProviders(<EmployeeList />)
        const input = screen.getByTestId('search-input');
        expect(input).toBeInTheDocument();
        fireEvent.change(input, {target: {value: 'Frusciante'}});
        expect(input.value).toBe('Frusciante');
        const table = screen.getByTestId('table');
        expect(table).toBeInTheDocument();
        expect(table.tBodies).toHaveLength(1);
    });
    test('Sorting elements', async() => {
        renderWithProviders(<EmployeeList />);
        // eslint-disable-next-line testing-library/no-node-access
        const header = screen.getByText(/Last Name/).closest('th');
        expect(header).toBeInTheDocument();
        const beforeSort = screen.getByTestId('table').rows[1].textContent;
        expect(beforeSort).toContain('Mayer');
        await act(async () => await userEvent.click(header));
        const afterSort = screen.getByTestId('table').rows[1].textContent;
        expect(afterSort).toContain('Frusciante');
    });
});
