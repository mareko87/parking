import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverLocation } from '../constants';
axios.defaults.withCredentials = true;
export default function Parkiraliste() {
    const [parkiralista, setParkiralista] = useState([]);
    const [naziv, setNaziv] = useState('');
    const [adresa, setAdresa] = useState('');
    const [kapacitet, setKapacitet] = useState(0);
    const [cenaSata, setCenaSata] = useState(0);
    const [selektovan, setSelektovan] = useState(-1);
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
        if (selektovan !== -1) {
            setNaziv(parkiralista[selektovan].naziv);
            setAdresa(parkiralista[selektovan].adresa);
            setKapacitet(parkiralista[selektovan.kapacitet]);
            setCenaSata(parkiralista[selektovan].cenaSata);
        } else {
            setNaziv('');
            setAdresa('');
            setKapacitet(0);
            setCenaSata(0);
        }

    }, [selektovan])
    const kreiraj = async () => {
        const res = await axios.post(serverLocation + '/parkiraliste', {
            naziv: naziv,
            adresa: adresa,
            kapacitet: kapacitet,
            cenaSata: cenaSata
        });
        setParkiralista(prev => {
            return [
                ...prev, {
                    id: res.data.id,
                    naziv: naziv,
                    adresa: adresa,
                    kapacitet: kapacitet,
                    cenaSata: cenaSata
                }
            ]
        })
        console.log(res);
    }
    const izmeni = async () => {
        const res = await axios.patch(serverLocation + '/parkiraliste/' + parkiralista[selektovan].id, {
            naziv: naziv,
            adresa: adresa,
            kapacitet: kapacitet,
            cenaSata: cenaSata
        });
        setParkiralista(prev => {
            return prev.map(element => {
                if (element === parkiralista[selektovan]) {
                    return {
                        ...element,
                        naziv: naziv,
                        adresa: adresa,
                        kapacitet: kapacitet,
                        cenaSata: cenaSata
                    }
                } else {
                    return element
                }
            })
        })
        setSelektovan(-1);
    }
    const obrisi = async () => {
        const res = await axios.delete(serverLocation + '/parkiraliste/' + parkiralista[selektovan].id);
        setParkiralista(prev => {
            return prev.filter(element => element !== parkiralista[selektovan]);
        })
        setSelektovan(-1);
    }
    return (
        <div className='container' >
            <div className='row mt-2'>
                <h2>Parkiralista</h2>
            </div>
            <div className='row mt-2'>
                <div className='col-8'>
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th>Naziv</th>
                                <th>Adresa</th>
                                <th>Kapacitet</th>
                                <th>Cena sata</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkiralista.map((element, index) => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.naziv}</td>
                                        <td>{element.adresa}</td>
                                        <td>{element.kapacitet}</td>
                                        <td>{element.cenaSata}</td>
                                        <td>
                                            <button className='form-control btn btn-success' onClick={(e) => {
                                                setSelektovan(index === selektovan ? -1 : index);
                                            }} >Izmeni</button>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                </div>
                <div className='col-4'>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <label >Naziv</label>
                        <input className='form-control' value={naziv} onChange={(e) => {
                            const value = e.target.value;
                            setNaziv(value);
                        }} type="text" />
                        <label >Adresa</label>
                        <input className='form-control' value={adresa} onChange={(e) => {
                            const value = e.target.value;
                            setAdresa(value);
                        }} type="text" />
                        <label >Kapacitet</label>
                        <input className='form-control' value={kapacitet} onChange={(e) => {
                            const value = e.target.value;
                            setKapacitet(value);
                        }} type="number" />
                        <label >Cena sata</label>
                        <input className='form-control' value={cenaSata} onChange={(e) => {
                            const value = e.target.value;
                            setCenaSata(value);
                        }} type="number" />
                        {
                            selektovan === -1 ? (
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    kreiraj();

                                }} className='form-control btn btn-primary form-control mt-2'>Kreiraj</button>
                            ) : (
                                    <>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            izmeni();

                                        }} className='form-control btn btn-primary form-control mt-2'>Izmeni</button>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            obrisi();

                                        }} className='form-control btn btn-danger form-control mt-2'>Obrisi</button>
                                    </>
                                )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
