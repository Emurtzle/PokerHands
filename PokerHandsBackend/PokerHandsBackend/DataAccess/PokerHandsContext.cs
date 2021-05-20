using Microsoft.EntityFrameworkCore;
using PokerHandsBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokerHandsBackend.DataAccess
{
    public class PokerHandsContext : DbContext
    {
        public PokerHandsContext(DbContextOptions<PokerHandsContext> options) : base(options) { }

        public DbSet<Player> Players { get; set; }  // Player Table
        public DbSet<Card> Cards { get; set; }      // Cards Table
        public DbSet<Game> Games { get; set; }      // Games Table
    }
}
