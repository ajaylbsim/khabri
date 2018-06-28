import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {CommonService} from "./common-service";

@Injectable()
export class StatusResolve implements Resolve<any>{
  constructor(private commonService: CommonService ){};

  resolve(route:ActivatedRouteSnapshot,
          state:RouterStateSnapshot,
  ): Observable<any> {
    return this.commonService.findAllStatus();

  }


}
