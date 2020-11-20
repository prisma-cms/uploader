import styled from 'styled-components'

export const FileInputStyled = styled.div`
  minheight: 54px;
  maxwidth: 210px;
  padding: 0 10px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border: 2px dotted #ddd;
  cursor: pointer;

  &.dropable {
    background: rgba(255, 255, 0, 0.2);
  }

  &:hover: {
    bordercolor: #bbb;
    cursor: pointer;
  }

  .helperText {
    marginleft: 10;
  }
`
