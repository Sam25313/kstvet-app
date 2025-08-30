import * as React from 'react';
import { useListContext, useDataProvider, useNotify } from 'react-admin';
import Button from '@mui/material/Button';
import SmsIcon from '@mui/icons-material/Sms';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const SendSmsButton = () => {
    const { selectedIds, onUnselectItems } = useListContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSend = async () => {
        if (!message) {
            notify('Please enter a message.', { type: 'warning' });
            return;
        }

        try {
            await dataProvider.sendBulkSms('users', {
                data: { userIds: selectedIds, message }
            });
            notify('Bulk SMS sent successfully!', { type: 'success' });
            setMessage('');
        } catch (error) {
            notify(`Error sending SMS: ${error.message}`, { type: 'error' });
        } finally {
            onUnselectItems();
            handleClose();
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                startIcon={<SmsIcon />}
                disabled={selectedIds.length === 0}
            >
                Send Bulk SMS ({selectedIds.length})
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Send Bulk SMS</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Message"
                        fullWidth
                        multiline
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSend} disabled={!message}>Send</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SendSmsButton;