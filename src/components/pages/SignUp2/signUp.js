import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {getProfileFetch, logoutUser, userPostFetch} from "../../../redux/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import './signUp.css';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp(props) {
    const classes = useStyles();

    const init = {
        username: "",
        email: "",
        password1: "",
        password2: "",
        redirect: false
    };

    const [redirect, setRedirect] = useState(false);

    const [user, setUser] = useState(init);

    const handleChange = event => {
        const val = {[event.target.name]: event.target.value};
        setUser({...user, ...val});
    };

    const handleSubmit = event => {
        event.preventDefault();
        props.userPostFetch(user)
            .then(data => {
                if (data){
                    setRedirect(true)
                }
            })
            .catch(err => {
                console.log('error in signUp.js : ', err);
            })
    };

    if (redirect){
        return <Redirect to='/signin'/>
    }

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: 130, height: 600}}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label={<span style={{fontSize: 14}}>Username</span>}
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={<span style={{fontSize: 14}}>Email Address</span>}
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password1"
                                label={<span style={{fontSize: 14}}>Password</span>}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label={<span style={{fontSize: 14}}>Confirm Password</span>}
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                        {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {<span style={{fontSize: 14}}>Sign Up</span>}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/signin' variant="body2" style={{fontSize: 14}}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    regUser: state.regUser
});

const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(userPostFetch(userInfo)),
    getProfileFetch: () => dispatch(getProfileFetch()),
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);