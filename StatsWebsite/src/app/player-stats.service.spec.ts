import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerStatsListComponent } from './player-stats-list/player-stats-list.component';
import { PlayerStatsService } from './player-stats.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlayerStats } from './models/player-stats.model';
import { of } from 'rxjs';

describe('PlayerStatsListComponent', () => {
  let component: PlayerStatsListComponent;
  let fixture: ComponentFixture<PlayerStatsListComponent>;
  let playerStatsService: PlayerStatsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerStatsListComponent],
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule for mocking HTTP requests
      providers: [PlayerStatsService]
    });

    fixture = TestBed.createComponent(PlayerStatsListComponent);
    component = fixture.componentInstance;
    playerStatsService = TestBed.inject(PlayerStatsService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges(); // Trigger ngOnInit
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding HTTP requests
  });

  it('should fetch player stats and update player stats array', () => {
    const mockPlayerStats: PlayerStats[] = [
      {
        playerId: '1',
        username: 'Player1',
        kd: 'n/a',
        xp: 500,
        kills: 10,
        deaths: 5,
        currentKillStreak: 3,
        highestKillStreak: 5,
        bounty: 100
      },
      {
        playerId: '2',
        username: 'Player2',
        kd: 'n/a',
        xp: 450,
        kills: 8,
        deaths: 4,
        currentKillStreak: 2,
        highestKillStreak: 4,
        bounty: 80
      }
    ];

    spyOn(playerStatsService, 'getPlayerStats').and.returnValue(of(mockPlayerStats));

    // Trigger ngOnInit to call the service method and fetch the player stats
    component.ngOnInit();

    // Assert that the playerStats array is updated
    expect(component.playerStats.length).toBe(2);  // Ensure there are two players
    expect(component.playerStats[0].username).toBe('Player1');  // Ensure player username is correct
    expect(component.playerStats[1].username).toBe('Player2');  // Ensure player username is correct
  });

  it('should call getPlayerUsername and update the username for players', () => {
    const mockPlayerStats: PlayerStats[] = [
      {
        playerId: '1',
        username: 'Username not found',
        kd: 'n/a',
        xp: 500,
        kills: 10,
        deaths: 5,
        currentKillStreak: 3,
        highestKillStreak: 5,
        bounty: 100
      }
    ];

    spyOn(playerStatsService, 'getPlayerStats').and.returnValue(of(mockPlayerStats));

    const mockUsernameResponse = { uuid: '1', username: 'Player1' };

    spyOn(component['http'], 'get').and.returnValue(of(mockUsernameResponse));

    component.ngOnInit();

    // Simulate HTTP response for getPlayerUsername
    expect(component.playerStats[0].username).toBe('Player1');  // Ensure that the username is updated correctly
  });

  it('should handle error in getPlayerUsername and set username to "Username not found"', () => {
    const mockPlayerStats: PlayerStats[] = [
      {
        playerId: '1',
        username: 'Username not found',
        kd: 'n/a',
        xp: 500,
        kills: 10,
        deaths: 5,
        currentKillStreak: 3,
        highestKillStreak: 5,
        bounty: 100
      }
    ];

    spyOn(playerStatsService, 'getPlayerStats').and.returnValue(of(mockPlayerStats));

    // Simulate error in the API call
    spyOn(component['http'], 'get').and.returnValue(of(null));

    component.ngOnInit();

    // Ensure the username remains "Username not found" in case of an error
    expect(component.playerStats[0].username).toBe('Username not found');
  });

  it('should calculate KD correctly when deaths are non-zero', () => {
    const player: PlayerStats = {
      playerId: '1',
      username: 'Player1',
      kd: 'n/a',
      xp: 500,
      kills: 10,
      deaths: 5,
      currentKillStreak: 3,
      highestKillStreak: 5,
      bounty: 100
    };

    // Call getPlayerKd method
    component.getPlayerKd(player);

    // Assert that KD is calculated correctly
    expect(player.kd).toBe('2');  // 10 kills / 5 deaths = 2
  });

  it('should set KD to kills if deaths are zero', () => {
    const player: PlayerStats = {
      playerId: '1',
      username: 'Player1',
      kd: 'n/a',
      xp: 500,
      kills: 10,
      deaths: 0,
      currentKillStreak: 3,
      highestKillStreak: 5,
      bounty: 100
    };

    // Call getPlayerKd method
    component.getPlayerKd(player);

    // Assert that KD is set to kills when deaths are zero
    expect(player.kd).toBe('10');  // Since deaths are 0, KD should be equal to kills
  });
});
