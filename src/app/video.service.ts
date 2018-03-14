import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideoService {

  private _getUrl = "/api/videos";
  private _getUrlHome = "/api";
  constructor(private _http: Http) { }

  getVideos(){
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }
  search(p: any) {
    let URI = this._getUrlHome + '/search/' + p;
    return this._http.get(URI)
        .map((response: Response) => response.json());
  }
}
