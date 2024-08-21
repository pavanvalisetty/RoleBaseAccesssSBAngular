import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Global, GlobalVar } from 'src/GlobalVar';
var response: any;
var authToken: any;
const APIURLPOST = 'http://localhost:3000/employees/'

/*const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + authToken,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': "Content-Length"

});
const requestOptions = { headers: headers };*/
@Injectable({
  providedIn: 'root'
})


export class EmployeeServiceService implements OnInit {
  getUserForAdmin = `http://localhost:8006/api/users/admin`;
  response: any;

  private adminCreateEmployee = GlobalVar.adminCreateEmployee;

  constructor(private _http: HttpClient) { }
  ngOnInit(): void {
    authToken = Global.formValues.get("admintoken");
  }

  addEmployee(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': "Content-Length"
    });
    const requestOptions = { headers: headers };
    return this._http.post(APIURLPOST + "", data, requestOptions);
  }

  updateEmployee(id: number, data: any) {
    return this._http.put(APIURLPOST + `${id}`, data)
  }
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(APIURLPOST + `${id}`)
  }

  getEmployeeList(): Observable<any> {
    debugger
    authToken = Global.formValues.get("admintoken");
    // authToken = Global.formValues.get("admintoken");
    const headers2 = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': "Content-Length"
    });
    const requestOptions = { headers: headers2 };
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
    /*return this._http.get<any>(`${this.getUserForAdmin}`,requestOptions)
       .pipe(map(response => {
         console.log('response' + JSON.stringify(response));
         
         //return response;
       }));*/
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(authToken)
    });
    return this._http.get(`${this.getUserForAdmin}`, { headers: reqHeader });



  }

  addEmployeeLatest(data: any): Observable<any> {
    debugger;
    return this._http.post<any>(this.adminCreateEmployee, data);
  }

}
