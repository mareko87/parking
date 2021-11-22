import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { serverLocation } from '../constants';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default withRouter(function RacunForma(props) {
    const [racun, setRacun] = useState(undefined);
    const [boravci, setBoravci] = useState([]);
    const [iznos, setIznos] = useState(0);

    useEffect(() => {
        setIznos(izracunajIznos());
    }, [boravci])
    useEffect(() => {
        const fun = async () => {
            const borData = await (await axios.get(serverLocation + '/boravak')).data;
            setBoravci(borData);
            console.log(props);
            console.log(borData);
            if (props.match.params.id != 0) {
                const racunData = (await axios.get(serverLocation + '/racun/' + props.match.params.id)).data;
                setRacun(racunData);
                console.log(racunData);
            }
        }

        fun();
    }, []);
    const izracunajIznos = () => {
        const izabraniBoravci = boravci.filter(element => element.checked);
        let iznos = 0;
        for (let boravak of izabraniBoravci) {
            iznos += (new Date(boravak.vremeIzlaska).getTime() - new Date(boravak.vremeUlaska).getTime()) * boravak.parkiraliste.cenaSata / 360000;
        }
        return iznos;
    }
    return (
        <div className='container'>
            {
                racun ? (
                    <>
                        <h1>Racun detaljno</h1>
                        <div className='row mt-2'>
                            <div className='col-12'>
                                <form className='form-inline'>
                                    <label>Kreirao</label>
                                    <input type="text" className='form-control mr-3 ml-3' readOnly value={racun.user.username} />
                                    <label>Datum kreiranja</label>
                                    <input type="text" className='form-control mr-3 ml-3' readOnly value={racun.datumKreiranja} />
                                    <label>Iznos</label>
                                    <input type="text" className='form-control mr-3 ml-3' readOnly value={racun.iznos} />

                                </form>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <h3>Spisak boravaka</h3>
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
                                    {boravci.filter(element => element.racun?.id == racun.id).map((element, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{element.vozilo.registracija}</td>
                                                <td>{element.parkiraliste?.naziv}</td>
                                                <td>{element.vremeUlaska}</td>
                                                <td>{element.vremeIzlaska}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                        <>
                            <h1>Kreiraj racun</h1>
                            <div className='row mt-2'>
                                <label >Iznos</label>
                                <input type="text" className='form-control' disabled value={iznos} />
                            </div>
                            <div className='row mt-3'>
                                <table className='table table-dark'>
                                    <thead>
                                        <tr>
                                            <th>Vozilo</th>
                                            <th>Parkiraliste</th>
                                            <th>Vreme ulaska</th>
                                            <th>Vreme izlaska</th>
                                            <th>Dodaj</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boravci.filter(element => !element.racun).map((element, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{element.vozilo.registracija}</td>
                                                    <td>{element.parkiraliste?.naziv}</td>
                                                    <td>{element.vremeUlaska}</td>
                                                    <td>{element.vremeIzlaska}</td>
                                                    <td>
                                                        <input type="checkbox" checked={element.checked} value={element.checked} onChange={(e) => {
                                                            setBoravci(prev => {
                                                                return prev.map(bor => {
                                                                    if (bor === element) {
                                                                        return { ...bor, checked: !bor.checked }
                                                                    }
                                                                    return bor;
                                                                })
                                                            })
                                                        }} className='form-control' />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className='row mt-2'>
                                <button disabled={iznos === 0} onClick={async (e) => {
                                    const res = await axios.post(serverLocation + '/racun', {
                                        datumKreiranja: new Date().toISOString(),
                                        iznos: iznos,
                                        boravci: boravci.filter(element => element.checked).map(element => {
                                            return {
                                                vozilo: element.vozilo,
                                                parkiraliste: element.parkiraliste,
                                                vremeUlaska: element.vremeUlaska
                                            }
                                        })

                                    })
                                    props.history.push('/racun')
                                }} className='form-control btn btn-primary mt-2'>Kreiraj</button>
                            </div>
                        </>
                    )
            }
        </div>
    )
}
)