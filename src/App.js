import Snake from "./Snake";
import React, {Component} from 'react';
import Food from "./Food";


const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y]
}


const snakeDirection = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
    UP: "UP",
    DOWN: "DOWN"
};

const initailState = {
    food: getRandomCoordinates(),
    speed: 200,
    direction: snakeDirection.RIGHT,
    snakeDots: [
        [0, 0],
        [2, 0],
        [4, 0]
    ],
}


class App extends Component {

    state = initailState;


    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed)
        document.onkeydown = this.onKeyDown;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkIfOutOfBorders();
        this.checkifCollapsed();
        this.checkifEat();
    }

    onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38: {
                this.setState({direction: snakeDirection.UP})
                break;
            }
            case 40: {
                this.setState({direction: snakeDirection.DOWN})
                break;
            }
            case 37: {
                this.setState({direction: snakeDirection.LEFT})
                break;
            }
            case 39: {
                this.setState({direction: snakeDirection.RIGHT})
                break;
            }
        }
    }

    checkIfOutOfBorders() {
        let snakeHead = this.state.snakeDots[this.state.snakeDots.length - 1];
        let snakeHeadX = snakeHead[0];
        let snakeHeadY = snakeHead[1];

        if (snakeHeadX >= 100 || snakeHeadY >= 100 || snakeHeadX < 0 || snakeHeadY < 0) {
            // eslint-disable-next-line no-restricted-globals
            this.gameIsOver();
        }
    }

    checkifCollapsed() {
        let snakeDots = [...this.state.snakeDots]
        let snakeHead = snakeDots[snakeDots.length - 1];
        let snakeHeadX = snakeHead[0];
        let snakeHeadY = snakeHead[1];
        snakeDots.pop();


        snakeDots.forEach(snakeDot => {
            if (snakeHeadX === snakeDot[0] && snakeHeadY === snakeDot[1]) {
                console.log(snakeHeadX)
                console.log(snakeHeadY)
                console.log(snakeDot[0])
                console.log(snakeDot[1])
                alert("df")
                //this.gameIsOver();
            }
        })
    }

    checkifEat() {
        let snakeHead = this.state.snakeDots[this.state.snakeDots.length - 1];
        let snakeHeadX = snakeHead[0];
        let snakeHeadY = snakeHead[1];
        let food = this.state.food;

        if (snakeHeadX === food[0] && snakeHeadY === food[1]) {
            this.setState({food: getRandomCoordinates()})
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }

    enlargeSnake() {
        let newSnakeDots = [...this.state.snakeDots];
        newSnakeDots.unshift([])

        this.setState({
                snakeDots: newSnakeDots
            }
        )
    }

    increaseSpeed() {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10
            })
        }
    }

    gameIsOver() {
        // eslint-disable-next-line no-restricted-globals
        //location.reload()
        this.setState(initailState)
    }

    moveSnake = () => {
        let newSnakeDots = [...this.state.snakeDots];

        let snakeHead = newSnakeDots[newSnakeDots.length - 1];

        switch (this.state.direction) {
            case snakeDirection.RIGHT:
                snakeHead = [snakeHead[0] + 2, snakeHead[1]]
                break;
            case snakeDirection.LEFT:
                snakeHead = [snakeHead[0] - 2, snakeHead[1]]
                break;
            case snakeDirection.UP:
                snakeHead = [snakeHead[0], snakeHead[1] - 2]
                break;
            case snakeDirection.DOWN:
                snakeHead = [snakeHead[0], snakeHead[1] + 2]
                break;
        }
        newSnakeDots.push(snakeHead);
        newSnakeDots.shift();
        this.setState({
            snakeDots: newSnakeDots
        })
    }

    render() {
        return (
            <div className="gameArea">
                <Snake snakeDots={this.state.snakeDots}/>
                <Food foodDot={this.state.food}/>
            </div>
        )
    }
}

export default App;
