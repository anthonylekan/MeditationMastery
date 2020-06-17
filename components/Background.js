import React from 'react';

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

                    # filter: blur(1px);
                    # -webkit-filter: blur(1px);

                    z-index: -999;
                }

            `}</style>
            <div />
        </React.Fragment>

    )
}


export default Background;