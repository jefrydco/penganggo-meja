import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, userEvent } from '@/utils/tests/vitest'
import { Reset } from './Reset'

describe('Reset', () => {
  it('match snapshot', () => {
    const { asFragment } = render(<Reset />)
    expect(asFragment()).toMatchSnapshot()
  })
  it.todo('clickable', () => {
    const handleClick = vi.fn()
    const { getByRole } = render(<Reset onClick={handleClick} />)
    userEvent.click(getByRole('button'))
    expect(handleClick).toBeCalledTimes(1)
  })
})
