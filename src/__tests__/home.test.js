import {render, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import Home from '../screens/home/index';
import userEvent from '@testing-library/user-event';

const API_URL = process.env.APP_SERVER_BASE_URL || 'http://localhost:3030';

//Api server setup
const empty_data_response = rest.get(`${API_URL}/getVideosThumnail`, (req, res, ctx) => {
    return res(
        ctx.status( 200 ),
        ctx.body( {
            status: 'success',
            data: []
        })
    );
})
const get_proper_response = rest.get( `${API_URL}/getVideoThumbnails`, ( req, res, ctx ) => res(
    ctx.status( 200 ),
    ctx.body( {
      status: 'success',
      data: [
        {
          filename: 'video_1626188918768.mp4',
          mimetype: 'video/mp4',
          originalname: 'video.mp4',
          thumbnail_name: 'video_1626188918768.png',
        },
      ],
    } ),
) )

const error_response = rest.get( `${API_URL}/getVideoThumbnails`, ( req, res, ctx ) => res(
    ctx.status( 403 ),
    ctx.body({ 
        status: 'success',
        message: "Internal server errror" 
    })
) )

const handler = [ get_proper_response ]

const server = setupServer(...handler);

//Initialize API server
beforeAll( () => server.listen({ onUnhandledRequest: "bypass" }) );

//Clean up and reset server for each set
afterEach( () => {server.resetHandlers();} );

//Stop API server after completion of test
afterAll( () => server.close() );

const MockHomeComponent = () => {
    return (
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    );
}
describe('Home page testing the behavior the user would see in the browser', () => {
    test('should render header in home', async () => {
        render(<MockHomeComponent/>)
        const heading = screen.getByRole( 'heading' );
        expect( heading ).toHaveTextContent( 'Videos Streaming - Home' );
    })

    test('should render upload page link in home page', () => {
        render(<MockHomeComponent/>)
        const uploadButton = screen.getByTestId( 'upload-page-link' );
        expect( uploadButton ).toHaveAttribute( 'title', 'upload video page link' );
        expect( uploadButton ).toHaveAttribute( 'href', '/upload' );
    })
    
    test( 'should render home page and Test for Play', async () => {
      render( <MockHomeComponent /> );
      await waitForElementToBeRemoved( () => screen.queryByRole( 'progressbar' ) );
      const playButton = screen.getAllByRole( 'img', { name: /thumbnails/i } );
      userEvent.click( playButton[0] );
      expect( screen.getByRole( 'presentation' ) ).toBeInTheDocument();
      const stopButton = screen.getByTestId( 'video-popup' );
      userEvent.click( stopButton );
    } );
    
    test( 'should render home page and Close Play poup outside click', async () => {
        render( <MockHomeComponent /> );
        await waitForElementToBeRemoved( () => screen.queryByRole( 'progressbar' ) );
        const playButton = screen.getAllByRole( 'img', { name: /thumbnails/i } );
        userEvent.click( playButton[0] );
        expect( screen.getByRole( 'presentation' ) ).toBeInTheDocument();
        fireEvent.keyDown( screen.getByRole( 'presentation' ), {
          key: 'Escape',
          code: 'Escape',
          keyCode: 27,
          charCode: 27,
        } );
    } );
    test( 'should render home page and Close Play poup on click close', async () => {
        render( <MockHomeComponent /> );
        await waitForElementToBeRemoved( () => screen.queryByRole( 'progressbar' ) );
        const playButton = screen.getAllByRole( 'img', { name: /thumbnails/i } );
        userEvent.click( playButton[0] );
        expect( screen.getByRole( 'presentation' ) ).toBeInTheDocument();
        fireEvent.click( screen.getByTestId( 'CloseIcon' ) );
    } );
});

describe( 'Home page API testing', function () {
    
    test( 'Render page when data exists', async () => {
        render(<MockHomeComponent/>)
        await waitForElementToBeRemoved( () => screen.queryByRole( 'progressbar' ) );
        expect( screen.getByTestId( 'video-list' ) ).toBeInTheDocument('')
    });
    test( 'Render page when empty data in getVideoThumbnails API call', async () => {
        server.use(empty_data_response)
        render(<MockHomeComponent/>)
        await waitForElementToBeRemoved( () => screen.queryByRole( 'progressbar' ) );
        const noData = screen.queryByTestId( "no-data" );
        expect(noData).toBeInTheDocument();
    });
    test( 'Render page when error response in getVideoThumbnails API call', async () => {
        server.use(error_response)
        render(<MockHomeComponent/>)
        await waitForElementToBeRemoved( () => screen.queryByRole( 'progressbar' ) );
        const error = screen.queryByTestId( "error" );
        expect(error).toBeNull();
    });
    

})