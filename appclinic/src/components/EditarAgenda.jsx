import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import './AdicionarCliente.css'
import Form from 'react-bootstrap/Form';
import modal from 'react-bootstrap/Offcanvas';

const EditarAgenda = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { register , handleSubmit} = useForm()

    const id = props.id;

    const [agenda, setAgenda] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`http://brunnno.pythonanywhere.com/agenda/${props.id}/`);
        setAgenda(response.data);
      };
      fetchData();
    }, [props.id]);

    const editarAgendamento = data => axios.put(`http://brunnno.pythonanywhere.com/agenda/${id}/`, data).then(() => {
      console.log("Deu tudo Certo")
      props.onEditSuccess();
  }).catch(() => {
      console.log(data)
  })
  
    return (
      <>
    <button className="btn btn-warning btn-sm" onClick={handleShow}>Editar</button>
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='titleadd'>Digite as Informações</Modal.Title>
          </Modal.Header>
          <Modal.Body>          
          <div className='form-control'>
            <form  onSubmit={handleSubmit(editarAgendamento)}>
            <label>Dia</label>
            <select  className='form-select' defaultValue={agenda.dia} name="dia" id='dia' {...register("dia")}>
                <option >SEGUNDA</option>
                <option value="TERCA" >TERÇA</option>
                <option >QUARTA</option>
                <option >QUINTA</option>
                <option >SEXTA</option>
                <option >SABADO</option>
            </select>
            <label htmlFor='body'>Horario</label>
            <input className="form-control" defaultValue={agenda.horario} name="horario" {...register("horario")}></input>
            

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}  type="submit">
              Adicionar Cliente
            </Button>
          </Modal.Footer>
            </form>
            </div>
          </Modal.Body>

        </Modal>
      </>
    );
    }
    
    export default EditarAgenda