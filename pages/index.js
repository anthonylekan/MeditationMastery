import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Page from "../components/shared/Page";

import SettingsForm from "../components/shared/FloatingSettingsForm";
import InstructionText from "../components/shared/InstructionText";

const PHOTO_QUERY = 'meditation';

function IndexPage(props) {
    const router = useRouter();
    const session_info = { duration_min: 5 };

    const [is_modal_open, set_is_modal_open] = useState(false);
    const [set_settings, settings] = useState(session_info);

    function handle_setting_change(property) {
        return function(new_value) {
            set_settings({ [property]: new_value, ...settings });
        }
    }

    function toggle_modal() {
        set_is_modal_open(!is_modal_open);
    }

    function handleKeyPress(event) {
        if(event.keyCode === 32) {
            router.push(`/session?duration_min=${session_info.duration_min}`);
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
            <SettingsForm />
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