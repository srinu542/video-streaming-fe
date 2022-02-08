import {render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import { rest, MockedResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import Uplaod from '../screens/upload/index';

const API_URL = process.env.APP_SERVER_BASE_URL || 'http://localhost:3030';

//Api server setup

const MockUploadComponent = () => {
    return (
        <BrowserRouter>
            <Uplaod/>
        </BrowserRouter>
    );
}
describe('Uplaod page view render testing', () => {
    test('should render header in upload', async () => {
        render(<MockUploadComponent/>)
        const heading = screen.getByTestId( 'header' );
        expect( heading ).toHaveTextContent( 'Videos Streaming - Upload' );
    })

    test('should render upload page link in home page', () => {
        render(<MockUploadComponent/>)
        const uploadButton = screen.getByTestId( 'home-page-link' );
        expect( uploadButton ).toHaveAttribute( 'title', 'home page link' );
        expect( uploadButton ).toHaveAttribute( 'href', '/' );
    })
});

describe( 'upload page API testing', function () {
    test( 'Render Upload Page and Upload invalid file', async () => {
        render( <MockUploadComponent /> );
        const fileInput = screen.getByTestId( 'uploadFile' );
    
        const file = new File( ['favicon'], 'favicon.png', { type: 'image/png' } );
        userEvent.upload( fileInput, file );
        expect( fileInput.files[0] ).toStrictEqual( file );
        expect( fileInput.files.item( 0 ) ).toStrictEqual( file );
        expect( fileInput.files ).toHaveLength( 1 );
    } );
})