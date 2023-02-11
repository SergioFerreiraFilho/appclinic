import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className='navbar'>
    <ul>
         <li>
            <Link to={`/`} className="new-btn">Lista de Clientes</Link>
            <Link to={`/new`} className="new-btn2">Agendamento</Link>
         </li>
    </ul>
    </nav>
  )
}

export default Navbar