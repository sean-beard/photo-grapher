# photo-grapher
> Photo location data visualization application.

This app is used for plotting and visualizing photo location data using Google Drive as a the photo data repository.

https://photo-grapher.netlify.com/

[![Netlify Status](https://api.netlify.com/api/v1/badges/8b95cd9f-b264-4801-9d30-98e30a11ea62/deploy-status)](https://app.netlify.com/sites/photo-grapher/deploys)

## Getting started
Start the development server
```shell
yarn start
```
Navigate to [http://localhost:8000/](http://localhost:8000/)

## Developing
### Built With
React 📦 TypeScript 📦 Ramda 📦 Styled Components 📦 Leaflet
### Setting up Dev
:heavy_check_mark: [Use the Google API Console to create a project](https://developers.google.com/drive/activity/v1/guides/project)

:heavy_check_mark: [Set up an API key for the new project](https://support.google.com/googleapi/answer/6158862?hl=en)

:heavy_check_mark:[Enable](https://support.google.com/googleapi/answer/6158841?hl=en) the following APIs:
 - Google Drive API
 - Google Picker API

 Then

```shell
git clone https://github.com/sean-beard/photo-grapher.git
cd photo-grapher/
yarn install
```
:clipboard: Clone the source code to your local machine.

:walking: Navigate to the application's root directory.

:rocket: Install dependencies.

### Configuration
Create a file named `.env` in the root directory by copying the `.env.sample` file. 
```script
cp .env.sample .env
```
or for Windows 
```script
copy .env.sample .env
```
Add your Client ID and Client Secret found in the Google Developer Console and restart the development server.
```script
yarn start
```

## API Reference

 - [Google Drive API Overview](https://developers.google.com/drive/api/v3/about-sdk)
 - [Google Drive API Reference](https://developers.google.com/drive/api/v2/reference/)
