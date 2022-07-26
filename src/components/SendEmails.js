import React, {useState} from 'react';
import {Button} from "@mui/material";
import axios from 'axios';
import {POST_SEND_EMAILS} from "../constants";

function SendEmails({setMessage}){
    const [isSending, setIsSending] = useState(false);

    async function handleSendEmailClick(){
        setIsSending(true);
        try {
            let response = await axios.post(POST_SEND_EMAILS, {});
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
        }
    }

    return (
        <div className='box send'>
            <Button
                variant="contained"
                onClick={handleSendEmailClick}
                disabled={isSending}
            >
                Send emails to all subscribed users
            </Button>
        </div>
    );
};

export default SendEmails;