import axios from 'axios';
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { serverLocation } from '../constants';
import * as querystring from 'querystring'

export default withRouter(function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [greska, setGreska] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(serverLocation + '/login', querystring.stringify({

                username: username,
                password: password
            }),
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );
            props.setUser(result.data);

        } catch (error) {
            setGreska('doslo je do greske prilikom prijave')
        }
    }
    return (
        <div className='container'>
            {
                greska && <div className='row mt-2'>{greska}</div>
            }
            <form onSubmit={onSubmit} >
                <label >Username</label>
                <input className='form-control' type="text" value={username} onChange={(e) => {
                    const value = e.target.value;
                    setUsername(value);
                }} />
                <label >Password</label>
                <input className='form-control' type="password" value={password} onChange={(e) => {
                    const value = e.target.value;
                    console.log(e);
                    setPassword(value);
                }} />
                <button className='form-control btn btn-primary mt-2' >Login</button>
                <button className='form-control btn btn-success mt-2' onClick={(e) => {
                    e.preventDefault();

                    props.history.push('/register');
                }}>Register</button>
            </form>
        </div>
    )
})
