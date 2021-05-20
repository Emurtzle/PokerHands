using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PokerHandsBackend.Models
{
    public class Card
    {
        /*
         * Card order:
         * Lowest: 2, Highest: Ace
         * 11 = Jack, 12 = Queen, 13 = King, 14 = Ace
         * 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14
         * Suit has no impact on value
         * Spades, Hearts, Clubs, Diamonds
         * 13 cards from each of the 4 suites
         */
        public int Id { get; set; } // Db Id of card

        [Required]
        [Range(2, 14, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public int Value { get; set; }  // Value of card, must be between (including) 2 and 14

        [Required]
        public string Suite { get; set; }   // Suite of Card: 'spades', 'hearts', 'clubs', 'diamonds'

        [Required]
        public string Color { get; set; }   // Color of card: 'red', 'black'

        [Required]
        [MaxLength(2)]
        public string CardCode { get; set; }    // card code of card e.x: ac, 4d, kh
    }
}
