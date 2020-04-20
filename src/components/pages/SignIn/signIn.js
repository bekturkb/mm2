import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {userLoginFetch} from "../../../redux/actions";
import {connect} from "react-redux";
import './signIn.css';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{fontSize: 14}}>
            {'Copyright © '}
            <Link to='/' color="inherit">
                Make Memories
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn(props) {
    const classes = useStyles();

    const init = {
        username: "",
        password: "",
        redirect: false
    };

    const [user, setUser] = useState(init);
    const [redirect, setRedirect] = useState(false);

    const handleChange = event => {
        const val = {[event.target.name]: event.target.value};
        setUser({...user, ...val});
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.userLoginFetch(user)
            .then(data => {
                console.log('data in login : ', data)
                if (data.access){
                    setRedirect(true)
                }
            })
            .catch(err => {
                console.log('error in login : ', err);
                return err
            });

    };

    if (redirect){
        return <Redirect to='/home'/>
    }

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: 150, minHeight: 600}}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label={<span style={{fontSize: 16}}>Username</span>}
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={<span style={{fontSize: 16}}>Password</span>}
                        type="password"
                        id="password"
                        autoComplete="password"
                        onChange={handleChange}
                        style={{backgroundColor: 'inherit'}}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/' variant="body2">
                                <div style={{fontSize: 14}}>Forgot password?</div>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to='/signup' variant="body2">
                                <div style={{fontSize: 14}}>{"Don't have an account? Sign Up"}</div>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
});

const mapStateToProps = state => ({
    detail: state.detail
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);