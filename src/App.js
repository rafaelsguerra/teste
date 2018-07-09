import React, { Component } from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Button, Grid, Divider, TextField, Table, TableBody, TableCell, TableHead, TableRow, Dialog,
    DialogContent, DialogTitle } from '@material-ui/core/';

class App extends Component {

    state = {
        users: [
            {
                id: 684684,
                nome: 'Rafael Guerra',
                data_nasc: '12/09/1994',
                telefone: '91111-2222',
                endereco: 'rua rodrigues alves, 1400',
                cidade: 'Campina Grande'
            },

            {
                id: 979657,
                nome: 'xico',
                data_nasc: '12/09/2789',
                telefone: '33225478',
                endereco: 'rua joaquim pequeno',
                cidade: 'campina grande'
            },

            {
                id: 895622,
                nome: 'cintra',
                data_nasc: '9/12/8756',
                telefone: '44557863',
                endereco: 'nao sei',
                cidade: 'campina grande'
            }
        ],
        showForm: false,
        showDialog: false,
        activeUser: {}
    };

    inputChangeHandler = (event, id) => {
        const userIndex = this.state.users.findIndex(u => {
            return u.id === id;
        });

        const user = {...this.state.users[userIndex]};

        if (event.target.id === "nome") {
            user.nome = event.target.value;
        } else if (event.target.id === "nasc") {
            user.data_nasc = event.target.value;
        } else if (event.target.id === "endereco") {
            user.endereco = event.target.value;
        } else if (event.target.id === "telefone") {
            user.telefone = event.target.value;
        } else {
            user.cidade = event.target.value;
        }

        const users = [...this.state.users];
        users[userIndex] = user;

        this.setState({users: users});
    };

    dialogHandler = (user) => {
        this.setState(
            {
                showDialog: true,
                activeUser: user
            });
    };

    deleteHandler = (userId) => {
        if (window.confirm("Você tem certeza que quer excluir este usuário?")) {
            const userIndex = this.state.users.findIndex(u => {
                return u.id === userId;
            });

            const users = [...this.state.users];
            users.splice(userIndex, 1);
            this.setState({users: users});
        }

    };

    handleClose = () => {
        this.setState({showDialog: false});
    };

    render() {

        let dialog = (
            <Dialog open={this.state.showDialog} onClose={this.handleClose}>
                <DialogTitle>Editar usuário</DialogTitle>
                <DialogContent>
                    <form action="">
                        <TextField type="text"
                                   id="nome"
                                   placeholder={this.state.activeUser.nome}
                                   label="Nome"
                                   margin="normal"
                                   onChange={(event) => this.inputChangeHandler(event, this.state.activeUser.id)}/>
                        <br/>
                        <TextField type="text"
                                   id="nasc"
                                   label="Data de nascimento"
                                   margin="normal"
                                   onChange={(event) => this.inputChangeHandler(event, this.state.activeUser.id)}/>
                        <br/>
                        <TextField type="text" id="endereco" label="Endereço" margin="normal" onChange={(event) => this.inputChangeHandler(event, this.state.activeUser.id)}/>
                        <br/>
                        <TextField type="text" id="telefone" label="Telefone" margin="normal" onChange={(event) => this.inputChangeHandler(event, this.state.activeUser.id)}/>
                        <br/>
                        <TextField type="text" id="cidade" label="Cidade" margin="normal" onChange={(event) =>this.inputChangeHandler(event, this.state.activeUser.id)}/>
                        <br/>
                        <Button type="submit">Submeter</Button>
                    </form>
                </DialogContent>
            </Dialog>
        );

        let table =(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Endereço</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.users.map(user => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user.nome}</TableCell>
                                <TableCell>{user.endereco}</TableCell>
                                <TableCell>{user.telefone}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => this.dialogHandler(user)}>Editar</Button>
                                    <Button variant="contained" color="secondary" onClick={() => this.deleteHandler(user.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        );

        const h1Style = {
          marginLeft: "50px"
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Gasolinio
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container direction="column">
                <div className="container">
                  <h1 style={h1Style}>Usuários</h1>
                </div>
                <Divider />
                <div className="App">
                    {table}
                    {dialog}
                </div>
                </Grid>
            </div>
        );
    }
}

export default App;
