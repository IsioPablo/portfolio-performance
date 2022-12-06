using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class StockPositionDTO
    {
        public string Ticker { get; set; }
        public DateTime DataDate { get; set; }
        public int UnitsHeld { get; set; } = 10;
        public double Price { get; set; }
        public double? HoldingValue { get; set; }
    }
}