# chiMera Project

- A creativity app for mixing and matching various media onto a canvas so you can share with friends and the world! Search in-app for popular media sources to find the perfect addition for your canvas or custom link/upload your own and put it on display in the gallery for others to like and discuss.

## Final Product

### Front Page

!["Front Page"](https://github.com/RubinJhand/chiMera/blob/master/docs/overview.gif)

### Comments (real-time)

!["Comments"](https://github.com/RubinJhand/chiMera/blob/master/docs/comments-live.gif)

### User View of Original Layout

!["Panel-Canvas"](https://github.com/RubinJhand/chiMera/blob/master/docs/panel-to-canvas.gif)

### Creating Unique Layout with Media

- Entering Edit Area and Image Search
- !["Creating"](https://github.com/RubinJhand/chiMera/blob/master/docs/image-search.gif)

- Media Resizing
- !["Creating"](https://github.com/RubinJhand/chiMera/blob/master/docs/image-resize.gif)

- User Media Upload to Cloud
- !["Creating"](https://github.com/RubinJhand/chiMera/blob/master/docs/media-upload-resize.gif)

- Saved Work
- !["Creating"](https://github.com/RubinJhand/chiMera/blob/master/docs/saved-panel.gif)

## General Features

- Create unique layout with media
- Search for media
- Add music via Spotify
- Compatible with multiple live videos on one canvas
- Edit: user can rearrange as they see fit and update
- Delete: user can delete their work
- Save
- Viewable exactly how user originally laid out media
- User can upload personal media to cloud and use media mulitiple times
- User can comment and recieve reply from other users in real-time

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
