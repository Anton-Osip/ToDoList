import Grid from "@mui/material/Grid2";
import {TodoList} from "./Todolist/TodoList";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {selectTasks} from "../../model/tasksSelectors";
import {selectTodoLists} from "../../model/todolistsSelectors";

export const TodoLists = () => {
    const todolists = useAppSelector(selectTodoLists)
    const tasks = useAppSelector(selectTasks)


    return (
        <Grid container spacing = {2} sx = {{mt: '40px'}}>
            {todolists.map(tl => {
                return (
                    <Grid key = {tl.id} size = {{xs: 12, sm: 6, md: 4, xl: 3}}>
                        <TodoList
                            todoList = {tl}
                            tasks = {tasks[tl.id]}
                        />
                    </Grid>
                )
            })}
        </Grid>
    );
}


