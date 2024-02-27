using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using UnityAPI.Models.Monetization;
using UnityAPI.Services;

namespace UnityAPI.Controllers;
[ApiController]
//[Authorize]
[Route("api/[controller]")]
public class MonetizationController: ControllerBase
{
    private MonetizationService monetizationService;
    public MonetizationController(MonetizationService monetizationService)
    {
        this.monetizationService = monetizationService;
    }
    [HttpGet]
    public async Task<IActionResult> GetMonetizationData(string requestParameters)
    {
        MonetizationRequest requestSettings = JsonSerializer.Deserialize<MonetizationRequest>(requestParameters); 
        HttpResponseMessage requestResponse = await monetizationService.GetData(requestSettings);
        string responseBody = await requestResponse.Content.ReadAsStringAsync();
        if(requestResponse.IsSuccessStatusCode)
        {
            List<MonetizationData> monetizationData = monetizationService.SetMonetizationData(responseBody);
            return Ok(new {
                success = true,
                data = monetizationData
            });
        } else {
            return Ok(new{
                success = false,
                message = responseBody
            });  
        }
    }
}
