import React, {useState} from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Typography
} from "@mui/material";
import {POST_EMAIL} from "../constants";

function AddUser({setMessage}){
    const [email, setEmail] = useState('');
    const [helperText, setHelperText] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleEmailValueChanged = (e) => {
        if (validateEmail(e.target.value)) setHelperText('Email correct');
        else setHelperText('Email incorrect');
        setEmail(e.target.value);
    }

    async function handleAddEmailClick(){
        if (!validateEmail(email)) {
            setMessage({
                text: 'Email not validated, please enter a valid email',
                show: true,
            });
            return;
        }
        try {
            let response = await axios.post(POST_EMAIL, {
                email: email
            });
            setMessage({
                text: response.data.message,
                show: true,
            });
        }catch (e){
            setMessage({
                text: e.response.data.message,
                show: true,
            });
        }finally {
            setEmail('');
            setHelperText('');
        }
    }

    return (
        <div className='box add'>
            <Typography
                variant="h5"
                component="div"
            >
                Add mailing list email
            </Typography>
            <div className='add__input'>
                <TextField
                    label='Email'
                    type="text"
                    className='input'
                    value={email}
                    onChange={handleEmailValueChanged}
                    helperText={helperText}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleAddEmailClick}
                >Add</Button>
            </div>
        </div>
    );
};

export default AddUser;