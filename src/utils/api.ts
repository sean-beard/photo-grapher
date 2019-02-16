/// <reference path="../../node_modules/@types/gapi/index.d.ts" />

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET as string;
const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.photos.readonly"
];
export const URL_PREFIX = `https://www.googleapis.com/drive/v3/files??key=${CLIENT_SECRET}`;

/**
 * @param onSuccess Auth success callback
 * @param onError Auth error callback
 */
export const authorizeWithGoogle = (
  onSuccess: () => void,
  onError: () => void
) =>
  gapi.load("client", () =>
    gapi.client.load("oauth2", "v2", () =>
      gapi.auth.authorize(
        { client_id: CLIENT_ID, scope: SCOPES, immediate: true },
        authResult => {
          if (authResult && !authResult.error) {
            return onSuccess();
          } else {
            console.log(`Authorization failure... ${authResult.error}`);
            onError();
          }
        }
      )
    )
  );

/**
 * @param callback A function in the global namespace,
 * which is called when the sign-in button is rendered and also called after a sign-in flow completes.
 */
export const googleLogin = (callback: () => void) =>
  gapi.auth.signIn({
    clientid: CLIENT_ID,
    scope: SCOPES.join(" "),
    cookiepolicy: "single_host_origin",
    callback
  });

/**
 * Fetches root level Google Drive folders
 */
export const fetchRootLevelDriveFolders = (
  onSuccess: (response: gapi.client.HttpRequestFulfilled<any>) => void,
  onError: (error: any) => void
) =>
  googleDriveFetch(
    `mimeType = 'application/vnd.google-apps.folder' and 'root' in parents`,
    response => onSuccess(response),
    error => onError(error)
  );

/**
 * Fetch only photos which have locations from a given Google Drive folder.
 */
export const fetchDrivePhotosWithLocFromFolder = (
  folderId: string,
  onSuccess: (response: gapi.client.HttpRequestFulfilled<any>) => void,
  onError: (error: any) => void
) =>
  googleDriveFetch(
    `"${folderId}" in parents and mimeType contains 'image'&fields=files(id,imageMediaMetadata)`,
    response => onSuccess(response),
    error => onError(error)
  );

/**
 * Perform a Google Drive fetch operation.
 * @param queryParams Query param string
 *  @example "mimeType = 'application/vnd.google-apps.folder' and 'root' in parents"
 * @param fetchSuccess Callback invoked following a successful GET operation
 * @param fetchError Callback invoked following a failed GET operation
 * @param authSuccess Callback invoked following successful authorization
 * @param authError Callback invoked following failed authorization
 */
export const googleDriveFetch = (
  queryParams: string,
  fetchSuccess: (response: gapi.client.HttpRequestFulfilled<any>) => void,
  fetchError: (error: any) => void,
  authSuccess?: () => void,
  authError?: () => void
) =>
  authorizeWithGoogle(
    () => {
      if (authSuccess) {
        authSuccess();
      }
      // response.result.files / response.result.nextPageToken
      gapi.client
        .request({
          path: `${URL_PREFIX}&q=${queryParams}`
        })
        .then(response => fetchSuccess(response))
        .catch(error => {
          if (fetchError) {
            fetchError(error);
          }
        });
    },
    () => {
      if (authError) {
        authError();
      }
    }
  );
