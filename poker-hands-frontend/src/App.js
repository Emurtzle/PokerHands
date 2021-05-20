import {useState, useEffect } from 'react'

import GameControl from "./Components/GameControl"
import Player from "./Components/Player"

function App() {
  const [playerOne, setPlayerOne] = useState({})
  const [playerTwo, setPlayerTwo] = useState({})
  const [winner, setWinner] = useState("")
  const [winningHand, setWinningHand] = useState("")
  const [gameId, setGameId] = useState({})
  const [playerOneHand, setPlayerOneHand] = useState([])
  const [playerTwoHand, setPlayerTwoHand] = useState([])

  const fetchPlayers = () => {
    return fetch("http://localhost:45092/api/players")
    .then(res => res.json())
  }

  const fetchRegisterGame = () => {
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        players: [
          {
            id: playerOne.id,
            name: playerOne.name
          },
          {
            id: playerTwo.id,
            name: playerTwo.name
          }
        ]
      })
    }
    return fetch("http://localhost:45092/api/games", requestOptions)
      .then(resp => resp.json())
  }

  const fetchAdvanceGame = () => {
    var url = "http://localhost:45092/api/games/advance/" + gameId
    return fetch(url)
      .then(resp => resp.json())
  }

  useEffect(() => {
    let mounted = true;
    fetchPlayers()
      .then(data => {
        if(mounted) {
          setPlayerOne(data[0])
          setPlayerTwo(data[1])
        }
      })
    return () => mounted = false;
  }, [])

  // Keep API calls and functions passed down to buttons seperate
  const FnRegisterGame = () => {
    fetchRegisterGame()
      .then( data => {
        setPlayerOneHand(data.playerOneHand)
        setPlayerTwoHand(data.playerTwoHand)
        setGameId(data.id);
      }
    )
    setWinner("")
    setWinningHand("")
  }

  const FnAdvanceGame = () => {
    fetchAdvanceGame()
      .then(data => {
        setWinner(data.winner.name)
        setWinningHand(data.winningCards)
      })
  }


  return (
    <div>
      {/* Simple Navbar with just a title, no need for anything more */}
      <nav className="navbar navbar-inverse navbar-fixed-top bg-light">
        <div className="container-fluid">
          <span className="navBar-brand h3">Poker Hands</span>
        </div>
      </nav>

      {/* Parent container */}
      <div className="container-fluid">
        <div className="row">
          
          {/* Player 1 */}
          <div className="col-5">
            <div className="d-flex">
              <Player name={playerOne.name} hand={playerOneHand}/>
            </div>
          </div>

          {/* Game Controls */}
          <div className="col-2">
            <div className="d-flex w-100">
                <GameControl 
                  registerGame={FnRegisterGame}
                  advanceGame={FnAdvanceGame}
                  winner={winner}
                  winningHand={winningHand}
                />
              </div>
          </div>

          {/* Player 2 */}
          <div className="col-5">
            <div className="d-flex">
              <Player name={playerTwo.name} hand={playerTwoHand}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App;
