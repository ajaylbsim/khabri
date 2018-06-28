
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Constants} from "./config/constants";

@Injectable()
export class CommonService {

  constructor(private http: HttpClient){}

  public findAllStatus() {
    return this.http.get(Constants.SERVER_URL + '/commonService/v2/status/findAll')
      .map(res => {
        return res;
      });
  }

}
