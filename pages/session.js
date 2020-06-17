import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Page from '../components/shared/Page';
import InstructionText from "../components/shared/InstructionText";
import FloatingWidget from "../components/shared/FloatingWidget";

import LoadingBar from 'react-top-loading-bar';
import store from "store";

const PHOTO_QUERY = "meditation";

const SESSION_STATE = {
    STARTING: 'starting',
    IN_SESSION: 'in_session',
    OVER: 'over'
};

function SessionPage(props) {
    const router = useRouter();
    const [session_state, set_session_state] = useState();
    const [settings, set_settings] = useState({ loading: true });

    // if settings aren't defined or session is over
    useEffect(() => {
        const settings = store.get('settings');

        if(!settings || (settings.time_remaining_s <= 0 && !settings.is_infinite)) {
            router.push('/');
        } else {
            set_settings(settings);
            document.body.webkitRequestFullScreen();
        }
    }, []);

    let content;

    if(settings.loading) {
        content = (
            <InstructionText>Loading...</InstructionText>
        )
    } else {
        content = (
            <React.Fragment>
                <LoadingBar height={5} color='#fff' progress={30} />
                { settings.floating_text ? <InstructionText floated='down' animated={true}>{ settings.floating_text }</InstructionText> : "" }
                <FloatingWidget color='white' icon='pause' />
            </React.Fragment>
        )
    }

    return (
        <Page photos={(!settings.loading && settings.keep_picture_background) ? props.photos : false}>
            { content }
        </Page>
    )
}

// Fetch Unsplash background photos for menu
export async function getStaticProps() {
    const API_ROUTE = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${PHOTO_QUERY}&orientation=landscape`;

    const response = await fetch(API_ROUTE);
    const data = await response.json();

    const photos = data["results"];

    console.log(photos);

    return { props: { photos } };
}

export default SessionPage;