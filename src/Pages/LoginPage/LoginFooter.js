import React from 'react';
import styled from 'styled-components';

import { typography } from 'styles.js';

const Footer = styled.div`
  flex            : 0;
  padding-bottom  : 3%;
  padding-top     : 5%; 
  display         : flex;
  flex-direction  : row;
  justify-content : space-between;
  color           : white;
  font-size       : ${typography.small}em;
`;

const Copyright = styled.div`
  flex : 1;
`;

const Notice = styled.div`
  flex           : 0;
  display        : flex;
  flex-direction : row;
  white-space    : nowrap;
`;

const Link = styled.a`
  text-decoration : none;
  color           : white;
`;

  



class LoginFooter extends React.Component {
  render() {
    return (
      <Footer>
        <Copyright>
          <div>© 2019 Enter the Javascript. All rights reserved. User subject to End User Agreement.</div>
        </Copyright>
        <Notice>
          <Link href="#">Legal Notice&nbsp;</Link>
          |
          <Link href="#">&nbsp;privacy Notice</Link>
        </Notice>
      </Footer>
    );
  }
}

export default LoginFooter;