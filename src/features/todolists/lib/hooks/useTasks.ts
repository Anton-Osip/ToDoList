import { FilterValue } from "../types/types"
import { useState } from "react"
import { useGetTasksQuery } from "../../api/tasksApi"
import { TaskStatus } from "common/enums/enums"

export const useTasks = (filter: FilterValue, id: string) => {


  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: id, args: { page } })

  let tasks = data?.items

  if (filter === "Active") {
    tasks = tasks?.filter(task => task.status === TaskStatus.New)
  }

  if (filter === "Completed") {
    tasks = tasks?.filter(task => task.status === TaskStatus.Completed)
  }

  return { tasks, isLoading, page, setPage, totalCount: data?.totalCount }
}
