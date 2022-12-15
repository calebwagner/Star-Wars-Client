import React from 'react'
import { SearchBar } from './SearchBar'
import { render, fireEvent } from '@testing-library/react'

describe('SearchBar', () => {
  it('renders the Star Wars Character Search title', () => {
    const { getByLabelText } = render(<SearchBar />)
    const title = getByLabelText('Star Wars Character Search')

    expect(title).toBeInTheDocument()
  })

  it('renders an input field with the correct placeholder', () => {
    const { getByPlaceholderText } = render(<SearchBar />)
    const input = getByPlaceholderText('type name')

    expect(input).toBeInTheDocument()
  })

  it('updates the searchQuery state when the input value changes', () => {
    const setSearchQuery = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchBar searchQuery="" setSearchQuery={setSearchQuery} />,
    )
    const input = getByPlaceholderText('type name')

    fireEvent.change(input, { target: { value: 'Obi-Wan' } })

    expect(setSearchQuery).toHaveBeenCalledWith('Obi-Wan')
  })
})
