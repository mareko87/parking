import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverLocation } from '../constants';
axios.defaults.withCredentials = true;
export default function Navbar(props) {
    const [vreme, setVreme] = useState(undefined);

    useEffect(() => {
        const fun = async () => {
            const data = await (await axios.get(serverLocation + '/vreme')).data;
            setVreme(data);
        }
        fun();
    }, [])
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" >Parking servis</a>
                {
                    vreme && (
                        <div className='collapse navbar-collapse'>
                            <span className='text-white'>Temperatura:{vreme.temp2m?.max}F</span>
                        </div>
                    )
                }
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <Link className="nav-link" to='/parkiraliste'>Parkiralista</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/boravak'>Boravak</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/racun'>Racuni</Link>
                        </li>
                        {
                            props.admin && (
                                <li className="nav-item">
                                    <Link className="nav-link" to='/admin'>Admin</Link>
                                </li>
                            )
                        }

                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href='#' onClick={async (e) => {
                                e.preventDefault();
                                const res = await (await axios.post(serverLocation + '/logout')).data;
                                props.setUser(undefined);
                            }} >Logout</a>
                        </li>

                    </ul>
                </div>
            </nav>
        </header>
    )
}
