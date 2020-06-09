import React, { useState } from 'react';

import Page from "../shared/Page";
import CountdownText from "../shared/CountdownText";

function WelcomeScreen(props) {
    // session duration in minutes
    const [session_duration, set_session_duration] = useState(30);

    const on_timer_end = () => {
        props.start_session();
    };

    return (
        <Page>

        </Page>
    )
}

export default WelcomeScreen;