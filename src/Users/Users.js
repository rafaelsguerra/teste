import React from 'react';
import './Users.css'
import Button from '@material-ui/core/Button';

const users = (props) => {
    return(
        <div className="box">
            <h3>{props.nome}</h3>
            <p>{props.endereco}</p>
            <p>{props.telefone}</p>
            <br/>
            <Button variant="contained" color="primary" onClick={props.click}>Editar</Button>
        </div>
    );
}

export default users;