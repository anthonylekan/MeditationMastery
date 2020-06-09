import React from 'react';

// const Background = styled.div`
//     background: ${props => props.color || 'white'};
//     width: 100vw;
//     height: 100vh;
//     position: fixed;
//     z-position: -999;
// `;

function Background(props) {
    return (
        <React.Fragment>
            <style jsx>{`

                div {
                    width: 100%;
                    height: 100%;
                    background: ${props.color || 'black'};
                    z-index: -999;
                }

            `}</style>
            <div />
        </React.Fragment>

    )
}


export default Background;