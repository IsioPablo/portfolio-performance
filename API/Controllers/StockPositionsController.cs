using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // /api/stockPositions
    public class StockPositionsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory = null!;
        public StockPositionsController(IHttpClientFactory httpClientFactory) { 
            _httpClientFactory = httpClientFactory;
        }

        public static string[] stockTickers = {"AAPL", "TSLA", "MSFT", "NFLX", "GOOGL", "AMZN"};

        [HttpGet]
        public async Task<List<StockPositionDTO>> Get()
        {
            // List<DateTime> dates = new List<DateTime>();
            // List<int> prices = new List<int>();
            // for (DateTime date = new DateTime(2022, 10, 3); date.Date <= DateTime.UtcNow.Date; date = date.AddDays(1))
            // {
            //     if(date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday)
            //     {
            //         dates.Add(date);
            //     }                   
            // }
            
            using HttpClient client = _httpClientFactory.CreateClient();

            List<StockPositionDTO> response = new List<StockPositionDTO>();
            
            foreach (string ticker in stockTickers)
            {
                Root apiResult = await client.GetFromJsonAsync<Root>($"https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?includeAdjustedClose=false&interval=1d&period1=1664755200&period2={((DateTimeOffset)DateTime.UtcNow.AddDays(1)).ToUnixTimeSeconds()}&useYfid=true&corsDomain=finance.yahoo.com");
                
                foreach (var item in apiResult.chart.result[0].timestamp.Zip(apiResult.chart.result[0].indicators.quote[0].close)) {
                    StockPositionDTO stockPosition = new StockPositionDTO() {
                        Ticker = ticker,
                        DataDate =  DateTimeOffset.FromUnixTimeSeconds(item.First).UtcDateTime,
                        UnitsHeld = 10,
                        Price = item.Second,
                        HoldingValue = 10 * item.Second
                    };
                    response.Add(stockPosition);
                }
            }

            return response.OrderByDescending(x => x.DataDate).ThenBy(x => x.Ticker).ToList();
        }
    }
}