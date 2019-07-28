  import React from 'react';
  import styled from 'styled-components';
  import { connect } from 'react-redux';

  import MenuItem from './MenuItems';
  import Menu from './Menu';
  import MenuButton from './MenuButton';

  import {colors} from 'styles';

  import { initState } from 'store/actions/auth';
  import { usersConnected } from 'store/actions/usersConnected';
  import API from 'utils/API';


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
      color      : ${colors.yellowElectron};
      font-family : Lobster;
  `;

  class MenuHamburger extends React.Component {
      constructor(props){
        super(props);
        this.state={
          menuOpen:false,
        }
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleClickDeconnection = this.handleClickDeconnection.bind(this);

      }
      
      handleMenuClick() {
        this.setState({menuOpen:!this.state.menuOpen});
      }
      
      handleLinkClick() {
        this.setState({menuOpen: false});
      }

      handleClickDeconnection(){
        const { history, user } = this.props;
        localStorage.clear();
        history.push('/');
        this.props.initState();
        this.props.usersConnected();
        API.logout(user._id);
      }
      
      render(){
        const { user } = this.props;

        const menuViewer = [
          { name : 'Acceuil', link : '/' },
          { name : 'A propos', link : '/about' },
          { name : 'Inscription', link : '/signup' },
          { name : 'Mot de passe perdu', link : '/lostpassword' }
        ];

        const menuStandard = [
          { name : 'Acceuil', link : '/' },
          { name : 'A propos', link : '/about' }
        ];
        const menuAdmin = [
          { name : 'Acceuil', link : '/' },
          { name : 'A propos', link : '/about' },
          { name : 'Admin', link : '/admin' }
        ];

        return(
          <div>
            <Container>
              <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
            </Container>
            <Menu open={this.state.menuOpen}>
              {
                !user.logged ? menuViewer.map((val,index)=>
                    <MenuItem
                      item={val}
                      index={index}
                      key={index} 
                      delay={`${index * 0.1}s`}
                      onClick={this.handleLinkClick}>
                      {val.name}
                    </MenuItem>
                  ) : 
                <>  
                {
                  user.role === "admin" ?
                  menuAdmin.map((val,index)=>
                      <MenuItem
                        item={val}
                        index={index}
                        key={index} 
                        delay={`${index * 0.1}s`}
                        onClick={this.handleLinkClick}>
                        {val.name}
                      </MenuItem> 
                    ) :
                  menuStandard.map((val,index)=>
                      <MenuItem
                        item={val}
                        index={index}
                        key={index} 
                        delay={`${index * 0.1}s`}
                        onClick={this.handleLinkClick}>
                        {val.name}
                      </MenuItem> 
                    )
                }
                  <MenuItem
                    feature
                    index={5}
                    key={6} 
                    delay={`${4 * 0.1}s`}
                    disconnect={this.handleClickDeconnection}>
                    Déconnection
                  </MenuItem> 
                </>
              }
            </Menu>
          </div>
        );
      }
    }

    export default connect(state => ({
      user : state.user ? state.user : {}
    }), {initState, usersConnected})(MenuHamburger);
    
  