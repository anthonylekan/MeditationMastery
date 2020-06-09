import React from 'react';

function Page(props) {
    return (
        <main style={{padding: 25}}>
            { props.children }
        </main>
    )
}

export default Page;