import React from 'react';

import Background from './Background';

function Page(props) {
    return (
        <React.Fragment>
            <Background color={props.bg_color}/>
            <main style={{padding: 25}}>
                { props.children }
            </main>
        </React.Fragment>
    )
}

export default Page;