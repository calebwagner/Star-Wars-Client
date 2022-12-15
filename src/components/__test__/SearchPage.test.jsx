import React from 'react'
import { SearchPage } from './SearchPage'
import { render, fireEvent } from '@testing-library/react'

jest.mock('../api/FetchPeople', () => ({
  fetchPeople: jest.fn().mockResolvedValue([
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    },
    {
      name: 'C-3PO',
      height: '167',
      mass: '75',
      hair_color: 'n/a',
      skin_color: 'gold',
      eye_color: 'yellow',
      birth_year: '112BBY',
      gender: 'n/a',
    },
  ]),
}))

describe('SearchPage', () => {
  it('renders the SearchBar component', () => {
    const { getByLabelText } = render(<SearchPage />)
    const searchBar = getByLabelText('Star Wars Character Search')

    expect(searchBar).toBeInTheDocument()
  })

  it('renders a list of character profiles', () => {
    const { getByTestId } = render(<SearchPage />)
    const characterList = getByTestId('character-list')

    expect(characterList).toBeInTheDocument()
  })

  it('filters the list of characters based on the search query', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SearchPage />)
    const input = getByPlaceholderText('type name')
    const characterList = getByTestId('character-list')

    fireEvent.change(input, { target: { value: 'luke' } })

    expect(await characterList).toHaveTextContent('Luke Skywalker')
    expect(await characterList).not.toHaveTextContent('C-3PO')
  })
})
