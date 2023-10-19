/* eslint-disable */
import React, { useState } from 'react';
import { Alert, Button, ButtonGroup, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function ChildModal() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full">
            <Button
                variant="contained"
                className="w-full"
                style={{
                    backgroundColor: '#14C61B',
                    color: 'white',
                    // border: '2px solid magenta',
                    fontSize: '1rem',
                    paddingTop: '3%',
                    paddingBottom: '3%',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                pay now
            </Button>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center"
            >
                <Box className="bg-white w-[20%] h-[20%] rounded-sm">
                    {/* <ChildModal /> */}
                    <p>Top Up Successful!</p>
                </Box>
            </Modal>
        </div>
    );
}

export default ChildModal;
