import React, { useState, useEffect} from 'react'
import axios from 'axios'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LoopIcon from '@material-ui/icons/Loop';

import { Author } from './Entity'
import Dialog from './Dialog'
import { TYPE, dialogReducer } from './Actions'
import { useStyles } from '../theme'

const initAuthor = {name: '', gender: ''};

function AuthorAdminScreen() {
    const classes = useStyles();
    const [author, setAuthor] = useState(initAuthor)
    const [authors, setAuthors] = useState([]);
    const [dialogAction, dispatch] = React.useReducer(dialogReducer, {isOpen: false, title: '', action: () => {}});

    useEffect(() => {
        getAuthors();
    }, [])

    const getAuthors = (finalize) => {
        axios.get('/api/author').then(res => {
            setAuthors(res.data)
        }).catch(e => console.log(e))
        .then(finalize);
    }

    const saveAuthor = (author) => e => {
        axios.post('/api/author', author, {params: {authorId: author.id}}).then(res => {
            getAuthors(() => dispatch({type: TYPE.CLOSE}))
        });
    }

    const updateAuthor = (author) => e => {
        axios.put('/api/author', author).then(res => {
            getAuthors(() => dispatch({type: TYPE.CLOSE}))
        });
    }

    const deleteAuthor = id => e => {
        axios.delete(`/api/author/${id}`, id).then(res => {
            getAuthors(() => dispatch({type: TYPE.CLOSE}))
        });
    }

    const openDialog = (author, title, action) => e => {
        setAuthor(author)
        dispatch({type: TYPE.OPEN, payload: { title: title, action: action }});
    }

    const closeDialog = () => {
        getAuthors()
        dispatch({type: TYPE.CLOSE});
    }

    return (
        <div className={classes.root}>
            <Paper className={clsx(classes.paper, classes.control)} elevation={1}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Grid item>
                        <Typography variant="h4" className={classes.title}>
                            Authors
                        </Typography>
                        <List dense={false}>
                            {authors.length ? authors.map((author, index) => 
                                <Author value={author} key={index} onDelete={deleteAuthor(author.id)} onClick={
                                    openDialog(author, 'Edit Author', updateAuthor)
                                } />) 
                            : null}
                        </List>
                    </Grid>
                    <Grid 
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-end"
                        item xs
                        className={classes.dialogAction} 
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<LibraryAddIcon/>}
                            onClick={openDialog(initAuthor, 'Add Author', saveAuthor)}
                        >
                        Add
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<LoopIcon/>}
                            onClick={() => {
                                window.location.href = `${window.origin}/home`
                            }}
                        >
                            Switch To Books
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Dialog open={dialogAction.isOpen} 
                handleClose={closeDialog}
                title={
                    <Typography align="left" variant="caption">
                        {dialogAction.title}
                    </Typography>
                }
            >
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="stretch"
                    className={classes.dialogContent} 
                >
                    <Grid item xs 
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="stretch"
                    >
                        <TextField label="Name" 
                            autoFocus={true}
                            value={author.name}
                            className={classes.input} 
                            onChange={e => {
                                setAuthor({...author, name: e.target.value});
                            }}
                        />
                        <TextField label="Gender"
                            value={author.gender}
                            className={classes.input} 
                            onChange={e => {
                                setAuthor({...author, gender: e.target.value});
                            }} 
                        />
                    </Grid>
                    <Grid 
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    item xs
                    className={classes.dialogAction} 
                    >
                        <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        onClick={closeDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon/>}
                        onClick={dialogAction.action(author)}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default AuthorAdminScreen
