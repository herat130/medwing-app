### Bootstrap the app
- cd frontend
- npm i
- cd ../server/function
- npm i
- npm start

## local url
- frontend [http://localhost:3000]
- api [http://localhost:5000/medwing-server/us-central1/app]
- [express app is based on google firebase functions]

### git Repo
- https://github.com/herat130/medwing
- https://github.com/herat130/medwing-server

### gitLab for CI / CD
- https://gitlab.com/herat130/medwing/
- https://gitlab.com/herat130/medwing-server

## test 
- cd frontend
- npm run test

### Frontend Feature
- .env.devlopment and .env.production files for setting configuration related to app on dev and production phase
- prettier enables as pre commit hook
- firebase hosting with ci / cd pipeline in gitlab
- display toastr messages on success and faliure.

### API feature
- fetch all place
- add new place
- update new place
- delete new place

### Production App Details:
#### Frontend:
- https://medwing-front.firebaseapp.com/findplaces

#### API:
- https://us-central1-medwing-server.cloudfunctions.net/app/

### Tech stack
- React [create-react-app]
- Redux
- Sass
- thunk
- jest
- enzyme
- express

## pending work
- mobile extra padding at bottom