import React from 'react';
import styled from 'styled-components';

import { colors, shadows, dimensions, typography} from 'styles.js';
import validatePng from 'components/img/validate.png'

const Container = styled.div.attrs(({checked}) => ({
  style : {
    color : checked ? colors.blueElectron : 'white'
  }
}))`
  display         : flex;
  flex-direction  : row;
  justify-content : space-between;
  align-items     : center;
  font-size       : ${typography.medium}em;
  cursor          : pointer;
`;


const DivCheckbox = styled.div.attrs(({checked}) => ({
  style : {
    borderColor : checked ? colors.blueElectron : 'white' 
  }
}))`
  width  : 18px;
  height : 18px;
  border : 2px solid white;
  border-radius : 3px;
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : center;
`;

const Checkmark = styled.img`
  width        : 10px;
`;

const Label = styled.div`
  margin-left : 10px;
`;


class Checkbox extends React.Component {
  render() {
    const { checked, onToggle, label, value } = this.props;
    return (
      <Container checked={checked}>
        <DivCheckbox onClick={onToggle} value={value} checked={checked}>
          {
            checked ? 
              <Checkmark src={validatePng}/> :
              null
          }
        </DivCheckbox>
        <Label>
          {label}
        </Label>
      </Container>
    );
  }
}

export default Checkbox;