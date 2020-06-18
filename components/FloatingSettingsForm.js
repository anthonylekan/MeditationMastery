import React, { useState } from 'react';

import { Header, Form, Container, Divider, Input, Item, Checkbox, Button } from 'semantic-ui-react';
import FloatingWidget from "./FloatingWidget";

function FloatingSettingsForm(props) {
    const settings = props.settings;
    const update_setting = props.update_setting;
    const start = props.start;

    const [local_license_key, set_local_license_key] = useState(props.license_key);
    const [is_form_active, set_is_form_active] = useState(false);

    function toggle_form() {
        set_is_form_active(!is_form_active);
    }

    function handle_check(property) {
        return (event, data) => {
            update_setting(property, data.checked);
        }
    }

    function handle_text(property) {
        return (event) => {
            update_setting(property, event.target.value);
        }
    }

    const is_pro = settings.license_key;

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
                        <Header size="large">Meditation Mastery</Header>
                        <Form>
                            <Form.Field>
                                <label>Session Duration (Minutes)</label>
                                <Input min={1} disabled={settings.is_infinite} placeholder='5 minutes' type='number' value={settings.duration} onChange={handle_text('duration')} />
                            </Form.Field>

                            <Divider horizontal>PRO SETTINGS</Divider>

                            <Form.Field hidden={is_pro}>
                                <label><a href="https://www.google.com">Unlock Pro by Buying a License Key</a></label>
                                <Input icon={{ name: 'arrow alternate circle right outline', circular: true, link: true, onClick: (e) => { update_setting('license_key', local_license_key); } }} placeholder='Enter License Key' onChange={(e) => { set_local_license_key(e.target.value); }}/>
                            </Form.Field>

                            <Form.Field disabled={!is_pro}>
                                <label>Floating Text</label>
                                <Input placeholder='Display a message during your session' onChange={handle_text('floating_text')}/>
                            </Form.Field>

                            <Form.Field disabled={!is_pro}>
                                <label>Infinite Session?</label>
                                <Checkbox checked={settings.is_infinite} onChange={handle_check('is_infinite')} label={<label>Session will play as long as the window is open</label>}/>
                            </Form.Field>

                            <Form.Field disabled={!is_pro}>
                                <label>Keep Zen Background?</label>
                                <Checkbox checked={settings.keep_picture_background} onChange={handle_check('keep_picture_background')} label={<label>Session will play with Picture Background</label>}/>
                            </Form.Field>

                            <Form.Field disabled={!is_pro}>
                                <label>Full Screen?</label>
                                <Checkbox checked={settings.full_screen} onChange={handle_check('full_screen')} label={<label>The Session will start in full screen. (Click ESC to exit)</label>}/>
                            </Form.Field>

                            <Button onClick={() => { toggle_form() }}>Close</Button>
                            <Button positive={true} basic={true} onClick={() => { start() }}>Start</Button>
                            { is_pro && <Button basic={true} negative={true} onClick={() => { update_setting('license_key', ''); set_local_license_key(''); }} >Sign Out</Button> }
                        </Form>
                    </Container>
                </div>
                <FloatingWidget onClick={() => { toggle_form() }}/>
            </div>
        </React.Fragment>
    )

}

export default FloatingSettingsForm;