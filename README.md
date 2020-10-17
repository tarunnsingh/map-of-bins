## [PREZI PRESENTATION LINK](https://prezi.com/view/Bsg1XJNvvHdAtvs7WTEY/)

## Addverb Assignment - Problem Statement 8

<img src="https://www.pngkey.com/png/detail/316-3164020_sunrise-earthmovers-green-city-clean-city.png" />

### :speech_balloon: An APP to make our Cities Clean and Garbage Free.

## The Idea :thinking:
The sole idea is to motivate the citizens using the app, to use dustbins regularly while disposong waste. This has been a common saying, but we have put in a Reward Sysytem which would basicaly increase the chances for a person to use a dustbin, as he would be rewarded on doing so.

## The App and it's working explained :computer:  
We have created a Web Application, with the usual client-server architecture. The users would be able to see a *map* on the homepage, which would populate the nearby dustbins on the map depending on their proximity to the user's location (fetched from the browser). The user would then be prompted to go to that dustbin and drop the waste materials in it. When the user does that, we would cross-verify it using some information sent by the sensors on the dustbin. Once confirmed the user would then be awarded some **reward points**.

## The Reward System :gift:
The rewards will be given to the user whenever he uses the dustbin. The rewards and the quantity of the waste will be proportionate to each other. The user can also get more rewards by crssing certain levels. We can also give reward points when a user shares the app with his/her friends, so that it motivates everyone to start cleaning up his/her surroundings, which will ultimately help us to build a clean and healthy city. The user can also see a leaderboard which will show the total rewards of his/her friends. The rewards can later on be used to buy products from e-commerce platforms if they cross certain threshold.

## Start the App Locally or Test [LIVE](https://addverb-project-lnmiit.herokuapp.com/)
### Steps:

1. Clone the Repository.
2. Install dependencies `npm install && npm install --prefix client`.
3. Add following Keys in `.env` file in root.
```
MONGODB_URI= 
JWT_SECRET_KEY=
```
4. Add following keys in `.env` file in 'client folder`.
```
REACT_APP_GOOGLE_API_KEY=
```
5. Go back to root directory and start the app by `npm run dev`.

## Stack: MERN :page_with_curl:
The Folder Structure is the general MERN stack, having a `client folder` for the Frontend (ReactJS). The roots has the Server Components including DB Setup, Passport etc.


<img src="https://blog.hyperiondev.com/wp-content/uploads/2018/09/Blog-Article-MERN-Stack.jpg" />

### The Authorization
The Auth was implemented using PassPortJs, utilizing the JsonWebTokens. Every authorized user will have a `access_token` **cookie** in the browser, which acts as the source of auth throughout all routes.

### The Map Section
The Map was implemneted using `@react-google-maps/api`, which made all the necessary functionalities available. Includng Popups, markers etc.



> Thank You 
