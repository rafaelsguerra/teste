import React, { Component } from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Button, Card, CardHeader, Avatar, CardContent, Grid, Divider,
    TextField, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogContent,
    DialogTitle } from '@material-ui/core/';
import Person from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Axios from 'axios';

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
        loading: true,
        showDialog: false,
        activeUser: Axios.get('http://localhost:3030/users/1').then(response => this.setState({activeUser: response.data, loading: false}))
    };

    inputChangeHandler = (event) => {

        const user = {...this.state.activeUser};

        if (event.target.id === "nome") {
            user.name = event.target.value;
        } else if (event.target.id === "nasc") {
            user.data_nasc = event.target.value;
        } else if (event.target.id === "endereco") {
            user.endereco = event.target.value;
        } else if (event.target.id === "telefone") {
            user.telefone = event.target.value;
        } else if (event.target.id === "cidade") {
            user.cidade = event.target.value;
        } else {
            user.email = event.target.value;
        }

        this.setState({activeUser: user});
    };

    dialogHandler = () => {
        this.setState(
            { showDialog: true });
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

    handleSubmit = (event) => {
        Axios.put('http://localhost:3030/users/1', this.state.activeUser).then(response => {
            window.alert("Usuario alterado!");
        });
    };

    render() {

        let dialog = (
            <Dialog open={this.state.showDialog} onClose={this.handleClose} contentstyle={{minWidth: "700px", maxWidth: "90%"}}>
                <DialogTitle>Editar usuário</DialogTitle>
                <DialogContent>
                    <form action="" onSubmit={this.handleSubmit}>
                        <TextField type="text"
                                   id="nome"
                                   placeholder={this.state.activeUser.name}
                                   label="Nome"
                                   margin="normal"
                                   onChange={(event) => this.inputChangeHandler(event)}/>
                        <br/>
                        {/*<TextField type="text"*/}
                                   {/*id="nasc"*/}
                                   {/*placeholder={this.state.activeUser.data_nasc}*/}
                                   {/*label="Data de nascimento"*/}
                                   {/*margin="normal"*/}
                                   {/*onChange={(event) => this.inputChangeHandler(event)}/>*/}
                        {/*<br/>*/}
                        {/*<TextField type="text"*/}
                                   {/*id="endereco"*/}
                                   {/*placeholder={this.state.activeUser.endereco}*/}
                                   {/*label="Endereço"*/}
                                   {/*margin="normal"*/}
                                   {/*onChange={(event) => this.inputChangeHandler(event)}/>*/}
                        {/*<br/>*/}
                        {/*<TextField type="text"*/}
                                   {/*id="telefone"*/}
                                   {/*placeholder={this.state.activeUser.telefone}*/}
                                   {/*label="Telefone"*/}
                                   {/*margin="normal"*/}
                                   {/*onChange={(event) => this.inputChangeHandler(event)}/>*/}
                        {/*<br/>*/}
                        {/*<TextField type="text"*/}
                                   {/*id="cidade"*/}
                                   {/*placeholder={this.state.activeUser.cidade}*/}
                                   {/*label="Cidade"*/}
                                   {/*margin="normal"*/}
                                   {/*onChange={(event) =>this.inputChangeHandler(event)}/>*/}
                        {/*<br/>*/}
                        <TextField type="text"
                                   id="email"
                                   placeholder={this.state.activeUser.email}
                                   label="email"
                                   margin="normal"
                                   onChange={(event) =>this.inputChangeHandler(event)}/>
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
        };

        if (this.state.loading) {
            return null;
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
                        <h1 style={h1Style}>Meus dados</h1>
                    </div>
                    <Divider />
                    <div style={{textAlign: "center"}}>
                        <br />
                        <div className="cardBox">
                            <Card>
                                <CardHeader avatar = {<Avatar>{this.state.activeUser.name[0]}</Avatar>}
                                            title={this.state.activeUser.name}
                                            subheader="Meus dados">
                                </CardHeader>
                                <CardContent>
                                    <Grid container spacing={8} alignItems="flex-end">
                                        <Grid item><Person /></Grid>
                                        <Grid item>
                                            <TextField name="nome"
                                                       label="Nome"
                                                       fullWidth
                                                       value={this.state.activeUser.name}
                                                       margin="normal"
                                                       InputProps={{readOnly: true}} />
                                        </Grid>
                                    </Grid>
                                    {/*<Grid container spacing={8} alignItems="flex-end">*/}
                                        {/*<Grid item><Home /></Grid>*/}
                                        {/*<Grid item>*/}
                                            {/*<TextField name="endereco" label="Endereço" fullWidth value={this.state.activeUser.endereco} margin="normal" InputProps={{readOnly: true}} />*/}
                                        {/*</Grid>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid container spacing={8} alignItems="flex-end">*/}
                                        {/*<Grid item><Phone /></Grid>*/}
                                        {/*<Grid item>*/}
                                            {/*<TextField name="telefone" label="Telefone" fullWidth value={this.state.activeUser.telefone} margin="normal" InputProps={{readOnly: true}} />*/}
                                        {/*</Grid>*/}
                                    {/*</Grid>*/}
                                    <Grid container spacing={8} alignItems="flex-end">
                                        <Grid item><Email /></Grid>
                                        <Grid item>
                                            <TextField name="email"
                                                       label="email"
                                                       fullWidth
                                                       value={this.state.activeUser.email}
                                                       margin="normal"
                                                       InputProps={{readOnly: true}} />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <br/>
                            <div style={{textAlign: "right"}}>
                                <Button variant="contained" color="primary" onClick={() =>this.dialogHandler()}>Editar</Button>
                            </div>

                        </div>
                        {/*{table}*/}
                        {dialog}
                    </div>
                </Grid>
            </div>
        );
    }
}

export default App;
