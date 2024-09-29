# TradeTrading

TradeTrading gives people the opportunity to share their skill experiences with one another to help complete the other person's task/project using a credit based system.

The website is built using NextJS, JavaScript, MongoDB, and Socket.io.

## Purpose of our application

The main purpose of your website, based on the information provided, is to facilitate communication and collaboration between users through a messaging platform. Here are the key aspects of the website's purpose:

1. User Interaction: Enable users to connect with each other, share ideas, and collaborate on various projects or tasks.

2. Real-Time Messaging: Provide a real-time messaging feature that allows users to communicate instantly, similar to platforms like Google Chat, enhancing user engagement.

3. Skill Matching: Allow users to showcase their skills and connect with others who have complementary skills, fostering networking and collaboration opportunities.

4. User Profiles: Facilitate user account management with features like account creation, login, and personalized profiles that display user information and skills.

5. Secure Environment: Ensure user data protection and privacy through secure authentication and authorization processes.

6. Resource Sharing: Allow users to share past work and projects, potentially leading to job opportunities, collaborations, or community building.

Overall, your website aims to create a collaborative environment where users can interact, share skills, and engage in meaningful conversations, ultimately enhancing their professional and social networks.

## Available Scripts

In the project directory, you can run:

### `npm i`

When booting up the project be sure to install needed dependencies in the client folder, server folder, and root folder project.

## .env setup

In the root of the server folder, next to app.js, create a .env file with the following text in it:
MONGO_URI="mongodb+srv://sunhacks:xjibeN6hZwyDkNh2@cluster0.wkbxq.mongodb.net/SkillShare"
SECRET_KEY="ruehgierhgieurei"
PORT=5000

### `npm run start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single-build dependency from your project.
