import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import './AdicionarCliente.css'
import Form from 'react-bootstrap/Form';

const AdicionarCliente = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register , handleSubmit} = useForm()

    const addcliente = data => axios.post("http://brunnno.pythonanywhere.com/cliente/", data).then(() => {
        console.log("Deu tudo Certo")
    }).catch(() => {
        console.log(data)
    })

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Adicionar Cliente
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='titleadd'>Digite as Informações</Modal.Title>
          </Modal.Header>
          <Modal.Body>          
            <div className='form-control'>
            <form onSubmit={handleSubmit(addcliente)}>
            <label htmlFor='body'>Nome</label>
            <input className="form-control" name="nome" {...register("nome")}></input>
            <label htmlFor='body'>Sexo</label>
            <select className='form-select' name="sexo" {...register("sexo")}>
            <option value="M" name="sexo">Masculino</option>
            <option value="F" name="sexo">Feminino</option>
            <option value="O" name="sexo">Outros</option>
            <option value="N" name="sexo">Prefiro não informar</option>
            </select>
            <label htmlFor='body'>CPF</label>
            <input className="form-control" name="cpf" {...register("cpf")}></input>
            <label htmlFor='body'>Email</label>
            <input className="form-control" name="email" {...register("email")}></input>
            <label htmlFor='body'>Celular</label>
            <input className="form-control" name="celular" {...register("celular")}></input>
            <label htmlFor='body'>Ativo</label>
            <input type="checkbox" className="form-check-input" value="true" name="ativo" unchecked="false" {...register("ativo")}></input>
            

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose} type="submit">
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

export default AdicionarCliente