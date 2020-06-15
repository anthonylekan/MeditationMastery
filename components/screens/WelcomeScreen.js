import React, { useState } from 'react';

import Page from "../shared/Page";
import CountdownText from "../shared/CountdownText";
import InstructionText from "../shared/InstructionText";

function WelcomeScreen(props) {
    // session duration in minutes
    const [session_duration, set_session_duration] = useState(30);

    const on_timer_end = () => {
        props.start_session();
    };

    return (
        <React.Fragment>
            <InstructionText>Press Space to Start</InstructionText>
        </React.Fragment>
    )
}

export default WelcomeScreen;