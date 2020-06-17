import React from 'react';

import Page from '../components/shared/Page';
import InstructionText from "../components/shared/InstructionText";
import FloatingWidget from "../components/shared/FloatingWidget";

function SessionPage(props) {
    return (
        <Page>
            <InstructionText>Starting soon...</InstructionText>
            <FloatingWidget />
        </Page>
    )
}

export default SessionPage;