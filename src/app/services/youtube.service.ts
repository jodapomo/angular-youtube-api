import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyDXUEL_84t1cG_zSLjdvVRqT2rhiG8Qmvs';

  private playlistId = 'UUOgSIqFFZMIWpunv7TfSzAQ';

  private nextPageToken = '';

  constructor( private http: HttpClient ) { }


  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`;


    let params = new HttpParams()
      .set( 'part', 'snippet' )
      .set( 'maxResults', '10' )
      .set( 'playlistId', this.playlistId )
      .set( 'key', this.apikey );

    if ( this.nextPageToken ) {
      params = params.set( 'pageToken', this.nextPageToken );
    }

    return this.http.get( url, { params } )
    .pipe( map( res => {

      this.nextPageToken = res['nextPageToken'];

      const videos: any[] = [];

      for (const video of res['items']) {
        const snippet = video.snippet;
        videos.push( snippet );
      }

      return videos;
    }));
  }

}
