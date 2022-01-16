import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budget",[]);
  //budget is the key, [] the defaultValue
  const [expenses, setExpenses] = useLocalStorage("expenses",[]);

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budget === budgetId)
    //Will return only the id of the category of the expense
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  }
  function addBudget({ name, max}) {
    setBudgets(prevBudgets => {
      //We take our current budgets
      if (prevBudgets.find(budget => budget.name === name)) {
        //We check if we already have a budget with this name
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), name, max }]
      //We keep all the budgets in this array amd we add a new budget with id, name and max
    })
  }
  function deleteBudget({ id }) {
    //TODO : Deal with expenses' categories
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (<BudgetsContext.Provider value={{
    budgets,
    expenses,
    getBudgetExpenses,
    addExpense,
    addBudget,
    deleteBudget,
    deleteExpense
  }}>{children}</BudgetsContext.Provider>)
  //Pass a value and all the children  inside have access the this value. The all app has access to it => index.js
}