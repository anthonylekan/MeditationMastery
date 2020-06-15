import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Page from "../components/shared/Page";

import WelcomeScreen from "../components/screens/WelcomeScreen";

const PHOTO_QUERY = 'meditation';

function IndexPage(props) {
    const router = useRouter();
    const session_info = { duration_min: 5 };

    function handleKeyPress(event) {
        if(event.keyCode === 32) {
            router.push(`/session?duration_min=${session_info.duration_min}`)
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
            <WelcomeScreen/>
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