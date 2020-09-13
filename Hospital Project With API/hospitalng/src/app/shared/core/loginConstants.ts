import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class loginAppConstants {

  public serverPath: string = "https://localhost:44336/api/";
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    })
  };
}