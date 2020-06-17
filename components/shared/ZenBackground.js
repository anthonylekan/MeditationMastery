import React, { useState, useEffect } from 'react';

import Background from './Background';

const BACKUP_COLOR = '#000';
const TIMER_INTERVAL = 10000;

/*
 * display unsplash photos with a filter as the page background
 * TODO: Photo Transition
 */
function ZenBackground(props) {
    const [current_img, set_current_img] = useState(0);

    useEffect(() => {
        if(props.photos) {
            const photo_amount = props.photos.length;
            let new_img_index = (current_img + 1) % photo_amount;

            const new_img = new Image();
            new_img.src = props.photos[new_img_index]["urls"]["full"];

            const timer = setTimeout(() => {
                set_current_img(new_img_index);
            }, TIMER_INTERVAL);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [current_img, props.photos]);

    if(!props.photos) {
        return <Background color={props.color || BACKUP_COLOR}/>;
    } else {
        const color = props.photos[current_img]["color"];
        const source = props.photos[current_img]["urls"]["full"];

        return <Background img={source} color={color} />;
    }
}

export default ZenBackground;