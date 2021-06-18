import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from './signin';
import { AuthenticateService } from '../service/authenticate.service';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  public objuser:User;
  public ipAddress = '';
  public userdtl;

  constructor(private router: Router,private objservice:AuthenticateService,public http:HttpClient ) { }

  ngOnInit() {
    this.objuser= new User();
    this.getIPAddress();
  }

  getIPAddress()
  {    
     this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    console.log("ipAddress",this.ipAddress);
    });
  }


  signin(){
    // alert("event");
    console.log("username",this.objuser.username);
    let date= new Date();
    let data = {

      "username": this.objuser.username,
      "password": this.objuser.password,
      "system_ip":this.ipAddress,
      "login_time":date      
    }
    console.log("logininput",data);

    this.objservice.getLoginstatusFromServer(data)
    .subscribe(
    recieveddata  => {
   
        let tempresponsedata = recieveddata;
      console.log("Loginresponse---",tempresponsedata)
      this.userdtl=tempresponsedata;
      // let status=tempresponsedata;

      localStorage.setItem('Userdtl', JSON.stringify(tempresponsedata));
     if( this.userdtl.Status=="Success")
     {
     this.router.navigate(['/Authlayout']);
     }
     else{
      alert("Invalid Authentication");
    }   
    },
    (error: any) => { this.HandleErrorResponse(error) });
  }


  //   if(this.objuser.username=="pondi@gmail.com" && this.objuser.password=="welcome"){
  //     this.router.navigate(['/Authlayout']);
  //   }
  //   else{
  //     alert("Invalid Authentication");
  //   }    
  // }


  HandleErrorResponse(err: any)
  {
    //  this.objerrhandler.handleError(String(err));
   console.log("Error",err);
  }

}
