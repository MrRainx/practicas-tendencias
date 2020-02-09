import React from 'react'
import FormImagen from './FormImagen';
const inProgress = false;

const Firebase = () => {


    if (inProgress) return 'AHORITA NO... VUELVA MAS TARDE :v';

    return (
        <div className="container">
            <div className="text-center">
                <h1 className="display-4">Ejemplo de Firebase</h1>
            </div>
            <FormImagen />

        </div>
    )
}

export default Firebase
