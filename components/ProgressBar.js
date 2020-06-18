import React, { useState, useEffect } from 'react';

const TICK = 1000;

import LoadingBar from 'react-top-loading-bar';

function ProgressBar(props) {
    const is_playing = props.is_playing;
    const duration = props.duration*60;
    const end = props.end;

    const [time_remaining, set_time_remaining] = useState(duration);
    const progress = ((duration - time_remaining)/duration)*100;

    if(time_remaining <= 0) {
        end();
    }

    useEffect(() => {
        const interval_id = setInterval(function() {
            if(!is_playing) {
                return;
            }

            set_time_remaining(time_remaining => time_remaining-1);
        }.bind(this), TICK);

        return () => {
            clearInterval(interval_id);
        }
    }, [is_playing]);

    return (
        <LoadingBar height={5} color='#fff' progress={progress} />
    )
}

export default ProgressBar;