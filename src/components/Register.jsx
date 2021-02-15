import axios from 'axios';
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { serverLocation } from '../constants';

export default withRouter(function Register(props) {

    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [godine, setGodine] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('')

    return (
        <div className='container'>
            <form onSubmit={(e) => { e.preventDefault() }} >
                <label >Ime</label>
                <input className='form-control' value={ime} onChange={(e) => {
                    const value = e.target.value;
                    setIme(value);
                }} type="text" />
                <label >Prezime</label>
                <input className='form-control' value={prezime} onChange={(e) => {
                    const value = e.target.value;
                    setPrezime(value)
                }} type="text" />
                <label >Godine </label>
                <input className='form-control' value={godine} onChange={(e) => {
                    const value = e.target.value;
                    setGodine(parseInt(value));
                }} type="number" />
                <label >Username</label>
                <input className='form-control' value={username} onChange={(e) => {
                    const value = e.target.value;
                    setUsername(value);
                }} type="text" />
                <label >Sifra</label>
                <input className='form-control' value={password} onChange={(e) => {
                    const value = e.target.value;
                    setpassword(value);
                }} type="password" />
                <button className='form-control btn btn-success mt-2' onClick={async (e) => {
                    e.preventDefault();
                    try {
                        const result = await axios.post(serverLocation + '/register', {
                            username: username,
                            firstName: ime,
                            lastName: prezime,
                            age: godine,
                            password: password
                        })
                        if (result.status === 200) {
                            props.history.push('/')
                        }
                    } catch (error) {

                    }
                }} >Register</button>
            </form>
        </div>
    )
}
)