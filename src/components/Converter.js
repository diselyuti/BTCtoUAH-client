import React, {useMemo, useState} from 'react';
import {IconButton, TextField, Typography} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

function Converter({currentRate}){
    const [isMainRate, setIsMainRate] = useState(true); // if BTCtoUAH -> isMainRate === true
    const [rateValue, setRateValue] = useState(1);
    const computedValue = useMemo(() => {
        let value = rateValue ? Number(rateValue) : 0;
        let rate = currentRate;
        if (isMainRate) return value * rate;
        else return value / rate;
    }, [currentRate, rateValue, isMainRate])

    const handleRateValueChange = (e) => {
        let value = e.target.value;
        if (value >= 0) setRateValue(value);
    }

    return (
        <div className='box converter'>
            <Typography
                variant="h5"
                component="div"
            >
                Converter
            </Typography>
            <div className='converter__inputs'>
                <TextField
                    label={isMainRate ? 'BTC' : 'UAH'}
                    type="number"
                    className='input'
                    value={rateValue}
                    onChange={handleRateValueChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <IconButton color="primary"
                            className='converter__swap'
                            title='Swap currencies'
                            component="label"
                            onClick={()=>{setIsMainRate(!isMainRate)}}
                >
                    <SwapHorizIcon/>
                </IconButton>
                <TextField
                    label={isMainRate ? 'UAH' : 'BTC'}
                    type="number"
                    className='input'
                    disabled
                    value={computedValue}
                    InputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </div>
    );
};

export default Converter;