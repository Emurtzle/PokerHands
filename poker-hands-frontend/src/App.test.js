// React Test Library
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// Test Sever
import { server, rest } from "./testServer"

// Component
import App from './App'

// These tests check that the correct elements are rendered and does not have valid poker logic in it

// Should render the two player panels
test('Should load and render Player Panels correctly', async () => {
    const { getByText, getAllByText } = render(<App />)

    // CHeck for Player names and message
    await waitFor(() => expect(getByText("Player: Player1")).not.toBeNull())
    await waitFor(() => expect(getByText("Player: Player2")).not.toBeNull())
    expect(getAllByText("Please Click Start Game to deal a hand").length).toEqual(2);
})


// Should render the Game Controls panel
test('Should render Game Controls panel correctly', () => {
    const { getByText } = render(<App />)

    // Check the Game Control elements
    expect(getByText("Game Controls")).not.toBeNull()
    expect(getByText("Start Game")).not.toBeNull()
    expect(getByText("Advance Game")).not.toBeNull()
    expect(getByText("Winner is:")).not.toBeNull()
    expect(getByText("With a")).not.toBeNull()
    
})

// Should render 5 cards underneath each player when the "Start Game" button is pressed
test('Should render the 10 cards passed from the api', async () => {
    const { getByText } = render(<App />)

    // Click "Start Game" button
    fireEvent.click(getByText("Start Game"))

    // Check for resulting cards
    await waitFor(() => expect(getByText("9 of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("8 of hearts")).not.toBeNull())
    await waitFor(() => expect(getByText("8 of clubs")).not.toBeNull())
    await waitFor(() => expect(getByText("6 of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("Jack of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("Queen of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("7 of hearts")).not.toBeNull())
    await waitFor(() => expect(getByText("Jack of spades")).not.toBeNull())
    await waitFor(() => expect(getByText("4 of hearts")).not.toBeNull())
    await waitFor(() => expect(getByText("4 of diamonds")).not.toBeNull())
})

// Should render a winner underneath game controls when the "Advance Game" button is pressed
test('Should render a winner in game controls when Advance Game button is pressed', async () => {
    const { getByText } = render(<App />)

    // Click "Start Game" button
    fireEvent.click(getByText("Start Game"))

    // Wait for cards to show up and ensure they're there
    await waitFor(() => expect(getByText("9 of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("8 of hearts")).not.toBeNull())
    await waitFor(() => expect(getByText("8 of clubs")).not.toBeNull())
    await waitFor(() => expect(getByText("6 of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("Jack of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("Queen of diamonds")).not.toBeNull())
    await waitFor(() => expect(getByText("7 of hearts")).not.toBeNull())
    await waitFor(() => expect(getByText("Jack of spades")).not.toBeNull())
    await waitFor(() => expect(getByText("4 of hearts")).not.toBeNull())
    await waitFor(() => expect(getByText("4 of diamonds")).not.toBeNull())

    // Click "Advance Game" button
    fireEvent.click(getByText("Advance Game"))

    // Check for results
    await waitFor(() => expect(getByText("Winner is: Player2")))
    await waitFor(() => expect(getByText("With a Winning Hand")))
})