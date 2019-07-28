import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs(({open}) => ({
    style :{
      height :  open ?  '': 0
    }
}))`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background: black;
    opacity: 0.95;
    color: #fafafa;
    transition: height 0.3s ease;
    z-index: 2;
`;

const MenuList = styled.div`
    padding-top: 3rem;
`;

class Menu extends React.Component {
    constructor(props){
      super(props);
      this.state={
        open: this.props.open? this.props.open:false,
      }
    }
      
    componentWillReceiveProps(nextProps){
      if(nextProps.open !== this.state.open){
        this.setState({open:nextProps.open});
      }
    }
    
    render(){
        const { open } = this.props;
      return(
        <Container open={open}>
          {
            open ?
              <MenuList>
                {this.props.children}
              </MenuList> : null
          }
        </Container>
      )
    }
  }

  export default Menu;