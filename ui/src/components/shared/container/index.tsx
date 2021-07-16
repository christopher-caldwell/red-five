import styled from 'styled-components'

interface FlexContainerProps {
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-evenly' | 'space-between'
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline'
  width?: string
  height?: string
  direction?: 'row' | 'column'
}
export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  justify-content: ${({ justify = 'center' }) => justify};
  align-items: ${({ align = 'center' }) => align};
  flex-direction: ${({ direction = 'row' }) => direction};
  ${({ height }) => (height ? `height: ${height};` : '')}
  ${({ width }) => (width ? `width: ${width};` : '')}
`
