import React from 'react';
import NavItem from './NavItem'


const links = [
    { path: '/imagens3', title: 'ImagenS3' },
    { path: '/', title: 'Inicio' },
    { path: '/firebase', title: 'Firebase' },
]


const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-el-roble text-white bg-dark">

            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto nav-justified w-100 flex-column flex-sm-row">

                    {
                        links.map((value, index) =>
                            <NavItem props={value} key={index} />
                        )
                    }

                </ul>

            </div>
        </nav>
    )
}

export default NavBar
