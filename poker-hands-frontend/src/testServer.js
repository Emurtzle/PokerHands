// Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// Setup Mock service
const server = setupServer(
    // API call for getting players
    rest.get("http://localhost:45092/api/players", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(
            [
                {
                    "id": 1,
                    "name": "Player1"
                },
                {
                    "id": 2,
                    "name": "Player2"
                }
            ]
        ))
    }),
    // API call for advancing the game
    rest.get("http://localhost:45092/api/games/advance/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(
            {
                "playerOne": {
                  "id": 1,
                  "name": "Player1"
                },
                "playerTwo": {
                  "id": 2,
                  "name": "Player2"
                },
                "winner": {
                  "id": 2,
                  "name": "Player2"
                },
                "playerOneHand": [
                  {
                    "id": 17,
                    "value": 6,
                    "suite": "diamonds",
                    "color": "red"
                  },
                  {
                    "id": 26,
                    "value": 8,
                    "suite": "clubs",
                    "color": "black"
                  },
                  {
                    "id": 27,
                    "value": 8,
                    "suite": "hearts",
                    "color": "red"
                  },
                  {
                    "id": 29,
                    "value": 9,
                    "suite": "diamonds",
                    "color": "red"
                  },
                  {
                    "id": 37,
                    "value": 11,
                    "suite": "diamonds",
                    "color": "red"
                  }
                ],
                "playerTwoHand": [
                  {
                    "id": 9,
                    "value": 4,
                    "suite": "diamonds",
                    "color": "red"
                  },
                  {
                    "id": 11,
                    "value": 4,
                    "suite": "hearts",
                    "color": "red"
                  },
                  {
                    "id": 23,
                    "value": 7,
                    "suite": "hearts",
                    "color": "red"
                  },
                  {
                    "id": 40,
                    "value": 11,
                    "suite": "spades",
                    "color": "black"
                  },
                  {
                    "id": 41,
                    "value": 12,
                    "suite": "diamonds",
                    "color": "red"
                  }
                ],
                "id": 1,
                "winningCards": "Winning Hand"
            }
        ))
    }),
    // API call for registering a game
    rest.post("http://localhost:45092/api/games", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(
            {
                "id": 1,
                "playerOne": {
                  "id": 1,
                  "name": "Player1"
                },
                "playerTwo": {
                  "id": 2,
                  "name": "Player2"
                },
                "winner": null,
                "playerOneHand": [
                  {
                    "id": 29,
                    "value": 9,
                    "suite": "diamonds",
                    "color": "red"
                  },
                  {
                    "id": 27,
                    "value": 8,
                    "suite": "hearts",
                    "color": "red"
                  },
                  {
                    "id": 26,
                    "value": 8,
                    "suite": "clubs",
                    "color": "black"
                  },
                  {
                    "id": 17,
                    "value": 6,
                    "suite": "diamonds",
                    "color": "red"
                  },
                  {
                    "id": 37,
                    "value": 11,
                    "suite": "diamonds",
                    "color": "red"
                  }
                ],
                "playerTwoHand": [
                  {
                    "id": 41,
                    "value": 12,
                    "suite": "diamonds",
                    "color": "red"
                  },
                  {
                    "id": 23,
                    "value": 7,
                    "suite": "hearts",
                    "color": "red"
                  },
                  {
                    "id": 40,
                    "value": 11,
                    "suite": "spades",
                    "color": "black"
                  },
                  {
                    "id": 11,
                    "value": 4,
                    "suite": "hearts",
                    "color": "red"
                  },
                  {
                    "id": 9,
                    "value": 4,
                    "suite": "diamonds",
                    "color": "red"
                  }
                ]
            }
        ))
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { server, rest }