
import React, { useState } from 'react'
import useAxios from "axios-hooks";

const intialInput = { value: '', file: null }
const ImagenS3 = () => {

    const [input, setInput] = useState(intialInput);


    const [{ data, loading, error }, subirImagen] = useAxios({
        url: 'http://practicatendencias-env.bmcingrtpt.us-east-1.elasticbeanstalk.com/imagen',
        method: 'POST'
    },
        { manual: true }
    )

    function handleOnChange(event) {
        setInput({
            value: event.target.value,
            file: event.target.files[0]
        })
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        if (input.value) {
            const formData = new FormData()
            formData.append('imagen', input.file)
            setInput(intialInput)

            subirImagen({
                data: formData
            })

        }
    }

    if (loading) {
        return 'PROCESANDO....'
    }

    if (error) {
        return `HA OCURRIDO UN ERROR:\n${error}`
    }


    return (
        <div className="container" style={{ marginTop: '10%' }}>

            <div className="row justify-content-center">
                <data className="col-12">
                    <div className="data-group">
                        <label>
                            Seleccionar una Imágen:
                </label>
                        <input
                            className=" data-control-file"
                            type="file"
                            value={input.value}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button className="btn btn-info btn-sm" onClick={handleOnSubmit}>Subir Archivo</button>
                </data>

                <div className="col-12">

                    {
                        data && <img className="img-fluid" src={data.url} alt="IMAGEN" />
                    }

                </div>
            </div>




        </div>
    );
}

export default ImagenS3