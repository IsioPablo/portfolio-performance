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
            //https://query1.finance.yahoo.com/v8/finance/chart/AAPL?includeAdjustedClose=false&interval=1d&period1=1638152296&period2=1669688296&useYfid=true&corsDomain=finance.yahoo.com
        }

        [HttpGet]
        public async void Get()
        {
            string[] stockTickers = {"AAPL", "TSLA", "MSFT", "NFLX", "GOOGL", "AMZN"};
            List<DateTime> dates = new List<DateTime>();
            List<int> prices = new List<int>();
            for (DateTime date = new DateTime(2022, 10, 3); date.Date <= DateTime.UtcNow.Date; date = date.AddDays(1))
            {
                if(date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday)
                {
                    dates.Add(date);
                }                   
            }
            
            using HttpClient client = _httpClientFactory.CreateClient();

            foreach (string ticker in stockTickers)
            {
                Root apiResult = await client.GetFromJsonAsync<Root>($"https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?includeAdjustedClose=false&interval=1d&period1=1664755200&period2={((DateTimeOffset)DateTime.UtcNow.AddDays(1)).ToUnixTimeSeconds()}&useYfid=true&corsDomain=finance.yahoo.com");
            }

            return;
            //return stockTickers.SelectMany(s => dates, (s, d) => new StockPositionDTO { Ticker = s, Date = d }).OrderBy(sp => sp.Date);
        }
    }
}