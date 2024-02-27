namespace UnityAPI.Models.Acquire
{
    public class AcquireRequestFields
    {
        public bool timestamp { get; set; }
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
        public bool starts { get; set; }
        public bool views { get; set; }
        public bool clicks { get; set; }
        public bool installs { get; set; }
        public bool spend { get; set; }
        public bool skadInstalls { get; set; }
        public bool skadCpi { get; set; }
        public bool skadConversion { get; set; }
    }
}