/**
 * const domain = 'https://catholicviet.jp:8000';*/
const apiDomain = 'http://localhost:8000'


const apiURL = '/api';            //custom-api
export const endpoint = `${apiDomain}${apiURL}`;

const authURL = '/rest-auth';     //rest-framework
export const authEndPoint = `${apiDomain}${authURL}`

//Authentication endpoint Api
export const loginEndPoint = `${authEndPoint}/login/`
export const signUpEndPoint = `${endpoint}/account/create`
export const passwordResetRequest = `${endpoint}/account/requestPassword`
export const passwordReset = `${endpoint}/account/resetPassword`

//New Feed endpoint Api
export const newfeedsListURL = `${endpoint}/newfeed/`;
export const newfeedDetailURL = (id: number) => `${endpoint}/newfeed/${id}/`;
export const updateNewFeedURL = (id: number, update_type: string) =>
  `${endpoint}/newfeed/${id}/update/?type=${update_type}`;

//Mass registration endpoint Api
export const myregisterURL = (churchId: number) =>
  `${endpoint}/massregister/?churchId=${churchId}`;
export const massregisterCreateURL = `${endpoint}/massregister/create/`;
export const registerUpdateURL = (id: number) =>
  `${endpoint}/massregister/${id}/update/`;