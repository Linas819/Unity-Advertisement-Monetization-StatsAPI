namespace UnityAPI.Models.Monetization
{
    public class MonetizationData
    {
        public string timestamp { get; set; } = "";
        public string country { get; set; } = "";
        public string platform { get; set; } = "";
        public string placement { get; set; } = "";
        public string sourceGameId { get; set; } = "";
        public string sourceName { get; set; } = "";
        public string adRequestCount { get; set;} = "";
        public string availableSum { get; set;} = "";
        public string revenueSum { get; set;} = "";
        public string startCount { get; set;} = "";
        public string viewCount { get; set;} = "";
    }
}