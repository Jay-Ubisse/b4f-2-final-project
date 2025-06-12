

import { useState} from "react";
import { Button } from "../components/ui/button"
type CounterState = {
    count: number;
}

export const Counter = () =>{
const [state, setState] = useState<CounterState>({count:0});
const decrement = () => {
    setState({count: state.count-1 });
}
const increment = () => {
    setState({count: state.count+1});
}
const reset = () => {
    setState({count: 0});
}

    return (
        <>
        <div className="App">
            <h2>Counter: (state.count)</h2>
            
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
        <Button onClick={reset}>reset</Button>   
        </div>
        </>
    )
}
