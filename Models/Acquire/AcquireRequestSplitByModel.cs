namespace UnityAPI.Models.Acquire
{
    public class AcquireRequestSplitBy
    {
        public bool campaignSet { get; set; }
        public bool creativePack { get; set; }
        public bool adType { get; set; }
        public bool campaign { get; set; }
        public bool target { get; set; }
        public bool sourceAppId { get; set; }
        public bool store { get; set; }
        public bool country { get; set; }
        public bool platform { get; set; }
        public bool osVersion { get; set; }
        public bool skadConversionValue { get; set; }
    }
}