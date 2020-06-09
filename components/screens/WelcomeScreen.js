import React from 'react';

import Page from "../shared/Page";
import CountdownText from "../shared/CountdownText";

function WelcomeScreen(props) {

    const on_timer_end = () => {
        props.start_session();
    };

    return (
        <Page>

            <CountdownText duration={5} exit={on_timer_end} />

        </Page>
    )
}

export default WelcomeScreen;