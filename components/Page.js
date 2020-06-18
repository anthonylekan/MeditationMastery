import React from 'react';

import ZenBackground from './ZenBackground';

function Page(props) {
    return (
        <React.Fragment>
            <title>{ props.title || "Sound Healing - Meditation Mastery"}</title>

            <ZenBackground photos={props.photos} paused={props.paused} />

            <main style={{padding: 25}}>
                { props.children }
            </main>
        </React.Fragment>
    )
}

export default Page;