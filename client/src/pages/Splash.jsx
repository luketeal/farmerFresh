import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export default function Splash() {
    return (
        <div className="bg-success">
            <div className="container">
                <div className="row">
                    <div className="logo">
                        <h1 className="App-logo">
                            FARMER FRESH
                        </h1>
                    </div>
                </div>
                <div className="row">

                </div>
                <div className="row">
                    
                </div>
                <div className="mb-4">
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
        </div>
        
    )
}
