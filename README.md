Cards: Match Pairs
=====
New Game:
![ScreenShot](https://raw.github.com/iheyroldy/PersonalWebsite/master/public/img/preview-matching-pairs-new.png)
<br>
Game in progress:
![ScreenShot](https://raw.github.com/iheyroldy/PersonalWebsite/master/public/img/preview-matching-pairs-played.png)

Description:
------
Started as an experiment with Socket.io as a learning exercise, since I wanted to use Socket.io in my Casino style project. With Socket.io, I am able to create and return objects/data from the server, similar to AJAX calls. 


Each Deck object contains multiple Card objects. Each Card object contains the value of the card, suit type, back html, and front html.
- value = card value Ace (1), 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack (11), Queen (12), and King (13)
- suit = Heart, Diamond, Spade, and Club
- back html = html containing the back side/image
- front html = html containing the front side which displays the value and suit in a design similar to real cards


Game Objective:
----
Clear the board by clicking on two (2) cards to make a pair and pairing each card. 
- The score is calculated as: score = current score + (multiplier * score base)
  - Current score is the total current score
  - Multiplier starts at 1. For every pair made, the multiplier increments by 1. When a pair isn't made, the multiplier is reset back to 1
  - Score base is 10
  - Example: current score = 50, multiplier = 2, score base = 10
    - new score = 50 + (2 * 10) = 50 + 20 = 70

When all the cards have been paired together, a prompt will be displayed if the user wants to play again.
