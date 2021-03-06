# photo-grapher
> Photo location data visualization application.

This app is used for plotting and visualizing photo location data using Google Drive as a the photo data repository.

https://photo-grapher.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/8b95cd9f-b264-4801-9d30-98e30a11ea62/deploy-status)](https://app.netlify.com/sites/photo-grapher/deploys)

<img src="https://user-images.githubusercontent.com/8262156/57884879-b17e9080-77f7-11e9-9cac-dd4b43833307.png" alt="browserstack" width="100"> | Tested with [BrowserStack](https://www.browserstack.com/) 
--- | ---

## Developing
### Built With
React 📦 TypeScript 📦 Ramda 📦 Styled Components 📦 Leaflet
### Setting up Dev
:heavy_check_mark: [Use the Google API Console to create a project](https://developers.google.com/drive/activity/v1/guides/project)

:heavy_check_mark: [Set up an API key for the new project](https://support.google.com/googleapi/answer/6158862?hl=en)

:heavy_check_mark: [Enable](https://support.google.com/googleapi/answer/6158841?hl=en) the Google Drive API

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
Update `.env` with your Client ID and Client Secret found in the Google Developer Console.

## Getting Started
Start the development server
```shell
yarn start
```
Navigate to [http://localhost:8000/](http://localhost:8000/)

## API Reference

 - [Google Drive API Overview](https://developers.google.com/drive/api/v3/about-sdk)
 - [Google Drive API Reference](https://developers.google.com/drive/api/v2/reference/)
