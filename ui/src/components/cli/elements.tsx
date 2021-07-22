import styled from 'styled-components'

export const Window = styled.div`
  width: 100%;
  /* top: 150px; */
  border: 0.5px solid gray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start;
  justify-content: flex-start;
  flex-flow: column-reverse; */
  padding: 1%;
  overflow: scroll;
  height: 65vh;
  margin-top: 10px;
  @media screen and (min-width: 1500px) {
    height: 70vh;
  }
`
