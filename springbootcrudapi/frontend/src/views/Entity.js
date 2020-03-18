import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles(theme => ({
    list: {
        borderColor: theme.palette.grey[300],
        border: '1px solid',
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
            cursor: 'pointer',
        }
    }
}));

export const Book = props => {
    return (
        <Entity 
            avatarIcon = {LibraryBooksIcon}
            primary = {
                <Typography component="span" variant="h6">
                    {props.value.title}
                </Typography>
            }
            secondary = {
                <Typography component="span" variant="subtitle2">
                    {`Author: ${props.value.author.name}`}
                </Typography>
            }
            action = {
                <IconButton edge="end" aria-label="delete" color="primary" onClick={props.onDelete}>
                    <DeleteIcon />
                </IconButton>
            }
            {...props}
        />
    )
}

export const Author = props => {
    return (
        <Entity 
            avatarIcon = {AccountBoxIcon}
            primary = {
                <Typography component="span" variant="h6">
                    {props.value.name}
                </Typography>
            }
            action = {
                <IconButton edge="end" aria-label="delete" color="primary" onClick={props.onDelete}>
                    <DeleteIcon />
                </IconButton>
            }
            {...props}
        />
    )
}

function Entity(props) {
    const classes = useStyles();
    return (
        <ListItem key={props.value.id} className={classes.list} onClick={props.onClick}>
            <ListItemAvatar>
                <Avatar>
                    <props.avatarIcon color="primary"/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        {props.primary}
                    </React.Fragment>
                    }
                secondary={
                <React.Fragment>
                    {props.secondary}
                </React.Fragment>
                }
            />
            <ListItemSecondaryAction>
                {props.action}
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Entity
