import React from 'react'
import FormImagen from './FormImagen';
import ListImagenes from './ListImagenes';
const inProgress = false;

const Firebase = () => {


    if (inProgress) return 'AHORITA NO... VUELVA MAS TARDE :v';

    return (
        <div className="container">
            <div className="text-center">
                <h1 className="display-4">Ejemplo de Firebase</h1>
            </div>
            <FormImagen />
            <hr />
            <ListImagenes />

        </div>
    )
}

export default Firebase
