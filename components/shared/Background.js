import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    background: ${props => props.color || 'white'};
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-position: -999;
`;

export default Background;