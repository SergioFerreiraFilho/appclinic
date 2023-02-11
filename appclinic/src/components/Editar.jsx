import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import './AdicionarCliente.css'
import Form from 'react-bootstrap/Form';
import modal from 'react-bootstrap/Offcanvas';

const Editar = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register , handleSubmit} = useForm()

    const id = props.id;

    const [cliente, setCliente] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`http://brunnno.pythonanywhere.com/cliente/${props.id}/`);
        setCliente(response.data);
      };
      fetchData();
    }, [props.id]);

    const editarCliente = data => axios.put(`http://brunnno.pythonanywhere.com/cliente/${id}/`, data).then(() => {
      console.log("Deu tudo Certo")
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
            <form onSubmit={handleSubmit(editarCliente)}>
            <input type="hidden" id="input_editar_id" defaultValue={cliente.id} name="id" {...register("id")}></input>
            <label htmlFor='body' id='editar.nome'></label>
            <input className="form-control" id="input_editar_nome" name="nome" defaultValue={cliente.nome} {...register("nome")}></input>
            <label htmlFor='body'>Sexo</label>
            <select className='form-select' name="sexo" defaultValue={cliente.sexo} {...register("sexo")}>
            <option value="M" name="sexo">Masculino</option>
            <option value="F" name="sexo">Feminino</option>
            <option value="O" name="sexo">Outros</option>
            <option value="N" name="sexo">Prefiro não informar</option>
            </select>
            <label htmlFor='body'>CPF</label>
            <input className="form-control" name="cpf" defaultValue={cliente.cpf} {...register("cpf")}></input>
            <label htmlFor='body'>Email</label>
            <input className="form-control" name="email" defaultValue={cliente.email}{...register("email")}></input>
            <label htmlFor='body'>Celular</label>
            <input className="form-control" name="celular" defaultValue={cliente.celular} {...register("celular")}></input>
            <label htmlFor='body'>Ativo</label>
            <input type="checkbox" className="form-check-input" value="true" name="ativo" unchecked="false" checked="true" defaultValue={cliente.ativo} {...register("ativo")}></input>
            

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
    
    export default Editar