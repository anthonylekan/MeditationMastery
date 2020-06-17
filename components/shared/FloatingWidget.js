import React from 'react';

import { Button } from 'semantic-ui-react';

function FloatingWidget(props) {
    const icon = props.icon || 'settings';
    const color = props.color || 'teal';

    const onClick = props.onClick;

    return (
        <React.Fragment>
            <style jsx>{`
                div {
                    width: 60px;
                    height: 60px;
                    border-radius: 100%;
                    box-shadow: 0px 3px 3px rgba(0,0,0,0.1);
                    transition: all 0.1s ease-in-out;
                    transform: scale(1.0);
                    float: right;
                }

                div:hover {
                    transform: scale(1.1);
                    cursor: pointer;
                }
            `}</style>
            <div style={ props.style || {position: "fixed", bottom: "40px", left: "40px"}}>
                <Button id="button" onClick={onClick} color={color} circular icon={icon} floated='left' size='massive' />
            </div>
        </React.Fragment>
    )

}

export default FloatingWidget;