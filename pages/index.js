import React, { useState } from 'react';
import WelcomeScreen from "../components/screens/WelcomeScreen";

const APP_STATE = Object.freeze({
    WELCOME: 0,
    SESSION: 1,
    COMPLETED: 2,
});

function IndexPage(props) {
    const [app_state, set_app_state] = useState(APP_STATE.WELCOME);

    const next_state = () => {
        const new_state = (app_state + 1) % APP_STATE.length;

        set_app_state(new_state);
    };

    return <WelcomeScreen />;
}

export default IndexPage;