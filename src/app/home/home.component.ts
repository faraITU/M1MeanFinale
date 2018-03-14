import { Component, OnInit, EventEmitter } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  inputs: ['videolist'],
  outputs: ['SelectVideo'],
  providers: [VideoService]
})
export class HomeComponent implements OnInit {
  videolist: Array<Video>;
  motCle: any;
  public SelectVideo = new EventEmitter();
  constructor(private _videoService: VideoService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.motCle = this.route.snapshot.paramMap.get('r');
    this._videoService.search(this.motCle)
    .subscribe(
      resVideoData => this.videolist = resVideoData
    );
    //this.search();
  }

  onSelect(vid: Video){
    this.SelectVideo.emit(vid);
  }

  search(){
    this._videoService.search(this.motCle)
    .subscribe(data => { 
      console.log(data);
      resVideoData => this.videolist = resVideoData
    });
  }
}
