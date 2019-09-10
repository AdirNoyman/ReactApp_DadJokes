import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './JokesList.css';
import uuid from 'uuid/v4';


class JokesList extends Component {

    static defaultProps = {

        numJokesToFetch: 10
    };

    constructor(props) {
        super(props);

        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false
        };
        this.handelVote = this.handelVote.bind(this);
        this.handelClick = this.handelClick.bind(this);
        this.getJokes = this.getJokes.bind(this);

    }


    componentDidMount() {

        if (this.state.jokes.length === 0) this.getJokes();
    }

    async getJokes() {

        try {

            let jokes = [];

            while (jokes.length < this.props.numJokesToFetch) {

                // Load Jokes 
                let res = await axios.get("https://icanhazdadjoke.com/",
                    { headers: { Accept: "application/json" } });

                jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });

            }

            this.setState(prevState => ({ loading: false, jokes: Array.from(new Set([...prevState.jokes, ...jokes])) }),

                () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))

            );

        } catch (error) {

            alert(error);
            this.setState({ loading: false });
        }

    }


    handelVote(id, delta) {

        this.setState(prevState => ({

            jokes: prevState.jokes.map(joke =>

                joke.id === id ? { ...joke, votes: joke.votes + delta } : joke

            )

        }),

            () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))

        );


    }

    handelClick(evt) {

        this.setState({ loading: true }, this.getJokes);
    }


    render() {

        if (this.state.loading) {

            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            );
        }

        let sortedJokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="laughing smiley" />
                    <button className="JokeList-getmore" onClick={this.handelClick}>New Jokes</button>
                </div>

                <div className="JokeList-jokes">
                    {sortedJokes.map(joke =>
                        <Joke key={joke.id}
                            id={joke.id}
                            text={joke.text}
                            votes={joke.votes}
                            upVote={() => this.handelVote(joke.id, 1)}
                            downVote={() => this.handelVote(joke.id, -1)} />)}
                </div>
            </div>
        );
    }

}


export default JokesList;

