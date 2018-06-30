import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import { Observable } from 'rxjs/Rx';
import  {UserService} from './shared/user.service'
import {Injectable} from "@angular/core";

@Injectable()
export class UserResolve implements Resolve<any>{
   constructor(private userService:UserService,private router : Router){};

  resolve(route:ActivatedRouteSnapshot,
          state:RouterStateSnapshot,
  ): Observable<any> {
    if(JSON.parse(localStorage.getItem('user')) == null) this.router.navigate(['/login']);

    return this.userService.getUserDetailsById(JSON.parse(localStorage.getItem('user'))['userId']);

    // return this.userService.getUserDetails('aankit@getkhabri.com','aankitroy123');

  }


}
