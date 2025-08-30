const React = require('react')
const { render } = require('@testing-library/react')

// Mock antes de cargar el bundle para evitar dependencia de layout real
jest.mock('recharts', () => {
  const actual = jest.requireActual('recharts')
  const React = require('react')
  return {
    ...actual,
    ResponsiveContainer: ({ children }) => {
      if (React.isValidElement(children)) {
        return React.createElement('div', null, React.cloneElement(children, { width: 400, height: 300 }))
      }
      return React.createElement('div', null, children)
    }
  }
})

const { SimpleLineChart } = require('../packages/ui-blocks/dist/index.cjs.js')

describe('SimpleLineChart SSR/render', () => {
  it('renders SVG', () => {
    const data = [ { category: 'Ene', value: 10 }, { category: 'Feb', value: 20 } ]
  const { container } = render(React.createElement(SimpleLineChart, { data }))
  // Ahora debe existir un svg de LineChart
  expect(container.querySelector('svg')).toBeTruthy()
  })
})