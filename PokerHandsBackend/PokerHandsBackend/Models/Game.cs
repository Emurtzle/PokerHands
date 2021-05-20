using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PokerHandsBackend.Models
{
    public class Game
    {
        public int Id { get; set; } //Db Id

        [Required]
        public virtual Player PlayerOne { get; set; }   // First Player

        [Required]
        public virtual Player PlayerTwo { get; set; }   // Second Player
        
        public virtual Player Winner { get; set; }  // Winner of the game
        public string WinningCards { get; set; }    // Description of the winnning hand from Keith Rules Poker Evaluator

        public virtual List<Card> PlayerOneHand { get; set; }   // Hand of Player one
        public virtual List<Card> PlayerTwoHand { get; set; }   // Hand of Player two

    }
}
