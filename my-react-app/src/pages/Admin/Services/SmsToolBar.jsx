import * as React from 'react';
import { Toolbar, SaveButton } from 'react-admin';
import { Button } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';

export const SmsPageToolbar = ({ ...props }) => (
    <Toolbar {...props}>
        {/* The SaveButton will trigger your onSubmit handler */}
        <SaveButton 
            label="Send"
            icon={<SmsIcon />}
            type="button" // Use type="button" to prevent form submission on click
            variant="contained" 
            {...props}
        />
    </Toolbar>
);