import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Page from '../components/Page';
import InstructionText from "../components/InstructionText";
import FloatingWidget from "../components/FloatingWidget";

import LoadingBar from 'react-top-loading-bar';

import Sound from 'react-sound';
import store from "store";

const PHOTO_QUERY = "meditation";

const START_OFFSET = 60*1000;
const TICK_INTERVAL = 500;

function SessionPage(props) {
    const router = useRouter();

    const [is_playing, set_is_playing] = useState(false);
    // time remaining in seconds
    const [time_remaining, set_time_remaining] = useState();

    const [settings, set_settings] = useState({ loading: true });

    function toggle_playing() {
        set_is_playing(!is_playing);
    }

    // run every .5 s
    function on_tick() {
        if(!is_playing) {
            return;
        }

        set_time_remaining(time_remaining*2);
        console.log(time_remaining);
    }

    // if settings aren't defined or session is over
    useEffect(() => {
        const settings = store.get('settings');

        if(!settings || (settings.time_remaining_s <= 0 && !settings.is_infinite)) {
            router.push('/');
        } else {
            const interval_id = setInterval(on_tick, TICK_INTERVAL);

            set_settings(settings);
            set_time_remaining(settings.time_remaining_s);
            set_is_playing(true);

            if(settings.full_screen) {
                document.documentElement.webkitRequestFullScreen();
            }

            return () => {
                clearInterval(interval_id);
            };
        }
    }, []);

    let content;
    const progress = (settings.duration*1000-time_remaining)/(settings.duration*1000)*100;

    if(settings.loading) {
        content = (
            <InstructionText>Loading...</InstructionText>
        )
    } else {
        content = (
            <React.Fragment>
                <LoadingBar height={5} color='#fff' progress={progress*100} />

                { settings.floating_text ? <InstructionText floated='down' animated={true}>{ settings.floating_text }</InstructionText> : "" }

                <FloatingWidget color='grey' icon={ is_playing ? 'pause' : 'play' } onClick={toggle_playing} />
                <Sound url="/static/sounds/meditation1.mp3" playbackRate={1.05} autoLoad={true} volume={100} playStatus={is_playing ? Sound.status.PLAYING : Sound.status.PAUSED} playFromPosition={START_OFFSET}/>
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