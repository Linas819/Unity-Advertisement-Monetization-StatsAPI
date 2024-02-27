namespace UnityAPI.Models.Monetization
{
    public class MonetizationRequest
    {
        
        public string scale { get; set; } = "";
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public MonetizationRequestFields fields { get; set; } = new MonetizationRequestFields();
        public bool groupByUsed { get; set; }
        public MonetizationRequestGroupBy groupBy { get; set; } = new MonetizationRequestGroupBy();
        public string gameIds { get; set; } = "";
        public string apiKey { get; set; } = "";
        public string organizationId { get; set; } = "";
    }
}