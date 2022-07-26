import React, {useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import axios from 'axios';
import {POST_CONTACT} from "../constants";

function SendEmails({setMessage}){
    const [isSending, setIsSending] = useState(false);
    const [contact, setContact] = useState({
        email: '',
        text: '',
    })

    async function handleSendContactClick(){
        setIsSending(true);
        try {
            if (!contact.email.length || !contact.text.length){
                setMessage({
                    text: 'Please, fill fields',
                    show: true,
                });
                return;
            }
            let response = await axios.post(POST_CONTACT, {
                email: contact.email,
                text: contact.text,
            });
            setMessage({
                text: response.data.message,
                show: true,
            });
        }catch(e) {
            setMessage({
                text: e.response.data.message,
                show: true,
            });
        }finally {
            setIsSending(false);
            setContact({
                email: '',
                text: '',
            })
        }
    }

    return (
        <div className='box contact'>
            <Typography
                variant="h5"
                component="div"
                className='contact__title'
            >
                Contact me:
            </Typography>
            <div className='contact__inputs'>
                <TextField
                    label='Email'
                    type="text"
                    className='input contact__email'
                    value={contact.email}
                    onChange={(e) => {setContact({...contact, email: e.target.value})}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label='Text'
                    type="text"
                    className='input contact__text'
                    value={contact.text}
                    onChange={(e) => {setContact({...contact, text: e.target.value})}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    className='contact__button'
                    variant="contained"
                    disabled={isSending}
                    onClick={handleSendContactClick}
                >Contact!</Button>
            </div>
        </div>
    );
};

export default SendEmails;