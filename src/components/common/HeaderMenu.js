import React from 'react';
import styled from 'styled-components';
import MenuHamburger from 'components/common/MobileMenu/MenuHamburger';
import MenuInline from 'components/common/DesktopMenu/MenuInline';

const Mobile = styled.div`
    @media (min-width: 601px) {
        display: none;
    }
`;

const Desktop = styled.div`
    @media (max-width: 601px) {
        display: none;
    } 
`;

class HeaderMenu extends React.Component {
    render(){
        const { history } = this.props;
        return(
            <div style={{zIndex:2}}>
                <Mobile>
                    <MenuHamburger />
                </Mobile>
                <Desktop>
                    <MenuInline history={history} />
                </Desktop>
            </div>
        );
    }
}

export default HeaderMenu; 