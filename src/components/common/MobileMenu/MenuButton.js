import React from 'react';
import styled from 'styled-components';
import API from 'utils/API';

const Container = styled.div`
    height: 32px;
    width: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 4px; 
`;
/* const Line = styled.div.attrs(({color}) => ({
    style : {
        background : color ? color : ''
    }
}))`
    height: 2px;
    width: 20px;
    transition: all 0.2s ease;
`;

const LineTop = styled.div.attrs(({open}) => ({
    style : {
        transform : open ? 'rotate(45deg)':'none'
    }
}))`
    transformOrigin: top left;
    marginBottom: 5px;
`;

const LineMiddle = styled.div.attrs(({open}) => ({
    style : {
        opacity : open ? 0 : 1,
        transform : open ? 'translateX(-16px)':'none'
    }
}))`
`;

const LineBottom = styled.div.attrs(({open}) => ({
    style : {
        transform : open ? 'translateX(-1px) rotate(-45deg)':'none'
    }
}))`
    transformOrigin: top left;
    marginTop: 5px;
`; */

class MenuButton extends React.Component {
    constructor(props){
      super(props);
      this.state={
        open: this.props.open? this.props.open:false,
        color: this.props.color? this.props.color:'black',
      }
    }
  
    componentWillReceiveProps(nextProps){
      if(nextProps.open !== this.state.open){
        this.setState({open:nextProps.open});
      }
    }
    
    handleClick(){
    this.setState({open:!this.state.open});
    API.logout();
    }
    
    render(){
        const styles = {
            container: {
              height: '32px',
              width: '32px',
              display:'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '4px',
            },
            line: {
              height: '2px',
              width: '20px',
              background: this.state.color,
              transition: 'all 0.2s ease',
            },
            lineTop: {
              transform: this.state.open ? 'rotate(45deg)':'none',
              transformOrigin: 'top left',
              marginBottom: '5px',
            },
            lineMiddle: {
              opacity: this.state.open ? 0: 1,
              transform: this.state.open ? 'translateX(-16px)':'none',
            },
            lineBottom: {
              transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
              transformOrigin: 'top left',
              marginTop: '5px',
            },       
          }
      return(
        <Container 
          onClick={this.props.onClick ? this.props.onClick: 
            ()=> {this.handleClick();}}>
          <div style={{...styles.line,...styles.lineTop}}/>
          <div style={{...styles.line,...styles.lineMiddle}}/>
          <div style={{...styles.line,...styles.lineBottom}}/>
         {/*  <div><Line color={this.state.color}/><LineTop open={open} /></div>
          <div><Line color={this.state.color}/> <LineMiddle open={open}/></div>
          <div><Line color={this.state.color}/> <LineBottom open={open}/></div> */}
        </Container>
      )
    }
  }

  export default MenuButton;