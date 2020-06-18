import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Page from "../components/Page";

import SettingsForm from "../components/FloatingSettingsForm";
import InstructionText from "../components/InstructionText";

import store from "store";

const PHOTO_QUERY = "meditation";

function IndexPage(props) {
    const router = useRouter();
    const session_info = { license_key: false, duration: 5, is_infinite: false, keep_picture_background: false, full_screen: false, floating_text: "" };

    const [settings, set_settings] = useState(session_info);

    function update_setting(name, new_value) {
        set_settings({ ...settings, [name]: new_value });
        store.set('settings', settings);
    }

    function start() {
        store.set('settings', settings);
        router.push('/session');
    }

    function handleKeyPress(event) {
        if(event.keyCode === 17) {
            start();
        }
    }

    useEffect(() => {
        // const saved_settings = store.get('settings');
        //
        // if(saved_settings) {
        //     set_settings('settings', { ...settings, ...saved_settings  });
        // }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <Page photos={props.photos}>
            <InstructionText animated={true}>Press Control to Start</InstructionText>
            <SettingsForm start={start} settings={settings} update_setting={update_setting} />
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