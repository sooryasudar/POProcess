import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CommonService } from './common.service';
// import { Util } from './Util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService{
  lstReturn: any;
  public  port="10001";
  constructor(private httpClient: HttpClient, private router: Router, 
    // private Util: Util, 
    private CS: CommonService) {
  }

  getLoginstatusFromServer(prminputs) {
    console.log("prminputs",prminputs);
    var resData = CommonService.authReq(this.port+'/modules/login/');
    return this.CS.SendToAPI("post", resData, prminputs);
    // return this.httpClient.post<any>('http://192.168.1.101:10001/modules/login/', prminputs)
  }

  getLogoutstatusFromServer(prminputs) {
    console.log("prminputs",prminputs);
    var resData = CommonService.authReq(this.port+'/modules/logout/');
    return this.CS.SendToAPI("post", resData, prminputs);
    // return this.httpClient.post<any>('http://192.168.1.101:10001/modules/login/', prminputs)
  }

  getMenuFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/modules/user_credentials/');
    return this.CS.SendToAPI("post", resData, prminputs);
  }

}
