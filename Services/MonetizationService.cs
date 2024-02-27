using UnityAPI.Models.Monetization;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Diagnostics;

namespace UnityAPI.Services
{
    public class MonetizationService
    {
        Dictionary<string, string> requestFields = new Dictionary<string, string>()
        {
            {"adRequest", "adrequest_count"},
            {"availableSum", "available_sum"},
            {"revenueSum", "revenue_sum"},
            {"startCount", "start_count"},
            {"viewCount", "view_count"}
        };
        Dictionary<string, string> dataHeaders = new Dictionary<string, string>() 
        {
            {"timestamp", "timestamp"},
            {"country", "country"},
            {"placement", "placement"},
            {"platform", "platform"},
            {"source_game_id", "sourceGameId"},
            {"source_name", "sourceName"},
            {"adrequest_count", "adRequestCount"},
            {"available_sum","availableSum"},
            {"revenue_sum", "revenueSum"},
            {"start_count", "startCount"},
            {"view_count", "viewCount"}
        };
        public async Task<HttpResponseMessage> GetData(MonetizationRequest requestSettings)
        {
            HttpClient client = new HttpClient();
            string requestUrl = GetRequestUrl(requestSettings, requestSettings.fields, requestSettings.groupBy, requestSettings.organizationId);
            HttpResponseMessage response = await client.GetAsync(requestUrl);
            return response;
        }
        public string GetRequestUrl(MonetizationRequest requestSettings, MonetizationRequestFields requestSettingsFields, 
            MonetizationRequestGroupBy requestSettingsGroupBy, string organizationId)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            string url = configuration.GetValue<string>("UnityAPI:Monetization") + organizationId + "?";
            if(requestSettings.groupByUsed)
            {
                url += "groupBy=";
                PropertyInfo[] groupByPropeties = requestSettingsGroupBy.GetType().GetProperties();
                foreach(PropertyInfo property in groupByPropeties)
                {
                    bool value = (bool)property.GetValue(requestSettingsGroupBy, null);
                    if(value)
                        url+=property.Name+",";
                }
                url = url.Substring(0, url.Length-1) + "&";
            }
            url += "fields=";
            PropertyInfo[] fieldsPropeties = requestSettingsFields.GetType().GetProperties();
            foreach(PropertyInfo property in fieldsPropeties)
            {
                bool value = (bool)property.GetValue(requestSettingsFields, null);
                if(value)
                    url+=requestFields[property.Name]+",";
            }
            url = url.Substring(0, url.Length-1);
            url = url+"&scale=" + requestSettings.scale.ToLower() +
                "&start=" + requestSettings.startTime.ToString("yyyy-MM-ddTHH:mm:ssZ") + 
                "&end="+ requestSettings.endTime.ToString("yyyy-MM-ddTHH:mm:ssZ") +
                (requestSettings.gameIds != "" ? "&gameIds=" + requestSettings.gameIds : "") + 
                "&apikey=" + requestSettings.apiKey;
            return url;
        }
        public List<MonetizationData> SetMonetizationData (string responseBody)
        {
            List<MonetizationData> monetizationDataList = new List<MonetizationData>();
            List<string> responseBodyList = responseBody.Split('\n').ToList();
            List<string> responseDataHeaders = responseBodyList.First().Split(',').ToList();
            responseBodyList.RemoveAt(responseBodyList.Count - 1);
            if(responseBodyList.Count>1)
            {
                foreach(string info in responseBodyList.Skip(1))
                {
                    MonetizationData monetizationData = new MonetizationData();
                    Type type = monetizationData.GetType();
                    string[] infoData = info.Split(',');
                    int i = 0;
                    foreach(string dataHeader in responseDataHeaders)
                    {
                        try
                        {
                            PropertyInfo propertyInfo = type.GetProperty(dataHeaders[dataHeader]);
                            propertyInfo.SetValue(monetizationData, infoData[i]);
                        } catch (Exception e) {Debug.WriteLine(e.Message);}
                        i++;
                    }
                    monetizationDataList.Add(monetizationData);
                }
            }
            return monetizationDataList;
        }
    }
}

/*
"timestamp,                 country,placement,  platform,   source_game_id, source_name,    adrequest_count,    available_sum,  revenue_sum,    start_count,    view_count\n"
2023-03-11T00:00:00.000Z,   KR,                 ,android,   4687576,        UnityTask,      1,                  1,              0,              0,              0\n
2023-03-14T00:00:00.000Z,   CN,                 ,android,   4770559,        Unity Ads,      1,                  0,              0,              0,              0\n
2023-04-07T09:00:00.000Z,   US,                 ,android,   4687576,        UnityTask,      1,                  1,              0,              0,              0\n
2023-04-15T22:00:00.000Z,   RU,                 ,android,   4770545,        Unit Ads,       1,                  1,              0,              0,              0\n
2023-04-25T04:00:00.000Z,   US,                 ,android,   4770545,        Unit Ads,       1,                  1,              0,              0,              0\n
2023-04-27T01:00:00.000Z,   US,                 ,android,   4687565,        Magistro Darbas,1,                  1,              0,              0,              0\n
*/

/*https://monetization.api.unity.com/stats/v1/operate/organizations/5772468394406?
groupBy=country,placement,platform,game&fields=adrequest_count,available_sum,revenue_sum,start_count,view_count
&scale=hour
&start=2023-05-01T00:00:00Z&end=2023-06-01T23:59:00Z
&apikey=c48815571fda12c914b7a599d2a90d30ae5b3cca3ab7bfeb79ff7124bedde7d3*/