import React from 'react';
import styled from 'styled-components';

import SearchImgPng from 'components/img/icon-search.png';
import RowUser      from 'components/common/RowUser';

import { colors } from 'styles';

const Container = styled.div`
  width           : 100%;
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  margin-top      : 15px;
`;

const ContainerInput = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
  border-bottom  : 1px solid white;
`;
  
const Input = styled.input`
  border  : none;
  width   : 100%;
  outline : none;
  height  : 30px;
  background-color : ${colors.background};
  color   : white;
`;

const SearchImg = styled.img`
  width        : 15px;
  height       : 15px;
  margin-right : 10px;
`;

const ContainerList = styled.div``;

const List = styled.div`
  width    : 100%;
  height   : 300px;
  overflow : auto;
  border: 1px solid white;
  border-radius: 4px;
  margin-top: 20px;
  box-shadow: 0px 2px 5px 0px rgba(255,255,255,1);
`;


const Row = styled.div`

`;

class InputSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showList : false
    }
    this.handleFocusInput = this.handleFocusInput.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);

  }
  handleChangeInput(event){
    const value = event.target.value;
  }

  handleFocusInput(){
    this.setState({showList : !this.state.showList});
  }

  render(){
    const { 
      items=[], 
      onChange, 
      placeholder, 
      users, 
      userId, 
      buttons, 
      onClickLeft, 
      onClickRight, 
      deleteButton,
      deleteFriend 
    } = this.props;
    return(
      <Container>
        <ContainerInput  onBlur={this.handleFocusInput}>
          <SearchImg 
            src={SearchImgPng}
          />
          <Input 
            placeholder={placeholder}
            onChange={this.handleChangeInput}
            onFocus={this.handleFocusInput}
            onChange={onChange}
          />
        </ContainerInput>
        <ContainerList>
          <List>
            {
              buttons ?
              items.map((item, index) => 
              <RowUser 
                key={item._id} 
                user={users[item.id]} 
                buttons 
                onClickLeft={onClickLeft}
                onClickRight={onClickRight}
                userId={userId}
                /> ) :
              items.map(item => 
                <RowUser 
                  deleteButton={deleteButton} 
                  key={item._id} 
                  user={users[item.id]} 
                  deleteFriend={deleteFriend}
                  />
                )
            }
          </List>
        </ContainerList>
      </Container>

    );
  }
}

export default InputSearch;