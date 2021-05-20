using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PokerHandsBackend.Models
{
    public class Player
    {
        public int Id { get; set; }     // Db Id of player

        [Required]
        [MaxLength(250)]
        public string Name { get; set; }  // Name of Player (assumed to be unique)  
    }
}
