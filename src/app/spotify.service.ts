import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArtist } from './Artist';
import { ResponseText } from './ResponseText';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  responseText: ResponseText | undefined;


  client_id = "31clhg3tbaqbdcdombp2cwa5h2je";
  client_secret = "fd8e594076c24906aad50c19ff57b24a";
  redirectedUri = "http://localhost:4200/callback";
  authorizeUrl = "https://accounts.spotify.com/authorize";
  tokenUrl = "https://accounts.spotify.com/api/token";
  public accessToken: any = "Bearer BQDLkn2-afrh3-QpbLdX5_V4rGQxfhSwe-AmoNcWJG__rtp98yS3bzB0r1mGDq7Q1Fz4AFh_Gn4Q3R_W-RGJv5j6CoVn8Doum_tw1feIWHt8Rz99BbVJJ8OCeAswRQEG_55Qgb_anAuSQW03Ti-3ioWKAUVH-0o7J7fnop52X0818JWEWtdm-VekaHQ";



                                       
  private  httpOptions = {
    headers : new HttpHeaders() 
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization',  this.accessToken)
    
 }

 authorizationHeader = {
  headers: new HttpHeaders()
  .set('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret))
  .set('Content-Type', 'application/x-www-form-urlencoded')
};

  constructor(private _httpClient:HttpClient) { }

  

  public getAllArtists(searchStr :string, type="artist"):Observable<IArtist>{
    let searchUrl = `https://api.spotify.com/v1/search?q=${searchStr}&type=artist`;
    return this._httpClient.get<any>(searchUrl, this.httpOptions)
  }

  public getArtist(artistId:any):Observable<any>{
    let albumUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    return this._httpClient.get<any>(albumUrl, this.httpOptions)
  }

  public getAllAlbum(artistId:any):Observable<any>{
    let artistUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;
    return this._httpClient.get<any>(artistUrl, this.httpOptions)
  }

  public getAlbum(albumId:any):Observable<any>{
    let albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;
    return this._httpClient.get<any>(albumUrl, this.httpOptions)
  }

  public getAllTracks(albumId:any):Observable<any>{
    let tracksUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
    return this._httpClient.get<any>(tracksUrl, this.httpOptions)
  }

  requestAuthorization(): void {
    let authUrl = this.authorizeUrl; 
    authUrl += "?client_id=" + this.client_id;
    authUrl += "&response_type=code";
    authUrl += "&redirect_uri=" + encodeURI(this.redirectedUri);
    authUrl += "&show_dialog=true";
    location.href = authUrl; // Show Spotify's authorization screen
  }

  handleAuthResponse(body: string): Observable<HttpResponse<ResponseText>>{
    return this._httpClient.post<ResponseText>(this.tokenUrl, body, { observe: 'response', headers: new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret))
    .set('Content-Type', 'application/x-www-form-urlencoded')});
  }

}