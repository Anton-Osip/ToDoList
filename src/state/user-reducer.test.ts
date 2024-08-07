import {userReducer} from "./user-reducer";

test("user reducer should increment only age", () => {
    const startState = {
        age: 20,
        childrenCount: 1,
        name: 'XZ'
    }
    const endState = userReducer(startState,{type: 'INCREMENT-AGE'})

    expect(endState?.age).toBe(21)
    expect(endState?.childrenCount).toBe(1)
})

test("user reducer should increment only childrenCount", () => {
    const startState = {
        age: 20,
        childrenCount: 1,
        name: 'XZ'
    }
    const endState = userReducer(startState,{type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState?.age).toBe(20)
    expect(endState?.childrenCount).toBe(2)
})

test("user reducer should change name of user", () => {
    const startState = {
        age: 20,
        childrenCount: 1,
        name: 'XZ'
    }
    const newName='VLADLEN'
    const endState = userReducer(startState,{type: 'CHANGE-NAME',newName:newName})

    expect(endState?.name).toBe(newName)
})