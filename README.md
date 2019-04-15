### App Tech stack
- firebase
- React [create-react-app][ES-lint]
- Redux
- Sass
- thunk
- jest
- enzyme
- express

### Bootstrap the app
- cd frontend
- npm i
- cd ../server/function
- npm i
- npm start

### config management
- frontend  : frontend/.env.development and .env.production file manages API path and google api key
- backend : server/functions/.env file manages API google key

### local url
- frontend [http://localhost:3000]
- api [http://localhost:5000/medwing-server/us-central1/app]
- [express app is based on google firebase functions]

## Production App Details:
- to host an app i have created 2 separate repository , different ci/cd for frontend and backend as mentioned below.
- while submitting an app i have combine both frontend and backend togather for easy in bootstrap the app

#### Frontend:
- https://medwing-front.firebaseapp.com/findplaces

#### API:
- https://us-central1-medwing-server.cloudfunctions.net/app/

## test 
- cd frontend
- npm run test

### Frontend Feature
- config management
- prettier enables as pre commit hook
- frontend test
- firebase hosting with ci / cd pipeline in gitlab
- display toastr messages on success and faliure.

### API feature
- fetch all place
- add new place
- update new place
- delete new place

## pending work
- mobile extra padding at bottom