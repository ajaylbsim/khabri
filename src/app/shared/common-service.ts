
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Constants} from "./config/constants";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class CommonService {

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  public findAllStatus() {

    console.log('>>>>>>>>>>>>>status>>>>>   ', this.route.params);
    return this.http.get(Constants.SERVER_URL + '/commonService/v2/status/findAll')
      .map(res => {
        return res;
      });
  }

}
