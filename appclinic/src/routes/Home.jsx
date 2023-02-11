import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdicionarCliente from '../components/AdicionarCliente';
import Editar from '../components/Editar';
import AdicionarAgendamento from '../components/AdicionarAgendamento';

const Home = () => {

  const [clientes, setClientes] = useState([])

  const getClientes = async() => {
      try {

        const response = await axios.get("http://brunnno.pythonanywhere.com/cliente/");

        const data = response.data

        setClientes(data)

      } catch(error) {
          console.log("error");
      }
  }

  useEffect(()=> {
      getClientes();
  }, [])

  function deleteCliente(id) {

      axios.delete(`http://brunnno.pythonanywhere.com/cliente/${id}`)
      setClientes(clientes.filter(cliente => cliente.id !==id))
  }

  return (
    <div>
    <h2>
      Lista de Clientes
    </h2>
    <AdicionarCliente/>
    <table className="table table-hover">
        <thead>
            <tr className="bg">
                <th>Id</th>
                <th>Nome</th>
                <th>Sexo</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Celular</th>
                <th>Ativo</th>
                <th>Opções</th>
            </tr>
        </thead>
        <tbody>
        {clientes.length === 0 ? <p>Carregando...</p> : (
      clientes.map((cliente) => (
        <tr className='post' key={cliente.id}>
        <td>{cliente.id}</td>
            <td>{cliente.nome}</td>
            <td>{cliente.sexo}</td>
            <td>{cliente.cpf}</td>
            <td>{cliente.email}</td>
            <td>{cliente.celular}</td>
            <td>{JSON.stringify(cliente.ativo)}</td>
            <td>
            <Editar id={cliente.id} />
            <AdicionarAgendamento id={cliente.id} />
                <button className="btn btn-danger btn-sm" onClick={() => deleteCliente(cliente.id)}>Excluir</button>
            </td>
        </tr>
      ))
    )}
        </tbody>
    </table>
    
    </div>
  )
}

export default Home