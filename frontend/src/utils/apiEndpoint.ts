export const apiDomain = process.env.REACT_APP_API_END_POINT;
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

//Church endpoint Api
export const churchURL = `${endpoint}/church`;
export const churchDetailURL = (id: number) => `${endpoint}/church/${id}/detail`;

//Mass registration endpoint Api
//Available Masses
export const getListMassURL = `${endpoint}/getmass`
export const myRegisterByChurchIdURL = (churchId: number) =>
  `${endpoint}/massregister/?churchId=${churchId}`;
export const massRegisterCreateURL = `${endpoint}/massregister`;
export const registerUpdateURL = (id: number) =>
  `${endpoint}/massregister/${id}/update`;
