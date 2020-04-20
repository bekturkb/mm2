import React from "react";
import {Link} from "react-router-dom";
import './header.css';
import MainLogo from './../../../assets/img/mail-logo-png.png';
import {getProfileFetch, logoutUser} from "../../../redux/actions";
import {connect} from "react-redux";
import {useLocation} from 'react-router-dom';

const Header = (props) => {

    const handleClickLogOut = event => {
        event.preventDefault();
        props.openModal();
    };

    const HeaderView = () => {
        let location = useLocation();
        return location.pathname
    };

    const location = HeaderView();

    const iconSize = 25;

    let homeLink = null;
    let signOutLink = null;
    let signInLink = null;
    let profileLink = null;

    if (location !== '/'){
        homeLink = <li>
                    <Link to='/' className="i">
                        <i style={{fontSize: iconSize}} className="fas fa-home fa-2x"></i>
                    </Link>
                </li>
    }

    if (props.currentUser.username && (location !== '/signin' && location !== '/signup') && localStorage.token ){
        profileLink = <li>
                        <Link to='/profile' className="i">
                            <i style={{fontSize: iconSize}} className="fas fa-user fa-2x"></i>
                        </Link>
                    </li>
    }

    if ((!props.currentUser.username || !localStorage.token) && (location !== '/signin')) {
        signInLink = <li>
                        <Link to='/signin' className="i">
                            <i style={{fontSize: iconSize}} className="fas fa-sign-in-alt fa-2x"></i>
                        </Link>
                    </li>
    }



    if (props.currentUser.username && localStorage.token){
        signOutLink = (<li>
                        <Link to='/signin' className="i" onClick={handleClickLogOut}>
                            <i style={{fontSize: iconSize}} className="fas fa-sign-out-alt fa-2x"></i>
                        </Link>
                    </li>
        )
    }



    return (
        <>
            <header>
                <div className="wrapper menu">
                    <div className="img-item">
                        <img className="main-photo" src={MainLogo} alt=""/>
                    </div>
                    <div className="title-item">Make Memories</div>
                    <ul className="list-item">
                        <li>
                            <Link to='/' className="i">
                                <i style={{fontSize: iconSize}} className="fas fa-search fa-2x"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to='/maps' className="i">
                                <i style={{fontSize: iconSize}} className="far fa-compass fa-2x"></i>
                            </Link>
                        </li>
                        { profileLink }
                        { homeLink }
                        { signInLink }
                        { signOutLink }
                    </ul>
                </div>
            </header>
        </>
    )
};

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);