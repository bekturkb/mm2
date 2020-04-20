import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileFetch, logoutUser} from './redux/actions';
import SignUpPage from './components/pages/SignUp2';
import HomePage from "./components/pages/Home";
import ProfilePage from "./components/pages/Profile";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Header from "./components/otherComponents/header/header";
import SignIn from "./components/pages/SignIn";
import GoogleMap from "./components/otherComponents/GoogleMap";


class App extends Component {
    state = {
        showModal: false
    };

    openModal = () => {
        this.setState({showModal: true})
    };

    closeModal = () => {
        this.setState({showModal: false})
    };

    onAgree = () => {
      this.closeModal();
      this.logOut();
    };

    onDisagree = () => {
        this.closeModal();
    };

    logOut = () => {
        // Удаление token из localStorage
        localStorage.removeItem("token");
        // удаление из Redux хранилица
        this.props.logoutUser();
    };


    componentDidMount = () => {
        this.props.getProfileFetch()
    };

    render() {

        return (
            <div className='App'>
                <Router>
                    <Switch>
                        <Route path="/signup" render={() => <SignUpPage state={this.state}/>}/>
                        <Route path="/signin" render={() => <SignIn state={this.state}/>}/>
                        <Route exact path="/" render={() => <HomePage state={this.state} openModal={this.openModal} />}/>
                        <Route path="/profile" render={() => <ProfilePage state={this.state}/>}/>
                        <Route path="/maps" render={() => <GoogleMap state={this.state}/>}/>
                    </Switch>
                    <Dialog
                        open={this.state.showModal}
                        onClose={() => {}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onDisagree} color="primary">
                                Disagree
                            </Button>
                            <Button onClick={this.onAgree} color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Header state={this.state} openModal={this.openModal}/>
                    { this.props.redirectToLogin ? <Redirect to='/signin'/> : null }
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    redirectToLogin: state.redirectToLogin
});

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);