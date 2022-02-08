import {render, screen} from '@testing-library/react';
import Header from '../screens/header/index';
import '@testing-library/jest-dom/extend-expect'

describe('Header markup testing', () => {
    test('Render header text', () => {
        render( <Header title="Header"/> );
        const header = screen.getByText("Videos Streaming - Header")
        expect(header).toBeInTheDocument()
    });
    
    test('Render header role', () => {
        render( <Header title="Header"/> );
        const header = screen.getByTestId("header");
        expect(header).toContainHTML("<span>Videos Streaming - Header</span>")
    });
});

