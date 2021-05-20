using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PokerHandsBackend.DataAccess;
using PokerHandsBackend.Models;
using HoldemHand;

namespace PokerHandsBackend.Controllers
{
    [Route("api/games")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly PokerHandsContext _context;

        public GamesController(PokerHandsContext context)
        {
            _context = context;
        }

        // GET: api/Games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _context.Games.ToListAsync();
        }

        // GET: api/Games/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            Game game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }
        /*
         * {
         *      "players": [
         *          {
         *              "id": 1,
         *              "Name": "Tom Jones"
         *          },
         *          {
         *              "id": 2,
         *              "Name": "Sam Smith"
         *          }
         *      ]
         * }
         */
        [HttpPost]
        public async Task<ActionResult<Game>> RegisterGame(JObject json)
        {
            // Get players from Db with ids from json object
            // NOTE: This is not the best way to do this
            Player playerOne = await _context.Players.FindAsync((int)json["players"][0]["id"]);
            Player playerTwo = await _context.Players.FindAsync((int)json["players"][1]["id"]);
            
            if (playerOne == null || playerTwo == null)
            {
                return NotFound();
            }

            // Create new game with players
            Game newGame = new Game();
            newGame.PlayerOne = playerOne;
            newGame.PlayerTwo = playerTwo;

            // Deal out hands
            // Load cards into a deck
            List<Card> deck = await _context.Cards.ToListAsync();
            // Shuffle deck based on Fisher–Yates shuffle algorithm
            Random random = new Random();
            for (int i = deck.Count - 1; i > 1; i--)
            {
                int rnd = random.Next(i + 1);
                Card temp = deck[rnd];
                deck[rnd] = deck[i];
                deck[i] = temp;
            }
            // Give each player hand (in game object) 5 cards from the same deck, removing the given card from the deck to avoid duplicates
            newGame.PlayerOneHand = new List<Card>();
            newGame.PlayerTwoHand = new List<Card>();
            for (int i = 0; i < 5; i++)
            {
                // Fake DeQueue (from front of list)
                newGame.PlayerOneHand.Add(deck[0]);
                deck.RemoveAt(0);
                newGame.PlayerTwoHand.Add(deck[0]);
                deck.RemoveAt(0);
            }
            // Add Game to Context
            _context.Games.Add(newGame);
            await _context.SaveChangesAsync();
            return newGame;
        }

        [HttpGet("advance/{id}")]
        public async Task<ActionResult<Game>> AdvanceGame(int id)
        {
            Game curGame = await _context.Games.FindAsync(id);

            if (curGame != null)
            {
                return NotFound();
            }

            // Convert hands into a string the hand parser can use: string of card codes seperate by spaces. ex: "ac as 4d 5d 6c 7c 8d"
            string playerOneHand = curGame.PlayerOneHand[0].CardCode;
            string playerTwoHand = curGame.PlayerTwoHand[0].CardCode;
            for (int i = 1; i < 5; i++)
            {
                playerOneHand += (' ' + curGame.PlayerOneHand[i].CardCode);
                playerTwoHand += (' ' + curGame.PlayerTwoHand[i].CardCode);
            }

            // parse the card hand string
            ulong handmaskOne = Hand.ParseHand(playerOneHand);
            ulong handmaskTwo = Hand.ParseHand(playerTwoHand);
            // Evaluate two hand masks
            uint handvalOne = Hand.Evaluate(handmaskOne);
            uint handvalTwo = Hand.Evaluate(handmaskTwo);
            // Get descriptions
            string descOne = Hand.DescriptionFromMask(handmaskOne);
            string descTwo = Hand.DescriptionFromMask(handmaskTwo);

            if (handvalOne > handvalTwo)    // Player one won
            {
                curGame.Winner = curGame.PlayerOne;
                curGame.WinningCards = descOne;
            } else if (handvalTwo > handvalOne) //Player two won
            {
                curGame.Winner = curGame.PlayerTwo;
                curGame.WinningCards = descTwo;
            } else  // Tie
            {   // need to handle ties better but ran out of time
                curGame.Winner = null;
                curGame.WinningCards = null;
            }
            
            await _context.SaveChangesAsync();
            return curGame;
        }
    }
}
