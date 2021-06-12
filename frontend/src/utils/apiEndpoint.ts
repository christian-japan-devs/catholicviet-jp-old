/**
 * const domain = 'https://catholicviet.jp:8000';*/
//export const apiDomain = process.env.API_DOMAIN; 
//export const apiDomain = 'http://192.168.2.149:8000';
export const apiDomain = 'http://admin.vietcatholicjp.com'

const apiURL = '/api'; //custom-api
export const endpoint = `${apiDomain}${apiURL}`;

const authURL = '/rest-auth'; //rest-framework
export const authEndPoint = `${apiDomain}${authURL}`;

//Authentication endpoint Api
export const loginEndPoint = `${authEndPoint}/login/`;
export const signUpEndPoint = `${endpoint}/account/create`;
export const requestPassword = `${endpoint}/account/request-password`;
export const resetPassword = `${endpoint}/account/reset-password`;
export const confirmEndPoint = `${endpoint}/account/confirm`;
//Monthly Topic endpoint Api
export const monthlyTopicEnd = `${endpoint}/monthly-topic`;
export const monthlyTopicDetailEnd = (month: string) => `${endpoint}/monthly-topic/${month}`;

//New Feed endpoint Api
export const newfeedsURL = `${endpoint}/newfeed`;
export const newfeedDetailURL = (id: number) => `${endpoint}/newfeed/${id}`;
export const updateNewFeedURL = (id: number, update_type: string) =>
  `${endpoint}/newfeed/${id}/update/?type=${update_type}`;

//Mass registration endpoint Api
export const myregisterURL = (churchId: number) =>
  `${endpoint}/massregister/?churchId=${churchId}`;
export const massregisterCreateURL = `${endpoint}/massregister/create`;
export const registerUpdateURL = (id: number) =>
  `${endpoint}/massregister/${id}/update`;
