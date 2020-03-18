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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import LoopIcon from '@material-ui/icons/Loop';

import { Book } from './Entity'
import Dialog from './Dialog'
import { TYPE, dialogReducer } from './Actions'
import { useStyles } from '../theme'

const initBook = {title: '', genre: '', author: {id: null, name: '', gender: ''}};

function BookAdminScreen() {
    const classes = useStyles();
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [dialogAction, dispatch] = React.useReducer(dialogReducer, {isOpen: false, title: '', action: () => {}});
    const [book, setBook] = useState(initBook);

    useEffect(() => {
        resetBooks();
    }, [])

    function resetBooks(finalize){
        axios.get('/api/book').then(res => {
            setBooks(res.data)
        }).catch(e => console.log(e))
        .then(finalize);
    }

    const retrieveAuthors = () => {
        axios.get('/api/author').then(res => {
            setAuthors(res.data)
        });
    }

    const saveBook = (book) => e => {
        axios.post('/api/book', book, {params: {authorId: book.author.id}}).then(res => {
            resetBooks(() => dispatch({type: TYPE.CLOSE}))
        });
    }

    const updateBook = (book) => e => {
        axios.put('/api/book', book).then(res => {
            resetBooks(() => dispatch({type: TYPE.CLOSE}))
        });
    }

    const deleteBook = id => e => {
        axios.delete(`/api/book/${id}`, id).then(res => {
            resetBooks(() => dispatch({type: TYPE.CLOSE}))
        });
    }

    const openDialog = (book, title, action) => e => {
        retrieveAuthors();
        setBook(book);
        dispatch({type: TYPE.OPEN, payload: { title: title, action: action }});
    }

    const closeDialog = () => {
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
                            Books
                        </Typography>
                        <List dense={false}>
                            {books.length ? books.map((book, index) => 
                                <Book value={book} key={index} onDelete={deleteBook(book.id)} onClick={
                                    openDialog(book, 'Edit Book', updateBook)
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
                            onClick={openDialog(initBook, 'Add Book', saveBook)}
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
                                window.location.href = `${window.origin}/admin`
                            }}
                        >
                            Switch To Authors
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
                        <TextField label="title" 
                            autoFocus={true}
                            value={book.title}
                            className={classes.input} 
                            onChange={e => {
                                setBook({...book, title: e.target.value});
                            }}
                        />
                        <TextField label="genre"
                            value={book.genre}
                            className={classes.input} 
                            onChange={e => {
                                setBook({...book, genre: e.target.value});
                            }} 
                        />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="author">Author</InputLabel>
                            <Select
                                native
                                value={book.author.id || ''}
                                onChange={e => setBook({...book, author: authors.find(author => author.id === parseInt(e.target.value))})}
                                inputProps={{
                                    name: 'author',
                                    id: 'author',
                                }}
                            >
                                <option value={null}></option>
                                { 
                                    authors.length ? authors.map((author, index) => 
                                        <option value={author.id} key={index}>
                                            {author.name}
                                        </option>
                                    ) : null
                                }
                            </Select>
                        </FormControl>
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
                        onClick={dialogAction.action(book)}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default BookAdminScreen
