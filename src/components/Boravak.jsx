import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { serverLocation } from '../constants';
axios.defaults.withCredentials = true;


export default function Boravak() {
    const [boravci, setBoravci] = useState([]);
    const [parkiralista, setParkiralista] = useState([]);
    const [vozila, setVozila] = useState([])
    const [registracija, setRegistracija] = useState('');
    const [selPar, setSelPar] = useState(undefined);
    const [selVozilo, setSelVozilo] = useState(0);
    const [selParSearch, setSelParSearch] = useState(0);
    useEffect(() => {
        const func = async () => {
            try {
                const data = (await axios.get(serverLocation + '/parkiraliste', { withCredentials: true })).data;
                console.log(data);
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
    useEffect(() => {
        const fun = async () => {
            const res = await axios.get(serverLocation + '/vozilo');
            setVozila(res.data);
        }
        fun();
    }, [])
    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col-9'>
                    <div className='row mt-2'>
                        <div className='col-3 pl-3'>
                            <label >Parkiraliste</label>
                            <select value={selParSearch} className='form-control' onChange={e => {
                                const value = parseInt(e.target.value);
                                setSelParSearch(value);
                            }}>
                                <option value="0">
                                    Sva parkiralista
                                </option>
                                {
                                    parkiralista.map(element => {
                                        return (
                                            <option value={element.id} >{element.naziv}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-6'>

                        </div>
                        <div className='col-3 pr-3'>
                            <label >Vozilo</label>
                            <select value={selVozilo} className='form-control' onChange={e => {
                                const value = e.target.value;
                                setSelVozilo(value);
                            }}>
                                <option value="0">
                                    Sva vozila
                                   
                                </option>
                                {
                                        vozila.map(element => {
                                            return (
                                                <option value={element.registracija} >{element.registracija}</option>
                                            )
                                        })
                                    }
                            </select>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-12'>

                            <table className='table table-dark'>
                                <thead>
                                    <tr>
                                        <th>Vozilo</th>
                                        <th>Parkiraliste</th>
                                        <th>Vreme ulaska</th>
                                        <th>Vreme izlaska</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boravci.filter(element=>{
                                        return (selVozilo==0 || element.vozilo.registracija===selVozilo) && (selParSearch==0 || element.parkiraliste.id===selParSearch)
                                    }).map((element, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{element.vozilo.registracija}</td>
                                                <td>{element.parkiraliste?.naziv}</td>
                                                <td>{element.vremeUlaska}</td>
                                                <td>{element.vremeIzlaska || (
                                                    <button className='form-control btn btn-success mt-1' onClick={async (e) => {
                                                        const vreme = new Date();
                                                     
                                                        await axios.post(serverLocation + '/boravak/napusti', {
                                                            registracija: element.vozilo.registracija,
                                                            parkiralisteId: element.parkiraliste.id,
                                                            vremeUlaska:element.vremeUlaska,
                                                            vremeIzlaska: vreme.toISOString()
                                                        });
                                                        setBoravci(prev => {
                                                            return prev.map(bor => {
                                                                if (bor === element) {
                                                                    return {
                                                                        ...bor,
                                                                        vremeIzlaska: vreme.toISOString()
                                                                    }
                                                                }
                                                                return bor;
                                                            })
                                                        })
                                                    }}>Izvrsi</button>
                                                )}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <form onSubmit={e => e.preventDefault()}>
                        <label >Vozilo</label>
                        <input className='form-control' type="text" value={registracija} onChange={e => {
                            const value = e.target.value;
                            setRegistracija(value);
                        }} />
                        <label >Parkiraliste</label>
                        <select className='form-control' value={selPar} onChange={e => {
                            const value = e.target.value;
                            setSelPar(value);
                        }} >
                            <option value="0">Izaberite parkiraliste </option>
                            {parkiralista.map(element => {
                                return (
                                    <option value={element.id} >
                                        {element.naziv}
                                    </option>
                                )
                            })}
                        </select>
                        <button disabled={!selPar} className='form-control btn btn-primary mt-2' onClick={async (e) => {
                            e.preventDefault();
                            const vremeU = new Date();
                            console.log('pre');
                            try {
                                const res = await axios.post(serverLocation + '/boravak', {
                                    parkiralisteId: selPar,
                                    registracija: registracija,
                                    vremeUlaska: vremeU.toISOString()

                                });
                            } catch (error) {
                                console.log('error')
                                console.log(error);
                            }

                            console.log('await')
                            setBoravci(prev => {
                                return [...prev, {
                                    vozilo: {
                                        registracija: registracija,

                                    },
                                    parkiraliste: parkiralista.find(element => element.id == selPar),
                                    vremeUlaska: vremeU.toISOString(),
                                    vremeIzlaska: undefined
                                }]
                            })
                        }}>Kreiraj</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
