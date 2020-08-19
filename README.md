# chiMera Project

- A creativity app for mixing and matching various media onto a canvas so you can share with friends and the world! Search in-app for popular media sources to find the perfect addition for your canvas or custom link/upload your own and put it on display in the gallery for others to like and discuss.

### Setup

Create .env

```
cp .env.example .env
```

```
npm install
```

### Dependencies

- ReactJS
- Bootstrap 4.5.2
- Firebase
- Material UI
- Axios
- Node SASS
- jQuery
- dotenv
- Ruby Rails 6 (if running database API in lieu of Firebase)

### Required API's

- Azure (image search)
- Google (video search)
- Spotify (audio)

### Firebase

If you have already run `npm install` before this update, follow these instructions

Install Firebase Tools

```
npm install -g firebase-tools
```

- if you get errors, try this instead

```
sudo npm install -g firebase-tools
```

Install Firebase

```
npm i firebase --save-dev
```
