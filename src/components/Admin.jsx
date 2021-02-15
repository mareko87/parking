import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverLocation } from '../constants';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
axios.defaults.withCredentials = true;

export default function Admin() {
    const [korisnici, setKorisnici] = useState([]);
    const [parkiralista, setParkiralista] = useState([])
    const [boravci, setBoravci] = useState([])
    useEffect(() => {
        const fun = async () => {
            const res = await axios.get(serverLocation + '/user');
            console.log(res.data);
            setKorisnici(res.data)
        };
        fun();
    }, [])
    useEffect(() => {
        const func = async () => {
            try {
                const data = (await axios.get(serverLocation + '/parkiraliste', { withCredentials: true })).data;

                setParkiralista(data);
            } catch (error) {

            }
        }
        func();
    }, [])
    useEffect(() => {
        const fun = async () => {
            const res = await axios.get(serverLocation + '/boravak');
            setBoravci(res.data);
        }
        fun();
    }, [])
    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col-12'>
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th>Ime</th>
                                <th>Prezime</th>
                                <th>Username</th>
                                <th>Odobren</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                korisnici.filter(element => element.category !== 'admin').map(element => {
                                    return (
                                        <tr key={element.id}>
                                            <td>{element.firstName}</td>
                                            <td>{element.lastName}</td>
                                            <td>{element.username}</td>
                                            <td>
                                                {element.odobren ? (
                                                    <td>Odobren</td>
                                                ) : (
                                                        <button className='form-control btn btn-success' onClick={async (e) => {
                                                            const res = await axios.post(serverLocation + '/verify', { id: element.id });
                                                            setKorisnici(prev => {
                                                                return prev.map(kor => {
                                                                    if (element !== kor) {
                                                                        return kor;
                                                                    }
                                                                    return {
                                                                        ...kor, odobren: true
                                                                    }
                                                                })
                                                            })
                                                        }}>Odobri</button>
                                                    )}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row mt-4'>
                <h2>Popularnost parkiralista</h2>
            </div>
            <div className='row mt-2'>
                <div className='col-12'>
                    <BarChart
                        width={800}
                        height={600}
                        data={
                            parkiralista.map(park => {
                                return {
                                    name: park.naziv,
                                    brojDolazaka: boravci.filter(element => element.parkiraliste.id === park.id).length,
                                    prihod: boravci.filter(element => element.parkiraliste.id === park.id).reduce((prev, curr) => {
                                        return prev + (curr.vremeIzlaska && curr.placen) ? ((new Date(curr.vremeIzlaska).getTime() - new Date(curr.vremeUlaska).getTime()) * park.cenaSata / (360000)) : 0;
                                    }, 0)
                                }
                            })
                        }
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="brojDolazaka" fill="#8884d8" />
                        <Bar name='prihod(RSD)' dataKey="prihod" fill="#8824d8" />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}
