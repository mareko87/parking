import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverLocation } from '../constants'

export default function Racun() {
    const [racuni, setracuni] = useState([]);

    useEffect(() => {
        const fun = async () => {
            const res = await axios.get(serverLocation + '/racun');
            setracuni(res.data);
        }
        fun();
    }, [])


    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col-10'>
                    <h2>Racuni</h2>
                </div>
                <div className='col-2 pr-5'>
                    <Link to='/racunforma/0' >
                        <button className='form-control btn btn-primary'>Kreiraj</button>
                    </Link>
                </div>
            </div>

            <div className='rom mt-2'>
                <div className='col-12'>
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th>Kreirao</th>
                                <th>Datum kreiranja</th>
                                <th>Iznos</th>
                                <th>Detalji</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                racuni.map(element => {
                                    return (
                                        <tr key={element.key}>
                                            <td>{element.user.username}</td>
                                            <td>{element.datumKreiranja}</td>
                                            <td>{element.iznos.toFixed(2)}RSD</td>
                                            <td>
                                                <Link to={'/racunforma/' + element.id}>
                                                    <button className='form-control btn btn-success'>Vidi</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
