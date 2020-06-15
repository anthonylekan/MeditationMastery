import React from 'react';

function InstructionText(props) {

    return (
        <React.Fragment>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

                h1 {
                    font-size: 40px;
                    font-weight: 300;
                    font-family: 'Robot', Monospace;
                    color: white;
                    text-align: center;
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-shadow: 2px 2px #000;
                }

                @keyframes flickerAnimation {
                  0%   { opacity:1; }
                  50%  { opacity:0; }
                  100% { opacity:1; }
                }

                @-o-keyframes flickerAnimation{
                  0%   { opacity:1; }
                  50%  { opacity:0; }
                  100% { opacity:1; }
                }

                @-moz-keyframes flickerAnimation{
                  0%   { opacity:1; }
                  50%  { opacity:0; }
                  100% { opacity:1; }
                }

                @-webkit-keyframes flickerAnimation{
                  0%   { opacity:1; }
                  50%  { opacity:0; }
                  100% { opacity:1; }
                }

                .animate-flicker {
                   -webkit-animation: flickerAnimation 5s infinite;
                   -moz-animation: flickerAnimation 5s infinite;
                   -o-animation: flickerAnimation 5s infinite;
                    animation: flickerAnimation 5s infinite;
                }

            `}</style>
            <div className="container">
                <h1 className="animate-flicker">{ props.children }</h1>
            </div>
        </React.Fragment>
    )

}

export default InstructionText;