using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PokerHandsBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PokerHandsBackend.DataAccess
{
    public class DataSeeder
    {
        public static void SeedPlayersAndCards(IServiceProvider serviceProvider)
        {
            // Get the db context in way that disposes of it later
            using (var ctx = new PokerHandsContext(
                serviceProvider.GetRequiredService<DbContextOptions<PokerHandsContext>>()))
            {
                // If Player data does not exist, seed the players
                if (!ctx.Players.Any())
                {
                    // Seed two players
                    ctx.Players.AddRange(
                        new Player
                        {
                            Name = "Tom Jones"
                        },
                        new Player
                        {
                            Name = "Sam Smith"
                        });
                }

                // If Card data does not exist, seed the players
                if (!ctx.Cards.Any())
                {
                    // Seed the cards
                    // Loop through the 13 values
                    for (int i = 2; i <= 14; i++)
                    {
                        // if the value of the card is 11(jack), 12(queen), 13(king) or 14(ace), use a character reprensenting them instead of the number
                        string valueCode = "";
                        if (i >= 2 && i <= 10)
                        {
                            valueCode = i.ToString();
                        } else
                        {
                            switch(i)
                            {
                                case 11:
                                    valueCode = "j";
                                    break;
                                case 12:
                                    valueCode = "q";
                                    break;
                                case 13:
                                    valueCode = "k";
                                    break;
                                case 14:
                                    valueCode = "a";
                                    break;
                            }
                        }

                        // Add the four cards of different suites per value
                        ctx.Cards.AddRange(
                            new Card
                            {
                                Value = i,
                                Suite = "diamonds",
                                Color = "red",
                                CardCode = (valueCode + 'd')
                            },
                            new Card
                            {
                                Value = i,
                                Suite = "clubs",
                                Color = "black",
                                CardCode = (valueCode + 'c')
                            },
                            new Card
                            {
                                Value = i,
                                Suite = "hearts",
                                Color = "red",
                                CardCode = (valueCode + 'h')
                            },
                            new Card
                            {
                                Value = i,
                                Suite = "spades",
                                Color = "black",
                                CardCode = (valueCode + 's')
                            });
                    }
                }
                ctx.SaveChanges();
            }
        }
    }
}
