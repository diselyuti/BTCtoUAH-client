import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IconButton, Snackbar} from "@mui/material";
import {Close} from '@mui/icons-material';
import Header from "./components/Header";
import Converter from "./components/Converter";
import AddUser from "./components/AddUser";
import {GET_RATE} from "./constants";
import SendEmails from "./components/SendEmails";
import Contact from "./components/Contact";

function App() {
    const [currentRate, setCurrentRate] = useState([]);
    const [lastUpdated, setLastUpdated] = useState('');
    const [message, setMessage] = useState({
        show: false,
        text: '',
    });

    useEffect(()=>{
        getRate();
    }, []);

    async function getRate(){
        try {
            const response = await axios.get(GET_RATE);
            setCurrentRate(response.data);
            setLastUpdated((new Date()).toUTCString());
            setMessage({
                show: true,
                text: 'Successfully updated rate',
            });
        }catch (e) {
            setMessage({
                show: true,
                text: 'Error while updating rate',
            });
            console.log(e);
        }
    }

    const onCloseSnackbar = () => setMessage({...message, show: false});

    const closeSnackbar = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onCloseSnackbar}
        >
            <Close fontSize="small" />
        </IconButton>
    );

    return (
        <div className="app">
            <Header currentRate={currentRate} getRate={getRate} lastUpdated={lastUpdated}/>
            <Converter currentRate={currentRate}/>
            <AddUser setMessage={setMessage}/>
            <SendEmails setMessage={setMessage}/>
            <Contact setMessage={setMessage}/>
            <Snackbar
                open={message.show}
                onClose={onCloseSnackbar}
                message={message.text}
                autoHideDuration={1500}
                action={closeSnackbar}
            />
        </div>
    );
}

export default App;
