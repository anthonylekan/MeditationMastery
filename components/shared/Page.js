import React from 'react';

import ZenBackground from './ZenBackground';

function Page(props) {
    return (
        <React.Fragment>
            <title>{ props.title || "Sound Healing" }</title>
            <ZenBackground photos={props.photos} />

            <main style={{padding: 25}}>
                { props.children }
            </main>
        </React.Fragment>
    )
}

export default Page;