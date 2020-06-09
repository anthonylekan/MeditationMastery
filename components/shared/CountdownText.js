import React from 'react';

const ONE_SECOND_MS = 1000;

/*
 * TODO: Implement Sweeping down, scaling transition from top right and exit transition top left, minimizing
 */
class CountdownText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // in seconds
            time_remaining: props.duration,
        };

    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const time_remaining = this.state.time_remaining - 1;

            if(time_remaining <= 0) {
                this.props.exit();
            } else {
                this.setState({ time_remaining });
            }
        }, ONE_SECOND_MS);
    }

    componentWillUnMount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <h1>{ this.state.time_remaining }</h1>
        )
    }

}

export default CountdownText;