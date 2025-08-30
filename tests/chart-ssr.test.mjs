import { render } from '@testing-library/react'
import React from 'react'
import { SimpleLineChart } from '@teribit/ui-blocks'

const data = [ { category: 'Ene', value: 10 }, { category: 'Feb', value: 20 } ]

test('SimpleLineChart renders without crashing', () => {
  const { container } = render(<SimpleLineChart data={data} />)
  expect(container.querySelector('svg')).toBeTruthy()
})
