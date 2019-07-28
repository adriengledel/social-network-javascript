  import React from 'react';
  import styled from 'styled-components';

  import MenuItem from './MenuItems';
  import Menu from './Menu';
  import MenuButton from './MenuButton';

  import {colors} from 'styles';


  const Container = styled.div`
      position : absolute;
      top        : 0;
      left       : 0;
      z-index     : 99;
      opacity    : 0.9;
      display    : flex;
      align-items : center;
      background : ${colors.menuHamburger};
      width      : 100%;
      color      : white;
      font-family : Lobster;
  `;

  class MenuHamburger extends React.Component {
      constructor(props){
        super(props);
        this.state={
          menuOpen:false,
        }
      }
      
      handleMenuClick() {
        this.setState({menuOpen:!this.state.menuOpen});
      }
      
      handleLinkClick() {
        this.setState({menuOpen: false});
      }
      
      render(){
        const menu = ['About Us','Our Products','Services','FAQ','Contact Us']
        const menuItems = menu.map((val,index)=>{
          return (
            <MenuItem 
              key={index} 
              delay={`${index * 0.1}s`}
              onClick={()=>{this.handleLinkClick();}}>{val}</MenuItem>)
        });
        
        return(
          <div>
            <Container>
              <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
            </Container>
            <Menu open={this.state.menuOpen}>
              {menuItems}
            </Menu>
          </div>
        );
      }
    }

    export default MenuHamburger;
    
  