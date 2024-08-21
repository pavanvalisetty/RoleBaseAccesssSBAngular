import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, tap } from 'rxjs';
import { Role } from '../roles.enum';
import { GlobalVar } from 'src/GlobalVar';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  apiURL = 'http://localhost:3000/users';
  roleAccessURL = 'http://localhost:3000/users?role=';
  admintokenURL = 'http://localhost:8006/api/auth/login';
  admintokenURLMain = `http://localhost:8006/api/auth/login`;
  adminUSersGet = 'http://localhost:8006/api/users/admin'

  private tokenKey = 'token';
  private adminTokenFetchURL = GlobalVar.adminTokeFetchURL;
  private adminFetchUsersURL = GlobalVar.adminFetchUsersURL;
  private userId: any;

  getAll() {

    return this.http.get(this.apiURL);

  }
  getByCode(code: any) {

    return this.http.get(this.apiURL + '/' + code);
  }
  makeRegister(inputdata: any) {
    return this.http.post(this.apiURL, inputdata);
  }

  updateUser(code: any, inputdata: any) {
    return this.http.put(this.apiURL + "/" + code, inputdata);
  }
  getUsersForRole(role: any) {
    return this.http.get(this.roleAccessURL + role);
  }
  login(credentials: {
    email: string, password: string
  }): Observable<any> {
    debugger;
    console.log('Token deails ' + this.getTokenForAdmin());
    return this.http.post<{ token: string, expiresIn: string }>(`${this.admintokenURLMain}`, credentials).pipe(tap((response: { token: string; expiresIn: string }) => {
      // localStorage.setItem(this.tokenKey,response.token);
      console.log(" response.token" + response.token);

    })
    );
  }
  logout() {
    this.userId = localStorage.getItem('userId');
    localStorage.removeItem(`authToken_${this.userId}`);
    localStorage.removeItem(this.userId);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    this.userId = localStorage.getItem('userId');
    const token = this.getToken(this.userId);
    return token && !this.jwtHelper.isTokenExpired(token);
  }
  getRole() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role as Role;
    }
    return null;
  }
  /*getToken() {
    return localStorage.getItem(this.tokenKey);
  }*/
  setToken(userId: string, token: string): void {
    localStorage.setItem(`authToken_${userId}`, token);
    localStorage.setItem(`userId`, userId);
  }

  getToken(userId: string): string | null {
    return localStorage.getItem(`authToken_${userId}`);
  }

  removeToken(userId: string): void {
    localStorage.removeItem(`authToken_${userId}`);
  }

  getTokenForAdmin(): Observable<any> {
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post(
      this.admintokenURL,
      '[{"email": "super.admin@email.com", "password": "123456""}]',
      { headers: headers })
  }
      this.http.post(this.admintokenURL, {"email": "super.admin@email.com", "password": "123456"}, { headers : {
        'Content-Type': 'application/json',
      }, observe: 'response' }).subscribe(
        data => {
          console.warn(JSON.stringify(data, null, 2));
        },
        error => {
          console.error(error.errorMessage);
      });
    }*/
    const body = { "email": "super.admin@email.com", "password": "123456" };
    const headers = { 'content-type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Origin': 'http://localhost:8006' };
    //headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
    // headers.append('Origin','http://localhost:3000'); 
    const bodydisplay = JSON.stringify(body);
    console.log(bodydisplay)
    console.log("response admintokenURL:: " + JSON.stringify(this.http.post(this.admintokenURL, body, { 'headers': headers })));
    return this.http.post(this.admintokenURL, body, { 'headers': headers });
  }

  loginAdmin(credentials: { email: string, password: string }): Observable<any> {

    /* return this.http.post<any>(`${this.admintokenURLMain}`, credentials)
       .pipe(map(response => {
         console.log('response'+JSON.stringify(response));
         response.token;
         response.expiresIn;
         Global.formValues.set("admintoken", response.token);
         Global.formValues.set("adminexpiresIn", response.expiresIn);
         if (response && response.token) {
           localStorage.setItem('token', response.token);
         }
         //return response;
       }));*/
    const headers2 = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + authToken,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': "Content-Length"
    });
    const requestOptions = { headers: headers2, credentials };
    //return this._http.get(getUserForAdmin, requestOptions);*/
    /*const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });*/
    //const requestOptions = { headers: headers };
    //return this._http.get(getUserForAdmin,  { headers: headers });
    //const headers = { 'Authorization': 'Bearer'+authToken }
    debugger
    //const headers = { 'Authorization': 'Bearer' + authToken }
    return this.http.post<any>(`${this.admintokenURLMain}`, credentials)
      .pipe(map(response => {
        console.log('response' + JSON.stringify(response));


      }));
  }


  private authUrl = `http://localhost:8006/api/auth/login`; // URL to fetch the token
  private detailsUrl = `http://localhost:8006/api/users/admin`; // URL to get details



  getTokenLatest(credentials: { username: string, password: string }): Observable<any> {
    debugger

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', credentials.username);
    urlSearchParams.append('password', credentials.password);
    return this.http.post<any>(this.adminTokenFetchURL, { username: credentials.username, password: credentials.password });
  }

  getDetailsLatest(token: string): Observable<any> {
   // const headers = { 'Authorization': `Bearer ${token}` };
    //return this.http.get<any>(this.adminFetchUsersURL, { headers });
    return this.http.get<any>(this.adminFetchUsersURL);
  }




}
