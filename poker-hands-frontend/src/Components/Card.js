import PropTypes from 'prop-types'

// Card component the <Player /> component renders
const Card = ({ suite, value, color }) => {
    // Return a css style based on the value of the color prop
    const FnResolveColor = (color) => {
        if (color === "red") {
            return {"backgroundColor": "#CD5C5C"}
        } else {
            return {"backgroundColor": "#D3D3D3"}
        }
    }

    // Convert the card value from an int to a string if needed for face cards
    let cardValue = ""
    if (value >= 2 && value <= 10) {
        cardValue =  value
    } else {
        switch(value) {
            case 11:
                cardValue = "Jack"
                break
            case 12:
                cardValue = "Queen"
                break
            case 13:
                cardValue = "King"
                break
            case 14:
                cardValue = "Ace"
                break
            default:
                cardValue = "Error"
                break
        }
    }
    
    return(
        <div 
            className="d-flex m-4 p-2 w-25"
            style={FnResolveColor(color)}
        >
            <h4>
                {cardValue} of {suite}
            </h4>
        </div>
    )
}

Card.propTypes = {
    suite: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Card