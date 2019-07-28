import React from 'react';
import styled from 'styled-components';

import { colors, typography, shadows } from 'styles';

const TextAreaContainer = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%
    height : 100%;
  `;

const TextAreaBox = styled.textarea.attrs(({error}) => ({
  style : {
    border     : error ? '2px solid #FF4C6E' : '',
    boxShadow  : error ? shadows.inputError : '',
    padding    : error ? '14px' : '15px',
  }
}))`
    border-radius  : 4px;
    border-color   : ${colors.borders};
    font-size      : ${typography.large}em;
    font-family    : 'Rubik', sans-serif;
    resize         : none;
    padding        : 15px;
    ::placeholder {
      color        : ${colors.inputPlaceholder};
    }
    :focus {
      padding : 14px !important;
      outline : none;
      border : 2px solid ${colors.buttonLogin};
      box-shadow: ${shadows.inputActive};
    }
`;

const Label = styled.label.attrs(({mediumSizeLabel, colorLabel}) => ({
  style : {
        fontSize : mediumSizeLabel ? typography.large+'em' : typography.large+'em',
        color    : colorLabel ? colorLabel : 'white'
  }
}))`
    margin-bottom : 10px;
    color : white;
`;

class TextArea extends React.Component{
  render() {
    const {placeholder, label, type, onChange, error, value, mediumSizeLabel, name, colorLabel } = this.props;
    return (
      <TextAreaContainer>
        <Label
          mediumSizeLabel={mediumSizeLabel}
          colorLabel={colorLabel}
        >
          {label}
        </Label>
        <TextAreaBox
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={value}
          error={error}
          name={name}
        />
      </TextAreaContainer>
    );
  }
}

export default TextArea;

