# An Nhiên - Trang web coi bói cực hay

<a href="https://coiboicuchay.social/">
<p align="center">
    <img width="300" height="300" scr="https://static.overlay-tech.com/assets/9b8f6e55-f5d0-42d0-b508-be81c2425e2f.png">
</p>
</a>

# Introduction
This is a web app project about fortune telling which has these main features:
1. Fortune telling with normal cards
2. Fortune telling with Tarot cards
3. Fortune telling with date of birth
**Note: all of the above features require an account to work. For testing purpose, use this account:**
- Username: test123
- Password: test123


## Fortune telling with normal cards
This feature will randomly select 5 cards out of 52 cards from the database along with their meanings. The meanings then will be summarized by an AI model - Gemma 7B with an API call to Grog. This result will be reset after 1 hour.

After hitting "Lật Bài", the cards will be revealed and tapping on each will show its meaning.

The overall message got from the response of the API call can be read aloud with a button. This feature is provided using an API call to Microsoft Speech to Text API. You can learn more about this implementation in `index.js` code.

## Fortune telling with Tarot cards
Similarly, this feature has the button to reveal the cards, summarizes the meanings with Gemma, the reset mechanism, and the read aloud button. However, our server only sends a response of 3 cards with their respective meanings.

## Fortune telling with date of birth
This feature uses the inputted date of birth from the user and responses with their respective meanings, additional information like zodiac sign, ruling number... are also provided. The meanings are overall summarized too.

> The summarized meaning is told by a character named "Thầy Rùa"

## Dependencies
*This project is committed with `node_modules` folder so there is no need to install additional packages.*

# Instruction
## Start development website
To start testing this web app project: run `npm run dev` in terminal.
There is no need to start backend server as the deployed one already accepts requests from dev address. However, if you desire to test backend code locally, you can navigate to `express-api` folder and run this command to start the server `node index.js`.
*Note: you may have to change all endpoint links from the components code to the backend endpoint like `localhost:3000`.*

*Come check out this project [here](https://coiboicuchay.social)*

## Contributors
<a href="https://github.com/thnbih/Harmonious-Living-Website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=thnbih/Harmonious-Living-Website" />
</a>