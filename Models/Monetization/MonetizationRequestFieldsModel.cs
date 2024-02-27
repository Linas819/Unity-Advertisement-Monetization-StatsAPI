namespace UnityAPI.Models.Monetization
{
    public class MonetizationRequestFields
    {
        public bool adRequest { get; set; } = false;
        public bool availableSum { get; set; } = false;
        public bool revenueSum { get; set; } = false;
        public bool startCount { get; set; } = false;
        public bool viewCount { get; set; } = false;
    }
}