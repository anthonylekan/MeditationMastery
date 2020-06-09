import React, { useState } from 'react';

import Page from "../components/shared/Page";

import WelcomeScreen from "../components/screens/WelcomeScreen";

const PHOTO_QUERY = 'meditation';

function IndexPage(props) {

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

    console.log(photos)

    return { props: { photos } };
}

export default IndexPage;