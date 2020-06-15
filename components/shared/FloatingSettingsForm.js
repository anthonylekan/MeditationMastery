import React, { useState } from 'react';

import { Form, Container, Checkbox, Button } from 'semantic-ui-react';
import FloatingWidget from "./FloatingWidget";

function FloatingSettingsForm(props) {
    const [is_form_active, set_is_form_active] = useState(false);

    // ref: https://jetsloth.com/gravity-forms/create-a-fixed-widget-contact-form/
    return (
        <React.Fragment>
            <style jsx>{`
                .form-wrap {
                    z-index: 9999999;
                    position: fixed;
                    bottom: 40px;
                    left: 40px;
                }
                .form-badge {
                    background: #71C28E; /*Change this colour to change the circle*/
                    width: 60px;
                    height: 60px;
                    border-radius: 100%;
                    box-shadow: 0px 3px 3px rgba(0,0,0,0.1);
                    transition: all 0.1s ease-in-out;
                    transform: scale(1.0);
                    float: right;
                }
                .form-badge div {
                    position: relative;
                    left: 50%;
                    transform: translate(-50% ,-50%);
                    top: 50%;
                    border: none!important;
                    width: 80%!important;
                }
                .form-badge:hover {
                    transform: scale(1.1);
                    cursor: pointer;
                }
                .form-panel {
                    width: 373px; /*Panel width*/
                    height: auto; /*Panel height*/
                    max-width: 400px; /*Mac Panel width*/
                    max-height: 800px; /*Max Panel height*/
                    background: #F9FAFA;
                    box-shadow: 5px 5px 20px 0 rgba(0,0,0,0.10);
                    position: absolute;
                    bottom: 40px;
                    left: 0px;
                    transition: all 0.3s ease-in-out;
                    opacity: 0;
                    border-radius: 4px;
                    overflow: hidden;
                    padding:30px;
                    border:1px solid #D9E0E3;
                }
                .panel-active {
                    bottom: 80px;
                    opacity: 100;
                }
                .form.no-label > .gfield_label {
                    display: none;
                }
                .form-panel input[type="submit"] {
                    width:100%
                }
            `}</style>
            <div className="form-wrap">
                <div className={`form-panel ${is_form_active ? 'panel-active' : ''}`}>
                    <Container>
                        <Form>
                            <Form.Field>
                                <label>Session Duration</label>
                                <input placeholder='5 minutes' type="number" />
                            </Form.Field>
                            <Form.Field>
                                <label>Infinite Session?</label>
                                <Checkbox label={<label>Session will play as long as the window is open </label>}/>
                            </Form.Field>
                            <Button type='submit' primary disabled>Save</Button>
                            <Button type='cancel'>Close</Button>
                        </Form>
                    </Container>
                </div>
                <div className="form-badge">
                    <FloatingWidget style={{}} onClick={() => { set_is_form_active(!is_form_active) }}/>
                </div>
            </div>
        </React.Fragment>
    )

}

export default FloatingSettingsForm;