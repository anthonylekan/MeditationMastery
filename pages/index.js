import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Page from "../components/shared/Page";

import SettingsForm from "../components/shared/FloatingSettingsForm";
import InstructionText from "../components/shared/InstructionText";

import store from "store";

const PHOTO_QUERY = 'meditation';

function IndexPage(props) {
    const router = useRouter();
    const session_info = { license_key: false, duration: 5, is_infinite: false, keep_picture_background: false, full_screen: false, };

    const [settings, set_settings] = useState(session_info);

    function update_setting(name, new_value) {
        set_settings({ ...settings, [name]: new_value });
    }

    function handleKeyPress(event) {
        if(event.keyCode === 32) {
            store.set('session_settings', { started: false, time_remaining_s: settings.duration*1000, ...settings });
            router.push(`/session`);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <Page photos={props.photos}>
            <InstructionText>Press Space to Start</InstructionText>
            <SettingsForm settings={settings} update_setting={update_setting} />
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

export default IndexPage;