import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
 import { promisify } from 'util';
import { map, catchError } from 'rxjs/operators';

import { Observable, Subject, of } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CommonService {


    static rootUrl: string = environment.host;
    //private rootUrl = this.rootUrl;
    static cdnUrl = environment.cdnhost;
    //private cdnUrl = this.cdnUrl;
    private _uploadFileNativePath=environment.uploadFileNativePath;
    objReturnData = [
      {
        Type: "",
        RequestDetails: null,
        objInputData: null,
        objOutputData: null
      }
    ];
    // router: Router;
    private subject = new Subject<any>();
    constructor(private http: HttpClient ,private router: Router) {
      
     }
    static getrootUrl() {
      return this.cdnUrl;
    }
  
  
    static authReq(url) {
      if(localStorage.getItem('authToken')==''){
        // link.this.router.navigateByUrl('/home');
      }
      else{
  
     
    //   const headers = new Headers({ 'Accept': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('authToken') });
    //   const options = new RequestOptions({ headers: headers });

      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
     });
     let options = {
        headers: headers
     }

      return {
        url: this.cdnUrl + url,
        headers: options
      }
    }
    }
    static NoauthReq(url: string) {
    //   const headers = new Headers({ 'Accept': 'application/json' });
    //   const reqOptions = new RequestOptions({ headers: headers });

      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
     });
     let options = {
        headers: headers
     }

      return {
        url: this.cdnUrl + url,
        headers: options
      };
    }
  
    SendFileToAPI(strHttpType: string, objRequestDetails, objData) {
  
      try {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        // let options = new RequestOptions({ headers: headers });
        let options = {
            headers: headers
         }
    
  
        // if (this.Util.IsNotEmpty(strHttpType)) {
          if (strHttpType.toLowerCase() == "post") {
  
            return this.http.post(objRequestDetails.url, objData,options);
          }
        // }
      }
      catch (error) {
        this.WriteLog(strHttpType, objRequestDetails, objData, error);
      }
    }
  
    SendToAPI(strHttpType: string, objRequestDetails, objData) {
  
      try {
  
        // if (this.Util.IsNotEmpty(strHttpType)) {
  
          if (strHttpType.toLowerCase() == "get") {
  
            return this.http.get(objRequestDetails.url, objRequestDetails.headers).
              pipe(map(
                res => {
                  this.WriteLog(strHttpType, objRequestDetails, objData, res);
                  return res;
                }
              ),
              catchError(err => of([this.WriteLog(strHttpType, objRequestDetails, objData, err)])
              ));
          }
          else if (strHttpType.toLowerCase() == "post") {
  
            return this.http.post(objRequestDetails.url, objData, objRequestDetails.headers).
              pipe(map(
                res => {
                  this.WriteLog(strHttpType, objRequestDetails, objData, res);
                  return res;
                }
              ),
              catchError(err => of([this.WriteLog(strHttpType, objRequestDetails, objData, err)
              ])
              ));
          }
          else if (strHttpType.toLowerCase() == "put") {
  
            return this.http.put(objRequestDetails.url, objData, objRequestDetails.headers).
              pipe(map(
                res => {
                  this.WriteLog(strHttpType, objRequestDetails, objData, res);
                  return res;
                }
              ),
                catchError(err => of([this.WriteLog(strHttpType, objRequestDetails, objData, err)])
                ));
          }
          else if (strHttpType.toLowerCase() == "delete") {
  
            return this.http.delete(objRequestDetails.url, objRequestDetails.headers).
              pipe(map(
                res => {
                  this.WriteLog(strHttpType, objRequestDetails, objData, res);
                  return res;
                }
              ),
              catchError(err => of([this.WriteLog(strHttpType, objRequestDetails, objData, err)])
              ));
          }
        // }
      }
      catch (error) {
        this.WriteLog(strHttpType, objRequestDetails, objData, error);
      }
    }
  
    downloadFile(objRequestDetails): Observable<any>{
    //   const headers = new Headers({ 'Accept': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('authToken') });
    //   const reqOptions = new RequestOptions({ headers: headers,responseType: ResponseContentType.ArrayBuffer });

      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
     });
     let options = {
        headers: headers,
        responseType: 'blob'
     }
    //   return this.http.get(objRequestDetails.url, options);
      return this.http.get(objRequestDetails.url);

    }
  
    WriteLog(strHttpType, objRequestDetails, objData, objOutputData) {
  
      this.objReturnData = [
        {
          Type: strHttpType,
          RequestDetails: objRequestDetails,
          objInputData: objData,
          objOutputData: objOutputData
        }
      ];
      var IsLogNeeded = true;
      try {
  
        // console.log(JSON.stringify(this.objReturnData));
        this.ClearReturnData();
      }
      catch (error) {
        this.objReturnData[0].objOutputData = error;
        console.log(JSON.stringify(this.objReturnData));
        this.ClearReturnData();
      }
      finally {
      }
    }
  
    ClearReturnData() {
      this.objReturnData = [
        {
          Type: "",
          RequestDetails: null,
          objInputData: null,
          objOutputData: null
        }
      ];
  
    }
  
    // getCall(urlData) {
    //   var resData = CommonService.authReq(urlData);
    //   return this.http.get(resData.url, resData.headers).pipe(map(res => res));
    // }
  
    // putCall(data, reqUrl) {
    //   var respData = CommonService.authReq(reqUrl);
    //   return this.http.put(respData.url, data, respData.headers).pipe(map(res => res));
    // }
  
    // postCall(data, reqUrl) {
    //   var respData = CommonService.authReq(reqUrl);
    //   return this.http.post(respData.url, data, respData.headers).pipe(map(res => res));
    // }
  
    // deleteCall(urlData) {
    //   var resData = CommonService.authReq(urlData);
    //   return this.http.delete(resData.url, resData.headers).pipe(map(res => res));
    // }
  
    setAssembly(item: any) {
      this.subject.next(item);
    }
    getAssembly(): Observable<any> {
      return this.subject.asObservable();
    }
  
    GetRole() {
      let data = JSON.parse(localStorage.getItem('adminData'));
  
      let RoleCode = "";
  
      if (data) {
        // if (this.Util.IsNotEmpty(data.UserGuid)) {
        //   if (this.Util.IsNotNull(data.Role) && this.Util.IsNotEmpty(data.Role.Code)) {
            RoleCode = data.Role.Code;
        //   }
        // }
      }
      return RoleCode;
    }
  
    GetUserGuid() {
      let data = JSON.parse(localStorage.getItem('adminData'));
  
      let UserGuid = "";
  
    //   if (this.Util.IsNotNull(data)) {
    //     if (this.Util.IsNotEmpty(data.UserGuid)) {
          UserGuid = data.UserGuid;
    //     }
    //   }
      return UserGuid;
    }
  
    // GetCompanyId() {
    //   let data = JSON.parse(localStorage.getItem('adminData'));
  
    //   let CompanyId = "";
  
    //   if (this.Util.IsNotNull(data)) {
    //     if (this.Util.IsNotEmpty(data.CompanyId)) {
    //       CompanyId = data.CompanyId;
    //     }
    //   }
    //   return CompanyId;
    // }
  
    // GetUserRole() {
    //   let data = JSON.parse(localStorage.getItem('adminData'));
  
    //   let UserRole = "";
  
    //   if (this.Util.IsNotNull(data)) {
  
    //     if (this.Util.IsNotNull(data.Role) && this.Util.IsNotEmpty(data.Role.Code)) {
  
    //       if (data.Role.Code == "SA") {
    //         UserRole = "SA";
    //       }
    //       else if (data.Role.Code == "AD" &&
    //         this.Util.IsNotNull(data.CompanyId) &&
    //         this.Util.IsNotEmpty(data.CompanyId)
    //       ) {
    //         UserRole = "SAD";
    //       }
    //       else if (data.Role.Code == "USR" &&
    //         this.Util.IsNotNull(data.DesignationId) &&
    //         this.Util.IsNotEmpty(data.DesignationId)
    //       ) {
    //         UserRole = "CUSR";
    //       }
    //       else if (data.Role.Code == "USR" &&
    //         this.Util.IsNotNull(data.CompanyId) &&
    //         this.Util.IsNotEmpty(data.CompanyId)
    //       ) {
    //         UserRole = "SUSR";
    //       }
    //       else if (data.Role.Code == "USR" &&
    //         this.Util.IsNotNull(data.ChamberId) &&
    //         this.Util.IsNotEmpty(data.ChamberId)
    //       ) {
    //         UserRole = "BUSR";
    //       }
    //       else if (data.Role.Code == "USR" && (!this.Util.IsNotNull(data.ChamberId)) &&
    //         (!this.Util.IsNotEmpty(data.ChamberId)) && (!this.Util.IsNotNull(data.CompanyId)) &&
    //         (!this.Util.IsNotEmpty(data.CompanyId)) && (!this.Util.IsNotNull(data.CompanyId)) &&
    //         (!this.Util.IsNotEmpty(data.DesignationId)) && (!this.Util.IsNotNull(data.DesignationId))) {
    //         UserRole = "SRUSR";
    //       }
    //     }
    //   }
    //   return UserRole;
    // }
  
    postFileToServer(prminputs){
      var resData = CommonService.authReq('/api/upload');
      return this.SendToAPI("post", resData, prminputs);
  }
  
//   getCalls(urlData) {
//     var resData = CommonService.authReq(urlData);
//     return this.http.get(resData.url, resData.headers).pipe(map(res => res));
//   }
   
  
  getUploadedFileNativePath(){
    return this._uploadFileNativePath;
    }
  }