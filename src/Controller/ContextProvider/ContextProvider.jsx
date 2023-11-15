import { useReducer } from "react";
import { AppContext, appReducer, initialData } from "../Controller";


export default function ContextProvider({ children }) {
    const [appData, dispatch] = useReducer(appReducer, initialData);
    
    return (
        <AppContext.Provider value={{appData, dispatch}}>
            { children }
        </AppContext.Provider>
    )
}
