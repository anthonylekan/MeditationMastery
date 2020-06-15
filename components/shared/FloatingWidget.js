import React from 'react';

import { Button } from 'semantic-ui-react';


function FloatingWidget(props) {
    const icon = props.icon || 'settings';
    const color = props.color || 'teal';

    const onClick = props.onClick;

    return (
        <div style={ props.style || {position: "fixed", bottom: "40px"}}>
            <Button onClick={onClick} color={color} circular icon={icon} floated='left' size="massive" />
        </div>
    )

}

export default FloatingWidget;