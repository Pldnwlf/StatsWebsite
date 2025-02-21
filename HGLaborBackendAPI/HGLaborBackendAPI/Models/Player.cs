namespace HGLaborBackendAPI.Models
{
  public class Player
  {
    public string PlayerId { get; init; }

    public int xp { get; set; }
    public int kills { get; set; }

    public int deaths { get; set; }
    public int currentKillStreak { get; set; }
    public int highestKillStreak { get; set; }
    public int bounty { get; set; }


  }
}
