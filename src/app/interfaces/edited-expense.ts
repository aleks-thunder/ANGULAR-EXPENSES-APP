import { BudgetItem } from "../models/budget-item.model";

export interface EditedExpense {
  old: BudgetItem;
  new: BudgetItem;
}