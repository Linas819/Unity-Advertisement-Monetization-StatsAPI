using System.Diagnostics;
using System.Reflection;
using UnityAPI.Models.Acquire;

namespace UnityAPI.Services
{
    public class AcquireService
    {
        Dictionary<string, string> dataHeaders = new Dictionary<string, string>() 
        {
            {"timestamp", "timestamp"},
            {"campaign set id", "campaignSetId"},
            {"campaign set name", "campaignSetName"},
            {"creative pack id", "creativePackId"},
            {"creative pack name", "creativePackName"},
            {"ad type", "adType"},
            {"campaign id", "campaignId"},
            {"campaign name", "campaignName"},
            {"target id", "targetId"},
            {"target store id", "targetStoreId"},
            {"target name", "targetName"},
            {"source app id", "sourceAppId"},
            {"store", "store"},
            {"country", "country"},
            {"platform", "platform"},
            {"os version", "osVersion"},
            {"starts", "starts"},
            {"views", "views"},
            {"clicks", "clicks"},
            {"installs", "installs"},
            {"spend", "spend"},
            {"skad installs", "skadInstalls"},
            {"skad cpi", "skadCpi"},
            {"cvr", "cvr"},
            {"ctr", "ctr"},
            {"ecpm", "ecpm"},
            {"cpi", "cpi"}
        };
        public async Task<HttpResponseMessage> GetData(AcquireRequest requestSettings)
        {
            var timer = new Stopwatch();
            HttpClient client = new HttpClient();
            string url = SetRequestUrl(requestSettings, requestSettings.splitBy, requestSettings.organizationId,
                requestSettings.fields, requestSettings.stores, requestSettings.platforms);
            HttpResponseMessage response = await client.GetAsync(url);
            return response;
        }
        public string SetRequestUrl(AcquireRequest requestSettings, AcquireRequestSplitBy splitBy, string organizationId,
            AcquireRequestFields fields, AcquireRequestStores stores, AcquireRequestPlatforms platforms)
        {
            PropertyInfo[] properties;
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            string url = configuration.GetValue<string>("UnityAPI:Acquire") + organizationId + 
                "/reports/acquisitions?start=" + requestSettings.startTime.ToString("yyyy-MM-ddTHH:mm:ssZ")+
                "&end="+ requestSettings.endTime.ToString("yyyy-MM-ddTHH:mm:ssZ")+"&";
            if(requestSettings.storesPlatformsUsed)
            {
                url += "stores=";
                properties = stores.GetType().GetProperties();
                foreach(PropertyInfo property in properties)
                {
                    bool value = (bool)property.GetValue(stores, null);
                    if(value)
                        url+=property.Name+",";
                }
                url = url.Substring(0, url.Length-1)+"&platforms=";
                properties = platforms.GetType().GetProperties();
                foreach(PropertyInfo property in properties)
                {
                    bool value = (bool)property.GetValue(platforms, null);
                    if(value)
                        url+=property.Name+",";
                }
                url = url.Substring(0, url.Length-1)+"&";
            }
            if(requestSettings.splitByUsed)
            {
                url += "splitBy=";
                properties = splitBy.GetType().GetProperties();
                foreach(PropertyInfo property in properties)
                {
                    bool value = (bool)property.GetValue(splitBy, null);
                    if(value)
                        url+=property.Name+",";
                }
                url = url.Substring(0, url.Length-1)+"&";
            }
            if(requestSettings.fieldsUsed)
            {
                url += "fields=";
                properties = fields.GetType().GetProperties();
                foreach(PropertyInfo property in properties)
                {
                    bool value = (bool)property.GetValue(fields, null);
                    if(value)
                        url+=property.Name+",";
                }
                url = url.Substring(0, url.Length-1)+"&";
            }
            properties = requestSettings.GetType().GetProperties().Where(x => x.PropertyType == typeof(string)).ToArray();
            foreach(PropertyInfo property in properties)
            {
                string value = property.GetValue(requestSettings, null).ToString();
                if(value != "")
                    url+=property.Name+"="+value+"&";
            }
            url = url.Substring(0, url.Length-1);
            return url;
        }
        public List<AcquireData> SetAcquireData (string responseBody)
        {
            List<AcquireData> acquireDataList = new List<AcquireData>();
            List<string> responseBodyList = responseBody.Split('\n').ToList();
            List<string> responseDataHeaders = responseBodyList.First().Split(',').ToList();
            responseBodyList.RemoveAt(responseBodyList.Count - 1);
            if(responseBodyList.Count>1)
            {
                foreach(string info in responseBodyList.Skip(1))
                {
                    AcquireData acquireData = new AcquireData();
                    Type type = acquireData.GetType();
                    string[] infoData = info.Split(',');
                    int i = 0;
                    foreach(string dataHeader in responseDataHeaders)
                    {
                        try // For any data field that may not be defined in the dictionary
                        {
                            PropertyInfo propertyInfo = type.GetProperty(dataHeaders[dataHeader]);
                            propertyInfo.SetValue(acquireData, infoData[i]);
                        } catch (Exception e) {Debug.WriteLine(e.Message);}
                        i++;
                    }
                    acquireDataList.Add(acquireData);
                }
            }
            return acquireDataList;
        }
    }
}