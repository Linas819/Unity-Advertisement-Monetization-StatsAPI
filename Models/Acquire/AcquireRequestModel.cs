namespace UnityAPI.Models.Acquire
{
    public class AcquireRequest
    {
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
        public string scale { get; set; } = "";
        public string campaignSets { get; set; } = "";
        public string campaigns { get; set; } = "";
        public string targets { get; set; } = "";
        public string adTypes { get; set; } = "";
        public string countries { get; set; } = "";
        public string osVersions { get; set; } = "";
        public string creativePacks { get; set; } = "";
        public string sourceAppIds { get; set; } = "";
        public string skadConversionValues { get; set; } = "";
        public bool splitByUsed { get; set; }
        public bool fieldsUsed { get; set; }
        public AcquireRequestSplitBy splitBy { get; set; }
        public AcquireRequestFields fields { get; set; }
        public bool storesPlatformsUsed { get; set; }
        public AcquireRequestStores stores { get; set; }
        public AcquireRequestPlatforms platforms { get; set; }
        public string apikey { get; set; } = "";
        public string organizationId { get; set; } = "";
    }
}