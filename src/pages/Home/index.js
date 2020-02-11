import React from 'react'
//import { useHistory } from 'react-router-dom'

const Home = () => {

    /*
    const history = useHistory()


    function handleOnClick(event) {
        const { name } = event.target

        history.push(`/${name}`)
    }
    */


    return (
        <div className="container text-center">
            {
                /*
                <button name="imagens3" onClick={handleOnClick}>Imagenes en S3</button>
                <button name="firebase" onClick={handleOnClick}>Firebase</button>
                */
            }

            <h1 className="display-3 mt-5">
                Proyecto y Trabajos de Tendencias Actuales de Programación
            </h1>
            <hr className="border border-dark" />
            <h2 className="display-4">Integrantes:</h2>
            <h1 className="font-weight-light">Diego Condo</h1>
            <h1 className="font-weight-light"> Yanina Flores</h1>
        </div>
    )
}

export default Home
