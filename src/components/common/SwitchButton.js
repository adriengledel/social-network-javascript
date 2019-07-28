import React from 'react';
import styled from 'styled-components';
import {colors, typography} from 'styles.js'


const Switch = styled.div.attrs(({head}) => ({
  style : {
    borderColor     : head ? colors.switchColor : colors.buttonDashed
  }
}))`
  display        : flex;
  flex-direction : row;
  align-items : center;
  height : 40px;
  border : 1px solid;
  border-radius : 4px;
  height : 100%;
`;

const Element = styled.div.attrs(({checked, head, items, item}) => ({
  style : {
    backgroundColor : checked ? colors.blueElectron : '',
    color           : !checked && head? colors.switchColor : !checked ? colors.switchGrey : 'white',
    borderRight     : (items.indexOf(item)< items.length-1) ? '1px solid' : '',
    borderColor     : head ? colors.switchColor : colors.buttonDashed
  }
}))`
  height          : 100%;
  flex            : 1;
  text-align      : center;
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  cursor          : pointer;
`;


class SwitchButton extends React.Component { 
  render() {
    const { 
      items = [],
      value = null,
      onSelect = () => {},
      head
    } = this.props;
          
    return (
      <Switch head={head}>
        {
          items.map(
            (item, index) => 
              <Element
                key={index}
                onClick={() => onSelect(item.value)}
                checked={item.value === value}
                head={head}
                items={items}
                item={item}
              >
                {item.name}
              </Element>
          )
        }
      </Switch>          
    );  
  }
}

export default SwitchButton;
