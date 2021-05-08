const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";

export const VCJTOKEN = "vcj_token";
export const EXPIRATION_DATE = "vcjexpDate"

export const endpoint = `${localhost}${apiURL}`;

export const newfeedsListURL = `${endpoint}/products/`;
export const newfeedDetailURL = (id:number) => `${endpoint}/products/${id}/`;
export const updateNewFeedURL = (id:number,update_type:string) => `${endpoint}/newfeed/${id}/update/?type=${update_type}`;
export const myregisterURL = (churchId:number) =>`${endpoint}/massregister/?churchId=${churchId}`;
export const massregisterCreateURL = `${endpoint}/massregister/create/`;
export const registerUpdateURL = (id:number) => `${endpoint}/massregister/${id}/update/`;
