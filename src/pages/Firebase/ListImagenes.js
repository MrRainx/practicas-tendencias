import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import useAxios from "axios-hooks";
import { useSelector, useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../../reducers/DOM/actions';
const ListImagenes = () => {

    const [imagenes, setImagenes] = useState([])

    const { selectedUsuario } = useSelector(state => state.Firebase)

    const dispatch = useDispatch()

    const [imagenesRequest, getImagenes] = useAxios({
        url: `http://127.0.0.1:8000/get-imagenes/${selectedUsuario}`,
        method: 'GET'
    }, { manual: true })


    useEffect(() => {
        if (selectedUsuario !== '') {
            getImagenes()
        }
    }, [selectedUsuario, getImagenes])

    useEffect(() => {
        if (imagenesRequest.data) setImagenes(imagenesRequest.data['imagenes']);
    }, [imagenesRequest.data])

    function handleOnClickTableRow(url) {
        dispatch(SHOW_MODAL({
            show: true,
            header: 'Visualizador de Imagenes',
            body: (<div className="text-center">
                <img className="img-fluid" src={url} alt={url} />
            </div>)
        }));
    }

    if (imagenesRequest.loading) {
        return `CARGANDO IMAGENES DE ${selectedUsuario}`
    }

    return (
        <div className="mt-2">
            <Table size="sm" bordered hover responsive="sm" striped color="info" variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>URL Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        imagenes.map((value, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td onClick={e => handleOnClickTableRow(value)}>{value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ListImagenes
