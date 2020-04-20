import React, {Component} from "react";
import './postCard.css';
import NoImagoFound from './../../../assets/img/no_image_card.png';
import {PostService} from './../../../services/postService';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class PostCard extends Component{
    constructor(props) {
        super(props);
        this.props = props;
    }

    postService = new PostService();

    state = {
        post: null,
        redirectToLogin: false
    };

    onLike = () => {
        if (!this.props.currentUser.username && !localStorage.token){
            this.setState({redirectToLogin: true})
        }

        this.postService.onLikeRequest(this.state.post.like_link)
            .then(data => {
                const likeObj = {
                    number_of_likes: data.number_of_likes,
                    is_liked: data.is_liked
                };
                this.setState({
                    post: {...this.state.post, ...likeObj}
                })
            })
            .catch(err => {
                console.log('error in onLike : ', err);
            })
    };

    componentDidMount() {
        this.setState({post: this.props.post})
    }

    render() {

        if (this.state.redirectToLogin){
            return <Redirect to='/signin'/>
        }

        if(!this.state.post){
            return <div>Wait..</div>
        }
        const {post} = this.state;

        return (
            <div className="card-level-0">
                <div className="card-level-1">
                    <div className="card-header clearfix">
                        <div className="card-logo-and-name clearfix">
                            <div className="card-logo">
                                <img src={post.profile_photo} alt=""/>
                            </div>
                            <div className="card-company-name">
                                {post.company_name}
                            </div>
                        </div>
                        <div className="card-location">
                            <div className="card-location-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="card-location-name">{post.longitude}</div>
                        </div>
                    </div>
                    <div className="card-picture">
                        {
                            post.images[0] ? <img src={post.images[0]} alt={post.images[0]}/> : <img src={NoImagoFound} alt={'NoImageFound'}/>
                        }
                    </div>
                    <div className={post.is_liked ? 'card-likes-content-active' : 'card-likes-content'}>
                        <button className="card-like-button" onClick={this.onLike}>
                            <i className="far fa-thumbs-up"></i>
                        </button>
                        <button className="card-comments-button">
                            <i className="far fa-thumbs-down"></i>
                        </button>
                        <button className="card-amount-of-likes-button" style={{fontSize: 11}}>
                            {post.number_of_likes} likes
                        </button>
                        <button className="card-amount-of-likes-button" style={{fontSize: 11}}>
                            {post.number_of_likes} dislikes
                        </button>
                        <button className="card-comments-button">
                            <i className="fas fa-comment-dots"></i>
                        </button>
                        <button className="card-comments-button">
                            <i className="far fa-bookmark"></i>
                            {/*<i className="fas fa-bookmark"></i>*/}
                        </button>
                    </div>
                    <div className="card-description">
                        <h3>Description:</h3>
                        <p style={{height: 32, overflow: 'hidden'}}>
                            {post.description}
                        </p>
                        <p>...</p>
                        <h5>More</h5>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps, null)(PostCard);