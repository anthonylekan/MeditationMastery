import React, { useEffect } from 'react';

const useFetch = (url, options) => {
    const [state, setState] = React.useState({ data: null, loading: true });

    useEffect(async () => {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
    }, [url]);

    return state;
};