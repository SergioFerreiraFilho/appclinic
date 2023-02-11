import React from 'react'
import { useState, useEffect } from 'react'
import "./Home.css"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarAgenda from '../components/EditarAgenda';


const NewPost = () => {
  const [agendas, setagendas] = useState([])

  const getAgenda = async() => {
      try {

        const response = await axios.get("http://brunnno.pythonanywhere.com/agenda/");

        const data = response.data

        setagendas(data)

      } catch(error) {
          console.log("error");
      }
  }

  useEffect(()=> {
      getAgenda();
  }, [])

  function deleteAgenda(id) {

      axios.delete(`http://brunnno.pythonanywhere.com/agenda/${id}`)
      setagendas(agendas.filter(agenda => agenda.id !==id))
  }

  function onEditSuccess() {
    getAgenda();
}

  return (
    <div>
    <h2>
      Lista de Agendamentos
    </h2>
    {/* <Adicionaragenda/> */}
    <table className="table table-hover">
        <thead>
            <tr className="bg">
                <th>Id</th>
                <th>Horario</th>
                <th>Dia</th>
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
        {agendas.length === 0 ? <p>Carregando...</p> : (
      agendas.map((agenda) => (
        <tr className='post' key={agenda.id}>
        <td>{agenda.id}</td>
        <td>{agenda.horario}</td>
        <td>{agenda.dia}</td>
            <td>{agenda.cliente.nome}</td>
            <td>{agenda.cliente.sexo}</td>
            <td>{agenda.cliente.cpf}</td>
            <td>{agenda.cliente.email}</td>
            <td>{agenda.cliente.celular}</td>
            <td>{JSON.stringify(agenda.cliente.ativo)}</td>
            <td>
                <EditarAgenda id={agenda.id} onEditSuccess={() => onEditSuccess()} />
                <button className="btn btn-danger btn-sm" onClick={() => deleteAgenda(agenda.id)}>Excluir</button>
            </td>
        </tr>
      ))
    )}
        </tbody>
    </table>
    
    </div>
  )
}

export default NewPost