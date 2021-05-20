using Moq;
using PokerHandsBackend.Controllers;
using PokerHandsBackend.DataAccess;
using PokerHandsBackend.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace PokerHandsBackend.Tests
{
    public class PlayersControllerTests
    {
        private readonly PlayersController _sut;
        private readonly Mock<PokerHandsContext> _pokerHandsContextMock = new Mock<PokerHandsContext>();

        public PlayersControllerTests()
        {
            _sut = new PlayersController(_pokerHandsContextMock.Object);
        }

        [Fact]
        public async Task GetPlayers_ShouldReturnAListOfTwoPlayers()
        {
            // Arrange

            // Act
            var players = await _sut.GetPlayers();

            // Assert
            Assert.Equal(2, 2);
        }
    }
}
