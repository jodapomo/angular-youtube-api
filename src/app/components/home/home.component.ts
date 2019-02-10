import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .modal-dialog {
      width: 60vw;
      max-width: unset;
    }

    .videoWrapper {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      padding-top: 25px;
      height: 0;
    }
    .videoWrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `]
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;

  constructor( private _yts: YoutubeService ) {

    this._yts.getVideos()
      .subscribe( videos => this.videos = videos );
  }

  ngOnInit() {
  }

  cargarMas() {
    this._yts.getVideos()
      .subscribe( videos => this.videos.push.apply( this.videos, videos) );
  }

  verVideo( video: any ) {
    this.videoSel = video;

    $('#modal').modal();
  }

  cerrarModal() {
    this.videoSel = null;

    $('#modal').modal('hide');
  }

}
