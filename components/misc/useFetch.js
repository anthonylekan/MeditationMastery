import React, { useEffect } from 'react';

const useFetch = (url, options) => {
    const [state, setState] = React.useState({ data: null, loading: true });

    useEffect(async () => {
        const res = await fetch(url, options);
        const data = await res.json();
        setState({ data, loading: false });
    }, [url]);

    return state;
};

export default useFetch;