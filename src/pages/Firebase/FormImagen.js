import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_USUARIO, CHANGE_IMAGEN, RESET_FORM } from "../../reducers/Firebase/actions";
import uuid from "uuid";
import { SHOW_MODAL } from "../../reducers/DOM/actions";
import useAxios from "axios-hooks";
import { URL_API, URL_FIREBASE_LAMBDA } from '../../CONS/urls';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


const FormImagen = () => {

    const dispatch = useDispatch()

    /**
     * STATES
     */
    const { Firebase } = useSelector(state => state)

    const { form } = Firebase

    const [imagenRequest, subirImagen] = useAxios({
        url: `${URL_API}subir-imagen`,
        method: 'POST'
    },
        { manual: true }
    )

    const [firebaseRequest, publicarEnFibrebase] = useAxios({
        url: URL_FIREBASE_LAMBDA,
        method: 'POST'
    }, { manual: true })

    /**
     * HANDLERS
     */

    function handleOnUsuarioChance(event) {
        const { value } = event.target
        dispatch(CHANGE_USUARIO(value))
    }

    function handleOnImagenChange(event) {
        const { files } = event.target

        const { name, type } = files[0]

        toBase64(files[0])
            .then(archivo => {
                const tipo = type.split('/')[1];
                const ind = archivo.indexOf(',');
                const b64 = archivo.substring(ind + 1);

                dispatch(CHANGE_IMAGEN({
                    value: name,
                    b64,
                    nombre: `${uuid.v4()}.${tipo}`
                }))
            })
        //dispatch(CHANGE_IMAGEN())
    }

    async function handleOnSubmit(event) {
        event.preventDefault()
        if (''.includes(form.usuario) || ''.includes(form.imagen.value)) {

            dispatch(SHOW_MODAL({
                show: true,
                header: <h6 className="text-danger font-weight-bold">ERROR!!</h6>,
                body: <p className="font-weight-bold">RELLENE EL FORMULARIO CORRECTAMENTE</p>
            }));

        } else {

            const res = await subirImagen({
                data: JSON.stringify({
                    imagen: form.imagen.b64,
                    nombre: form.imagen.nombre
                })
            })

            const resFirebase = await publicarEnFibrebase({
                data: {
                    opcion: '2',
                    data: {
                        usuario: form.usuario,
                        url: res.data.url
                    }
                }
            })

            dispatch(RESET_FORM())

        }
    }

    if (imagenRequest.loading) {
        return (
            <div className="col-12 my-5 py-5">
                <h1>SUBIENDO IMAGEN A S3</h1>
                <p>ESPERE POR FAVOR...</p>
            </div>
        )
    }

    if (firebaseRequest.loading) {
        return (
            <div className="col-12 my-5 py-5">
                <h1>PUBLICANDO EN FIREBASE</h1>
                <p>ESPERE POR FAVOR...</p>
            </div>
        )
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label>Usuario:</label>
                        <input className="form-control form-control-sm"
                            type="text"
                            name="usuario"
                            value={form.usuario}
                            onChange={handleOnUsuarioChance}
                        />
                    </div>
                    <div className="form-group">
                        <label>Imagen:</label>
                        <div className="custom-file">
                            <label className="custom-file-label text-truncate">{form.imagen.value}</label>
                            <input className="custom-file-input"
                                type="file"
                                name="imagen"
                                onChange={handleOnImagenChange}
                            />
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        <div className="col-md-4">
                            <button className="btn btn-info btn-sm btn-block">
                                Subir Imagen
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormImagen
