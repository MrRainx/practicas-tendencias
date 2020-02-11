import React from 'react'
import Table from 'react-bootstrap/Table'
import useAxios from "axios-hooks";
import { useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../../reducers/DOM/actions';
import { URL_FIREBASE_LAMBDA } from '../../CONS/urls';

const ListImagenes = () => {

    const dispatch = useDispatch()

    const [{ data, loading }, refresh] = useAxios({
        url: URL_FIREBASE_LAMBDA,
        method: 'POST',
        data: { opcion: '1' }
    })

    function handleOnClickTableRow(url) {
        dispatch(SHOW_MODAL({
            show: true,
            header: 'Visualizador de Imagenes',
            body: (<div className="text-center">
                <img className="img-fluid" src={url} alt={url} />
            </div>)
        }));
    }

    if (loading) {
        return (<div>
            <h1>CARGANDO IMAGNES DESDE FIREBASE</h1>
            <p>ESPERE POR FAVOR</p>
        </div>)
    }

    const tBodyComponent = Object.values(data.data).map((value, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td onClick={e => handleOnClickTableRow(value.url)}>{value.url}</td>
            <td>{value.usuario}</td>
        </tr>
    ))

    return (
        <div className="mt-2">
            <button className="btn btn-info btn-sm btn-block" onClick={refresh}>REFRESCAR</button>
            <Table size="sm" bordered hover responsive="sm" striped color="info" variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>URL Imagen</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {tBodyComponent}
                </tbody>
            </Table>
        </div>
    )
}

export default ListImagenes
