import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { PlayerStatsListComponent } from './player-stats-list.component';
import {PlayerStats} from '../models/player-stats.model';

describe('PlayerStatsListComponent', () => {
  let component: PlayerStatsListComponent;
  let fixture: ComponentFixture<PlayerStatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerStatsListComponent,CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerStatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate KD when deaths are greater than 0', () => {
    const player: PlayerStats = { kills: 10, deaths: 2 };
    getPlayerKd(player);
    expect(player.kd).toBe('5');
  });







});
