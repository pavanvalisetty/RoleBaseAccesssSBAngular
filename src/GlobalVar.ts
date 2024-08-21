import { Injectable } from "@angular/core";

@Injectable()
export class Global {

    static appValues = new Map();
    static formValues= new Map();

}
export class TokenDetails{
    token:any;
    expiresIn:any;
}

export const GlobalVar = {
    apiUrl: '',
    googleApiKey: '',
    // admin URL
    adminTokeFetchURL: `http://localhost:8006/admin/authenticate`,
    adminFetchUsersURL:`http://localhost:8006/admin/find/all`,
    adminCreateEmployee: `http://localhost:8006/admin/register`,
  }