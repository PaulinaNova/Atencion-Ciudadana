import {Modal, TextField, Buton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useState} from 'react'

const useStyles=makeStyles((theme)=>({
  modal:{
    position: 'absolute',
    width:1000,
    backgroundColor:'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  textfield:{
    width: '100%'
  }
}))

function Ventana(){

  const styles = useStyles();

{/*----------CONSTANTES PARA ABRIL LA PANTALLA----------- */}

const [modal, setModal]=useState(false);

function abrirCerrarModal(){
  setModal(!modal);
}

const body=(
  <div className={styles.modal}>
    <div align="center">
      <h2>FORMULARIO</h2>
    </div>
    </div>
)
  

  return(
    
    <Modal
    open={modal}
    onClose={abrirCerrarModal}>
      {body}
  </Modal> 
  );
}

export default Ventana;