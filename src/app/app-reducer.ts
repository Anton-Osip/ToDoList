export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
}

type InitialStateType = typeof initialState

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

type ActionsType = SetStatusType
export type SetStatusType = ReturnType<typeof setStatusAC>
export const setStatusAC = (status: RequestStatusType) => (
    {type: 'APP/SET-STATUS', status} as const
)
