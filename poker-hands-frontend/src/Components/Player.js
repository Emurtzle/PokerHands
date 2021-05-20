import PropTypes from 'prop-types'
import Card from "./Card"

// Panel for the player
const Player = ({ name, hand }) => {
    return (
        <div className="d-flex flex-column justify-content-center">
            <h3>Player: {name}</h3>

            <div className="d-flex flex-row flex-wrap">
                {hand.length > 0 &&
                    hand.map(card => {
                        return (
                            <Card
                                key={card.id}
                                suite={card.suite}
                                value={card.value}
                                color = {card.color}
                            />
                        )
                    })
                }
                {hand.length === 0 &&
                    <p>Please Click Start Game to deal a hand</p>
                }
            </div>
        </div>
    )
}

Player.propTypes = {
    name: PropTypes.string,
    hand: PropTypes.array
}

export default Player