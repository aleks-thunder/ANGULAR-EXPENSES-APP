import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { InputComponent } from '../../pages/home/input/input.component';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
})

export class EditItemModalComponent implements AfterViewInit {

  constructor(  
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public item: BudgetItem,
    ) { }

    @ViewChild(InputComponent) 
    parentInput!: InputComponent;

    ngAfterViewInit(): void {
    this.parentInput.reactiveForm = this.parentInput.fb.group({
        date:         [this.item.date],
        category:     [this.item.category],
        description:  [this.item.description],
        amount:       [this.item.amount],
      });
    };

  onSubmitted(editedItem: BudgetItem) {
    this.dialogRef.close(editedItem);
  }
}