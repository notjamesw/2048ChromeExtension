# 2048 Chome Extension

### Motivation:
I started this project initially motivated by the desire to learn about Chrome extensions. I built simple static webpages with HTML/CSS and a little bit of Javascript (see ArchiveOfJamesWen), but I wanted to learn more about building interactive webpages with Javascript. I noticed my friends at the time were addicted to 2048 so I thought it would be a great idea to design a 2048 clone. 

### Features:
- Can slide and merge tiles using the WASD or arrow keys
- Can start a new game with the "new game" button
- Game over translucent overlay screen with "new game" button
- Data persistence, the highscore is kept with the Chrome storage API and carried over across games and browsers

The Zip files contain the different versions of the 2048 extension, and the extension can be found on the Chrome web store through the link here: [2048 Extension](https://chromewebstore.google.com/detail/2048/peckdagaipkndmdainakjgncbkhigafp)

### Future Improvements:
- Storing the current game state in cache, so closing the extension wouldn't restart the game
- Complete code overhaul, re-programming the extension in react (each tile is a react component)
  - greater code reusability, also makes it easier to implement other features in the future
- Implementing a leaderboard system
