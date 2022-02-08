/* eslint-disable no-undef */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Pageloader from '../screens/loader';

afterEach( cleanup );

describe( 'Test Components & Behaviour', () => {
  test( 'Displays a  page loader', () => {
    render(
      <Pageloader />,
    );
    expect( screen.getByRole( 'progressbar' ) ).toBeTruthy();
  } );
} );
