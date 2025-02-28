import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlayerStats} from './models/player-stats.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  private apiUrl = 'https://api.hglabor.de/stats/FFA/top?sort=xp&page=1'
  constructor(private http: HttpClient) {}
  getPlayerStats(): Observable<PlayerStats[]>{
    return this.http.get<PlayerStats[]>(this.apiUrl);
  }
}

