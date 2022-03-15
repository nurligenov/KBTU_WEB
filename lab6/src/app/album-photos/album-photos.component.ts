import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from '../albums.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss']
})
export class AlbumPhotosComponent implements OnInit {

  photos: Photo[] = []
  constructor(private route: ActivatedRoute, private albumService: AlbumsService, private router: Router, private http: HttpClient) { 
  }
  albumId: number = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
       const id = params['album_id'];
       this.albumId = id;
       this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/albums/' + id + '/photos').subscribe(response => this.photos=response)
     });
   }

   return(){
    this.router.navigateByUrl('/albums/' + this.albumId);
   }

}

export interface Photo{
  albumId: number
  id: number
  url: string
  title: string
  thumbnailUrl: string
}
