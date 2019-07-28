import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import SearchImgPng from 'components/img/icon-search.png';
import RowUser      from 'components/common/RowUser';

import { colors, shadows } from 'styles';

const Container = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  position        : relative;
  width           : 100%;
  border-bottom   : 1px solid white;
  color           : white;
  margin-top      : 15px;
  border-radius   : 4px;
`;

const ContainerInput = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
`;
  
const Input = styled.input`
  border           : none;
  width            : 100%;
  outline          : none;
  height           : 30px;
  background-color : ${colors.background};
  color            : white;
  caret-color      : white;
`;

const SearchImg = styled.img`
  width        : 15px;
  height       : 15px;
  margin-right : 10px;
`;

const ContainerList = styled.div``;

const List = styled.div`
  position : absolute;
  width    : 100%;
  max-height   : 300px;
  overflow : auto;
  border-radius : 4px;

`;

const ListFriends = styled.div``;

const Row = styled.div`
`;

class InputSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showList : false
    }
    this.handleFocusInput = this.handleFocusInput.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }
  
  handleFocusInput(){
    this.setState({showList : !this.state.showList});
  }

  componentDidMount() {
    document.addEventListener('click',    this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click',    this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleDocumentClick(event) {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.close();
    }
  }

  close() {
    this.setState({showList : false});
  }

  render(){
    const { items=[], onChange, placeholder, className, noLink, userSelect } = this.props;
    return(
      <Container className={className}>
        <ContainerInput>
          <SearchImg 
            src={SearchImgPng}
          />
          <Input 
            placeholder={placeholder}
            onFocus={this.handleFocusInput}
            onChange={onChange}
          />
        </ContainerInput>
        <ContainerList>
        {
          this.state.showList ?
            <List onBlur={this.handleFocusInput} onClick={this.handleFocusInput}>
              {
                items.map(item => <RowUser onClick={userSelect} noLink={noLink} key={item._id} user={item}/> )
              }
            </List> : null
        }
        </ContainerList>
      </Container>

    );
  }
}

export default InputSearch;