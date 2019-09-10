import React, { Component } from 'react';
import './Joke.css';


class Joke extends Component {

    constructor(props) {
        super(props);

        this.getColor = this.getColor.bind(this);
        this.getEmoji = this.getEmoji.bind(this);
    }


    getColor() {

        let voteColor = this.props.votes;
        if (voteColor >= 15) {

            return "#4CAF50";

        } else if (voteColor >= 12) {

            return "#8BC34A";

        } else if (voteColor >= 9) {

            return "#CDDC39";
        } else if (voteColor >= 6) {

            return "#FFEB3B";
        } else if (voteColor >= 3) {

            return "#FFC107";
        } else if (voteColor >= 0) {

            return "#FF9800";
        } else {

            return "#F44336";
        }


    }

    getEmoji() {

        let voteColor = this.props.votes;
        if (voteColor >= 15) {

            return "em em-rolling_on_the_floor_laughing";

        } else if (voteColor >= 12) {

            return "em em-laughing";

        } else if (voteColor >= 9) {

            return "em em-smiley";

        } else if (voteColor >= 6) {

            return "em em-slightly_smiling_face";
        } else if (voteColor >= 3) {

            return "em em-neutral_face";
        } else if (voteColor >= 0) {

            return "em em-confused";
        } else {

            return "em em-angry";
        }


    }

    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i onClick={this.props.upVote} className="fas fa-arrow-up"></i>
                    <span className="Joke-votes" style={{ borderColor: this.getColor() }}>{this.props.votes}</span>
                    <i onClick={this.props.downVote} className="fas fa-arrow-down"></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
                <div className="Joke-smiley">
                    <i className={this.getEmoji()}></i>
                </div>

            </div>
        );
    }

}


export default Joke;