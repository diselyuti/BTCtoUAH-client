import React from 'react';
import {IconButton, Typography} from "@mui/material";
import {UpdateOutlined} from '@mui/icons-material';

function Header({currentRate, lastUpdated, getRate}) {
    return (
        <div className='header'>
            <div className='box header__title'>
                <Typography
                    variant="h4"
                    component="div"
                >
                    BTC to UAH
                </Typography>
            </div>
            <div className='box header__rate header_padding'>
                <div>
                    <Typography
                        variant="h5"
                        component="div"
                        gutterBottom
                    >
                        {
                            currentRate ?
                                `1 BTC = ${currentRate} UAH`
                                :
                                `Loading data...`
                        }
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                    >
                        {`Last updated: ${lastUpdated}`}
                    </Typography>
                </div>
                <IconButton color="primary"
                            className='header__update'
                            title='Update rate'
                            component="label"
                            onClick={getRate}
                >
                    <UpdateOutlined/>
                </IconButton>
            </div>
        </div>
    );
}

export default Header;
