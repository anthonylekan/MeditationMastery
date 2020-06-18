import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Page from '../components/Page';
import ProgressBar from "../components/ProgressBar";
import InstructionText from "../components/InstructionText";
import FloatingWidget from "../components/FloatingWidget";

import Sound from 'react-sound';
import store from "store";

const PHOTO_QUERY = "meditation";

const START_OFFSET = 55*1000;

function SessionPage(props) {
    const router = useRouter();

    const [is_playing, set_is_playing] = useState(false);
    const [settings, set_settings] = useState({ loading: true });

    function toggle_playing() {
        set_is_playing(!is_playing);
    }

    function end() {
        set_is_playing(false);
        router.push('/');
    }

    // if settings aren't defined or session is over
    useEffect(() => {
        const settings = store.get('settings');

        if(!settings) {
            router.push('/');
        } else {
            set_settings(settings);
            set_is_playing(true);

            if(settings.full_screen) {
                document.documentElement.webkitRequestFullScreen();
            }
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
                { !settings.loading ? <ProgressBar is_playing={is_playing} duration={settings.duration} end={end} /> : null }
                { settings.floating_text ? <InstructionText floated='down' animated={true}>{ settings.floating_text }</InstructionText> : "" }

                <FloatingWidget color='grey' icon={ is_playing ? 'pause' : 'play' } onClick={toggle_playing} />
                <Sound url="/static/sounds/meditation1.mp3" playbackRate={1.00} autoLoad={true} volume={100} playStatus={is_playing ? Sound.status.PLAYING : Sound.status.PAUSED} playFromPosition={START_OFFSET}/>
            </React.Fragment>
        )
    }

    return (
        <Page title="Sound Healing - Session" paused={!is_playing} photos={(!settings.loading && settings.keep_picture_background) ? props.photos : false}>
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