import React from 'react';
import { App } from './App';
import { render } from '@testing-library/react';

jest.mock('./components/SearchPage', () => ({
  SearchPage: jest.fn(() => <div>SearchPage</div>),
}));

describe('App', () => {
  it('renders the SearchPage component', () => {
    const { getByText } = render(<App />);
    const searchPage = getByText('SearchPage');

    expect(searchPage).toBeInTheDocument();
  });
});
