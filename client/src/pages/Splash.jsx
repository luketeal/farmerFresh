import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export default function Splash() {
    return (
        <div>
            <div>
            <Link to="/login">
                <Button variant="contained" color="primary">
                    Sign in
                </Button>
            </Link>
            </div>
            <div>
                <Link to="/signup">
                    <Button variant="contained" color="primary">
                        Sign Up
                    </Button>
                </Link>
            </div>
            <div>
                <TextField id="outlined-basic" label="Search" variant="outlined" />
            </div>
        </div>
        
    )
}
