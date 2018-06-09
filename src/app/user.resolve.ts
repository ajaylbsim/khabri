import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from 'rxjs/Rx';
import  {UserService} from './shared/user.service'
import {Injectable} from "@angular/core";

@Injectable()
export class UserResolve implements Resolve<any>{
   constructor(private userService:UserService){};

  resolve(route:ActivatedRouteSnapshot,
          state:RouterStateSnapshot,
  ): Observable<any> {
    return this.userService.getUserDetails('aankit@getkhabri.com','aankitroy123');

  }


}
