import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface HoldingsTableItem {
  ticker: string;
  dataDate: Date;
  unitsHeld: number;
  price: number;
  holdingValue?: number;
}

// TODO: replace this with real data from your application
const MAIN_DATA: HoldingsTableItem[] = [
    {
      ticker: "Aquasure",
      dataDate: new Date(),
      unitsHeld: 3,
      price: 843.092
    },
    {
      ticker: "Opportech",
      dataDate: new Date(),
      unitsHeld: 15,
      price: 571.925
    },
    {
      ticker: "Tourmania",
      dataDate: new Date(),
      unitsHeld: 26,
      price: 767.525
    },
    {
      ticker: "Providco",
      dataDate: new Date(),
      unitsHeld: 17,
      price: 460.261
    },
    {
      ticker: "Polaria",
      dataDate: new Date(),
      unitsHeld: 17,
      price: 1740.035
    },
    {
      ticker: "Netur",
      dataDate: new Date(),
      unitsHeld: 12,
      price: 1933.886
    },
    {
      ticker: "Buzzness",
      dataDate: new Date(),
      unitsHeld: 17,
      price: 1346.748
    },
    {
      ticker: "Recritube",
      dataDate: new Date(),
      unitsHeld: 3,
      price: 945.81
    },
    {
      ticker: "Deepends",
      dataDate: new Date(),
      unitsHeld: 33,
      price: 180.94
    },
    {
      ticker: "Viasia",
      dataDate: new Date(),
      unitsHeld: 30,
      price: 350.626
    },
    {
      ticker: "Polarium",
      dataDate: new Date(),
      unitsHeld: 21,
      price: 1831.847
    },
    {
      ticker: "Singavera",
      dataDate: new Date(),
      unitsHeld: 25,
      price: 1847.021
    },
    {
      ticker: "Gronk",
      dataDate: new Date(),
      unitsHeld: 9,
      price: 675.257
    },
    {
      ticker: "Hotcakes",
      dataDate: new Date(),
      unitsHeld: 50,
      price: 57.505
    },
    {
      ticker: "Aquazure",
      dataDate: new Date(),
      unitsHeld: 6,
      price: 931.974
    },
    {
      ticker: "Snips",
      dataDate: new Date(),
      unitsHeld: 36,
      price: 1334.115
    },
    {
      ticker: "Ultrimax",
      dataDate: new Date(),
      unitsHeld: 46,
      price: 1552.324
    },
    {
      ticker: "Mazuda",
      dataDate: new Date(),
      unitsHeld: 5,
      price: 1940.262
    },
    {
      ticker: "Extro",
      dataDate: new Date(),
      unitsHeld: 5,
      price: 1138.259
    },
    {
      ticker: "Comtest",
      dataDate: new Date(),
      unitsHeld: 6,
      price: 1933.893
    },
];

/**
 * Data source for the HoldingsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HoldingsTableDataSource extends DataSource<HoldingsTableItem> {
  data: HoldingsTableItem[] = MAIN_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<HoldingsTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: HoldingsTableItem[]): HoldingsTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: HoldingsTableItem[]): HoldingsTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'ticker': return compare(+a.ticker, +b.ticker, isAsc);
        case 'dataDate': return compare(+a.dataDate, +b.dataDate, isAsc);
        case 'unitsHeld': return compare(+a.unitsHeld, +b.unitsHeld, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        //case 'holdingValue': return compare(+a.holdingValue, +b.holdingValue, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
