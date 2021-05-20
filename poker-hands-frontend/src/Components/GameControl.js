import PropTypes from 'prop-types'

// A panel that hosts the game's controls and results
const GameControl = ( { registerGame, advanceGame, winner, winningHand }) => {
    return (
        <div className="d-flex flex-column w-100">
            <h3>Game Controls</h3>
            
            <button className="m-2" onClick={registerGame}>
                Start Game
            </button>
            
            <button className="m-2" onClick={advanceGame}>
                Advance Game
            </button>

            <h4>Winner is: {winner}</h4>
            <h4>With a {winningHand}</h4>
        </div>
    )
}

GameControl.propTypes = {
    registerGame: PropTypes.func.isRequired,
    advanceGame: PropTypes.func.isRequired,
    winner: PropTypes.string,
    winningHand: PropTypes.string
}

export default GameControl