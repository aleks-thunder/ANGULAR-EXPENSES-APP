import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { EditedExpense } from 'src/app/interfaces/edited-expense';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})

export class HistoryListComponent implements OnInit {

  @Input() budgetItems!: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<EditedExpense> = new EventEmitter<EditedExpense>();

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  onDeleteItem( item: BudgetItem ) {
    this.delete.emit(item);
  }

  onCardClicked( item: BudgetItem ) {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.update.emit({
          old: item,
          new: result
        })
      }
    })

  }
  
}
