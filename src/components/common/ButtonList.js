import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import DropDown from 'components/common/DropDown';

import { colors, stacking, shadows } from 'styles.js';

import arrowDropDown from 'components/img/arrow-drop-down.png';
import RowUser       from 'components/common/RowUser';


const DropDownList = styled(DropDown)`

`;

const Button = styled.div.attrs(({error}) => ({
  style : error ? {
    border    : '1px solid #FF4C6E',
    boxShadow : shadows.inputError,
  } : {}
}))`
  flex            : 1;
  display         : flex;
  flex-direction  : row;
  justify-content : space-between;
  align-items     : center;
  cursor          : pointer;
  border-radius   : 4px;
  width           : 150px;
  border          : 1px solid ${colors.borders};
  padding         : 10px;
  background-color: ${colors.blueElectron};
  :hover {
    background-color : ${colors.buttonHover}
  }

  :active {
    background-color : ${colors.buttonMouseDown}
  }
`;


const List = styled.div`
  flex            : 1;
  display         : flex;
  flex-direction  : column;
  justify-content : flex-start;
  overflow        : auto;
  max-height      : 160px;
  position        : absolute;
  width           : 100%;
  box-shadow      : ${shadows.buttonShadow};
  z-index         : 10;
  border-radius   : 5px;
  font-size       : 16px;
`;

const HeadItem = styled.div`
  text-align       : right;
  border-right     : 1px solid ${colors.borders};
  border-left      : 1px solid ${colors.borders};
  background       : ${colors.lightGreyColor};
`;

const Item = styled.div.attrs(({biggerItem}) => ({
  style : {
      height     : biggerItem ? '80px' : '48px',
      alignItems : biggerItem ? 'flex-start' : 'center',
      paddingLeft : biggerItem ? '10px' : ''

  }
}))`
  text-align       : center;
  border-bottom    : 1px solid ${colors.borders};
  border-right     : 1px solid ${colors.borders};
  border-left      : 1px solid ${colors.borders};
  display          : flex;
  flex-direction   : column;
  justify-content  : center;
  background-color : white;
  z-index          : 10;
  :hover {
    background-color : ${colors.buttonHover};
    font-weight      : 500;
  }
  :active {
    background-color : ${colors.buttonMouseDown};
  }
`;

const Arrow = styled.img`
  flex : 0;
`;

class ButtonList extends React.Component {
  render() {
    const {
      items = [],
      users,
      id,
      className,
      onClick
    } = this.props;

    const handleSelect = (value) => {
      this.buttonReference && this.buttonReference.close();
      onClick(value);
    }

    return (
      <DropDownList
      ref={ref => this.buttonReference = ref}
      ButtonElement={
        <Button
          id={id}
          className={className}
          >
            <div>Recommander</div>
            <Arrow src={arrowDropDown}/>
          </Button>
        }
        DropDownElement={
            <List>
              {
                items.map(
                  (item, index) =>
                    <Item key={index} >
                     <RowUser key={index} noLink onClick={()=>handleSelect(item.id)} user={users[item.id]}/>
                    </Item>
                )
              }
            </List>
        }
        />
    );
  }
}


export default ButtonList;