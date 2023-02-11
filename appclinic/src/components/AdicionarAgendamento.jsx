import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import './AdicionarCliente.css'
import Form from 'react-bootstrap/Form';
import modal from 'react-bootstrap/Offcanvas';

const AdicionarAgendamento = (props) => {
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

    const agendarCliente = data => axios.post(`http://brunnno.pythonanywhere.com/agenda/`, data).then(() => {
      console.log("Deu tudo Certo")
  }).catch(() => {
      console.log(data)
  })
  
    return (
      <>
    <button className="btn btn-info btn-sm" onClick={handleShow}>Agendamento</button>
    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='titleadd'>Digite as Informações</Modal.Title>
          </Modal.Header>
          <Modal.Body>          
            <div className='form-control'>
            <form  onSubmit={handleSubmit(agendarCliente)}>
            <label>Dia</label>
            <select  className='form-select' name="dia" id='dia' {...register("dia")}>
                <option >SEGUNDA</option>
                <option value="TERCA" >TERÇA</option>
                <option >QUARTA</option>
                <option >QUINTA</option>
                <option >SEXTA</option>
                <option >SABADO</option>
            </select>
            <label htmlFor='body'>Horario</label>
            <input className="form-control" name="horario" {...register("horario")}></input>
            <input type="hidden" id="input_editar_id" defaultValue={cliente.id} name="id" {...register("cliente.id")}></input>
            <input type="hidden" className="form-control" name="nome" defaultValue={cliente.nome} {...register("cliente.nome")}></input>
            <select className='form-select' style={{display: 'none'}} name="sexo" defaultValue={cliente.sexo} {...register("cliente.sexo")}>
            <option value="M" name="sexo">Masculino</option>
            <option value="F" name="sexo">Feminino</option>
            <option value="O" name="sexo">Outros</option>
            <option value="N" name="sexo">Prefiro não informar</option>
            </select>
            <input type="hidden" className="form-control" name="cpf" defaultValue={cliente.cpf} {...register("cliente.cpf")}></input>
            <input type="hidden" className="form-control" name="email" defaultValue={cliente.email}{...register("cliente.email")}></input>
            <input type="hidden" className="form-control" name="celular" defaultValue={cliente.celular} {...register("cliente.celular")}></input>
            <input type="checkbox" style={{display: 'none'}} className="form-check-input" value="true" name="ativo" checked={cliente.ativo} {...register("cliente.ativo")}></input>
                      

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}  type="submit">
              Adicionar Agendamento
            </Button>
          </Modal.Footer>
            </form>
            </div>
          </Modal.Body>

        </Modal>
      </>
    );
    }


export default AdicionarAgendamento