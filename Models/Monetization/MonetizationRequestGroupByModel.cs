namespace UnityAPI.Models.Monetization
{
    public class MonetizationRequestGroupBy
    {
        public bool country { get; set; } = false;
        public bool placement { get; set; } = false;
        public bool platform { get; set; } = false;
        public bool game { get; set; } = false;
    }
}