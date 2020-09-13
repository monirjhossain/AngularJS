import { loginDto } from '../shared/models/loginDto';
import { loginAppConstants } from './../shared/core/loginConstants';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private loginConstants: loginAppConstants,
  ) { }

  public signin(loginModel: loginDto) {
    return this.http.post<any>(this.loginConstants.serverPath + 'Auth/Login', loginModel);
  }

  isLoggedIn() {
    return sessionStorage.getItem('token');
  }
  getToken() {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token').substring(1, sessionStorage.getItem('token').length - 1);
    }
  }
  private handleError(error: any) {
    return [throwError(error.error || 'Server error'), null];
  }
  getRole(){
    return sessionStorage.getItem('Ruser');
  }

  // getData(source: string) {
  //   return this.http.get(source).pipe(
  //     tap((res: any) => res),
  //     catchError(this.handleError)
  //   );
  // }
  // postData(source: string, data: any, isFormData?: any) {
  //   let headers = new HttpHeaders();
  //   headers = this.apiHeaders(headers, isFormData);
  //   return this.http.post(source, data, { headers: headers }).pipe(
  //     tap((res: any) => {
  //       console.log(res);
  //        // return [null, res];
  //     }),
  //     catchError(this.handleError)
  //   );
  // }
  // putData(source: string, data: any) {
  //   let headers = new HttpHeaders();
  //   headers = this.apiHeaders(headers);
  //   return this.http.put(source, data, { headers: headers }).pipe(
  //     tap((res: any) => res),
  //     catchError(this.handleError)
  //   );
  // }
  // patchData(source: string, data: any) {
  //   let headers = new HttpHeaders();
  //   headers = this.apiHeaders(headers);
  //   return this.http.patch(source, data, { headers: headers }).pipe(
  //     tap((res: any) => res),
  //     catchError(this.handleError)
  //   );
  // }
  // deleteData(source: string, data: any) {
  //   const headers = new HttpHeaders();
  //   const httpOptions = {
  //     headers: this.apiHeaders(headers),
  //     body: data
  // };
  //   return this.http.delete(source, httpOptions).pipe(
  //     tap((res: any) => res),
  //     catchError(this.handleError)
  //   );
  // }
  // apiHeaders(headers: any, isFormData?: any) {
  //   if (isFormData !== undefined) {
  //     headers = headers.append('mimeType', 'multipart/form-data');
  //   } else {
  //     headers = headers.append('Content-Type', 'application/json');
  //   }
  //   headers = headers.append('Authorization', 'acbmyui-234rv');
  //   console.log(headers);
  //   return headers;
  // }

}
