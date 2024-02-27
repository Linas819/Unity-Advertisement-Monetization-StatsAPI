using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using UnityAPI.Models.Acquire;
using UnityAPI.Services;

namespace UnityAPI.Controllers;
[ApiController]
//[Authorize]
[Route("api/[controller]")]
public class AcquireController: ControllerBase
{
    AcquireService acquireService;
    public AcquireController(AcquireService acquireService)
    {
        this.acquireService = acquireService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAcquireData(string requestParameters)
    {
        AcquireRequest requestSettings = JsonSerializer.Deserialize<AcquireRequest>(requestParameters);
        HttpResponseMessage requestResponse = await acquireService.GetData(requestSettings);
        string responseBody = await requestResponse.Content.ReadAsStringAsync();
        if(requestResponse.IsSuccessStatusCode)
        {
            List<AcquireData> acquireData = acquireService.SetAcquireData(responseBody);
            return Ok(new {
                success = true,
                data = acquireData
            });
        } else {
            return Ok(new{
                success = false,
                message = responseBody
            }); 
        }
    }
}
