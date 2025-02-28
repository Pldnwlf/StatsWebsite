import { Component, OnInit } from '@angular/core';
import { PlayerStatsService } from '../player-stats.service';
import { PlayerStats } from '../models/player-stats.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-player-stats-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './player-stats-list.component.html',
  styleUrls: ['./player-stats-list.component.css'],
})
export class PlayerStatsListComponent implements OnInit {
  playerStats: PlayerStats[] = [];
  private usernameApiUrl: string = 'https://api.ashcon.app/mojang/v2/user/';

  constructor(private playerStatsService: PlayerStatsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.playerStatsService.getPlayerStats().subscribe((stats) => {
      this.playerStats = stats;

      this.playerStats.forEach(player => this.getPlayerUsername(player));
      this.playerStats.forEach(player => this.getPlayerKd(player));
    });
  }

  getPlayerUsername(player: PlayerStats): void {
    if (!player.playerId) {
      console.warn('Player ID ist leer.');
      return;
    }

    this.http.get<{ uuid: string; username: string }>(`${this.usernameApiUrl}${player.playerId}`)
      .pipe(
        tap(response => {
          player.username = response.username; // Speichert den Benutzernamen im Objekt
        }),
        catchError(err => {
          console.error('Fehler beim Abrufen des Benutzernamens:', err);
          player.username = "Username not found";
          return of(null);
        })
      )
      .subscribe();
  }
  getPlayerKd(player: PlayerStats): void{
    if (player.deaths != 0){
      player.kd = (player.kills / player.deaths).toString()
    }
    player.kd = player.kills.toString()
  }
  protected readonly Object = Object;
}
