import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey[900],
        position: 'absolute',
        height: '100%',
        width: '100%',
        padding: theme.spacing(1)
    },
    paper: {
        position: 'absolute',
        margin: 'auto',
        width: '60%',
        top: theme.spacing(3),
        left: 0,
        right: 0,
    },
    control: {
        padding: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    input: {
        marginBottom: theme.spacing(2), 
        marginTop: theme.spacing(1), 
        width: "100%"
    },
    dialogContent: {
        padding: theme.spacing(2),
    },
    dialogAction: {
        paddingTop: theme.spacing(2),
    },
}));