import { RequestStatus } from "../../../../app/app-reducer"

export type FilterValue = "All" | "Active" | "Completed"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type DomainTodolist = Todolist & {
  filter: FilterValue
  entityStatus: RequestStatus
}
