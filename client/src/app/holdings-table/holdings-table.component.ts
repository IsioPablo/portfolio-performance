import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HoldingsTableDataSource} from './holdings-table-datasource';
import { StockPosition } from '../models/stockPosition';
@Component({
  selector: 'app-holdings-table',
  templateUrl: './holdings-table.component.html',
  styleUrls: ['./holdings-table.component.css']
})
export class HoldingsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StockPosition>;
  @Input() inputData : StockPosition[] = [];
  @Output() newItemEvent = new EventEmitter<StockPosition[]>();
  dataSource: HoldingsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticker', 'dataDate', 'unitsHeld', 'price', 'holdingValue'];

  constructor(datePipe : DatePipe) {
    this.dataSource = new HoldingsTableDataSource(this.inputData);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges){
    this.dataSource = new HoldingsTableDataSource(this.inputData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.newItemEvent.emit(this.inputData);
  }

  onChange() {
    this.dataSource = new HoldingsTableDataSource(this.inputData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.newItemEvent.emit(this.inputData);
  }

}
