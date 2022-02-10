import {render, screen, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import Uplaod from '../screens/upload/index';

const API_URL = process.env.APP_SERVER_BASE_URL || 'http://localhost:3030';
//Api server setup
const server = setupServer(
    rest.post( `${API_URL}/uploadVideo`, ( req, res, ctx ) => res(
      ctx.status( 201 ),
      ctx.body( { status: true } ),
    ) ),
  );
  
//Start API server when start test
beforeAll( () => server.listen() );
//Clean up and reset server for each set
afterEach( () => {
server.resetHandlers();
cleanup();
} );
//Stop API server after completion of test
afterAll( () => server.close() );
  
  
const MockUploadComponent = () => {
    return (
        <BrowserRouter>
            <Uplaod/>
        </BrowserRouter>
    );
}
describe('Uplaod page testing the behavior the user would see in the browser.', () => {
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
    test( 'Render Upload Page and Upload more than 30MB file', async () => {
      render( <MockUploadComponent /> );
      const fileInput = screen.getByTestId( 'uploadFile' );
  
      const file = new File( ['sample'], 'sample_3840x2160.mp4', { type: 'video/mp4' } );
      Object.defineProperty( file, 'size', { value: ( ( 30 * 1024 * 1024 ) + 1 ) } );   
      userEvent.upload( fileInput, file );
      expect( screen.getByText( 'File size below 30MB accepted.' ) ).toBeInTheDocument();
    } );
    
    test( 'Render Upload Page and Upload less than 30MB file', async () => {
        render( <MockUploadComponent /> );
        const fileInput = screen.getByTestId( 'uploadFile' );
        const file = new File( ['sample'], 'sample_3840x2160.mp4', { type: 'video/mp4' } );
        Object.defineProperty( file, 'size', { value: ( ( 30 * 1024 * 1024 ) - 1 ) } );   
        userEvent.upload( fileInput, file );
        expect( screen.queryByText( 'File size below 30MB accepted.' ) ).toBeNull();
    } );
});

describe( 'upload page API testing', function () {
    test( 'Render upload invalid file', async () => {
        render( <MockUploadComponent /> );
        const fileInput = screen.getByTestId( 'uploadFile' );
    
        const file = new File( ['favicon'], 'favicon.png', { type: 'image/png' } );
        userEvent.upload( fileInput, file );
        expect( fileInput.files[0] ).toStrictEqual( file );
        expect( fileInput.files.item( 0 ) ).toStrictEqual( file );
        expect( fileInput.files ).toHaveLength( 1 );
    } );
    test( 'Render internal error message when uploading failed', async () => {
        server.use(
            rest.post( `${API_URL}/uploadVideo`, ( req, res, ctx ) => res(
            ctx.status( 500 ),
            ctx.body( { status: false } ),
            ) ),
        );
        render( <MockUploadComponent /> );
        const fileInput = screen.getByTestId( 'uploadFile' );
        const file1 = new File( ['favicon'], 'favicon.mp4', { type: 'video/mp4' } );
        userEvent.upload( fileInput, file1 );
        expect( fileInput.files[0] ).toStrictEqual( file1 );
        expect( fileInput.files.item( 0 ) ).toStrictEqual( file1 );
        expect( fileInput.files ).toHaveLength( 1 );

        const videoPreview = await screen.findByTestId('video-preview');
        expect( videoPreview ).toBeInTheDocument();

        const upload = screen.getByTestId( 'upload-file-api' );
        userEvent.click( upload );
        await waitForElementToBeRemoved( () => screen.getByRole( 'progressbar' ) );
    } );
    test( 'Render sucess message when uploading success', async () => {
        server.use(
            rest.post( `${API_URL}/uploadVideo`, ( req, res, ctx ) => res(
            ctx.status( 200 ),
            ctx.body( { status: true } ),
            ) ),
        );
        render( <MockUploadComponent /> );
        const fileInput = screen.getByTestId( 'uploadFile' );
        const file1 = new File( ['favicon'], 'favicon.mp4', { type: 'video/mp4' } );
        userEvent.upload( fileInput, file1 );
        expect( fileInput.files[0] ).toStrictEqual( file1 );
        expect( fileInput.files.item( 0 ) ).toStrictEqual( file1 );
        expect( fileInput.files ).toHaveLength( 1 );

        const videoPreview = await screen.findByTestId('video-preview');
        expect( videoPreview ).toBeInTheDocument();

        const upload = screen.getByTestId( 'upload-file-api' );
        userEvent.click( upload );
        await waitForElementToBeRemoved( () => screen.getByRole( 'progressbar' ) );
    } );
    
})