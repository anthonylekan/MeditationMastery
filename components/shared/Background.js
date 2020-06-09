import React from 'react';

import CrossfadeImage from 'react-crossfade-image';

function Background(props) {

    return (
        <React.Fragment>
            <style jsx>{`

                div {
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    background:  ${props.color || 'black'};
                    background-image: ${props.img ? `url(${props.img})` : 'none' };
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;

                    z-index: -999;
                }

            `}</style>
            <div />
        </React.Fragment>

    )
}


export default Background;