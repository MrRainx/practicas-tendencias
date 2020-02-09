import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SET_SELECTED_USUARIO } from '../../reducers/Firebase/actions'
import useAxios from "axios-hooks";

const ToolBar = () => {

    const dispatch = useDispatch()
    const [usuariosRequest, refresh] = useAxios('http://127.0.0.1:8000/get-usuarios')

    useEffect(() => {

        if (usuariosRequest.data) {
            if (usuariosRequest.data['usuarios'].length > 0) {
                dispatch(SET_SELECTED_USUARIO(usuariosRequest.data.usuarios[0]))
            }
        }
    }, [usuariosRequest.data, dispatch])

    function handleOnSelectUsuario(event) {
        dispatch(SET_SELECTED_USUARIO(event.target.value))
    };

    function handleOnRefresh(event) {
        event.preventDefault()
        refresh()
    }

    if (usuariosRequest.loading) {
        return 'CARGANDO USUARIOS...';
    }

    const usuarios = usuariosRequest.data['usuarios']


    return (
        <form className="form-inline mt-2">
            <div className="form-group">

            </div>
            <div className="input-group">
                <select className="custom-select" onChange={handleOnSelectUsuario}>
                    {
                        usuarios.map((value, index) => (
                            <option key={index}>{value}</option>
                        ))
                    }
                </select>
                <div className="input-group-append">
                    <button className="btn btn-primary btn-sm" onClick={handleOnRefresh}>Refrescar</button>
                </div>
            </div>
        </form>

    )
}

export default ToolBar
