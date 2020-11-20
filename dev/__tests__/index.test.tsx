import React from 'react'
import styled from 'styled-components'
import Component, { UploaderProps } from '../../src'

import { render } from '../tests/utils'

const border = '1px solid green'

const ComponentStyled = styled(Component)`
  color: ${({ theme }) => theme.colors.primary};

  border: ${border};
`

const props: UploaderProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onUpload: (_result) => {},
  name: "test",
}

describe('Component', () => {
  it('Render default', () => {
    const tree = render(<Component {...props} />)
    expect(tree.container).toMatchSnapshot()
  })

  it('Render styled', () => {
    const tree = render(<ComponentStyled {...props} />)
    const node = tree.container.children[0]
    expect(tree.container).toMatchSnapshot()
    expect(node).toMatchSnapshot()
    expect(node).toHaveStyleRule('border', border)
  })
})
