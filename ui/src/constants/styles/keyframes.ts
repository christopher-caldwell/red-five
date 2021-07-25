import { keyframes, css } from 'styled-components'

export const verticalBounceKeyFrame = css`
  ${keyframes`
  0%, 
  100%, 
  20%, 
  50%,
  80% {
    transform:         translateY(0);
  }
  40% {
    transform:         translateY(-10px);
  }
  60% {
    transform:         translateY(-5px);
  }
`}
`
