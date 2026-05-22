"use client"
import {  createContext, useCallback, useContext, useMemo, useState} from "react";

type TPopupStates = {
    [key: string] :  Record<string,any>
}
type TShowpopupProps = {
    data ? : Record<string,any>
}
type TPopupContext = {
    popupStates: TPopupStates,
    showPopup: (key : string, data?: TShowpopupProps ) => void,
    hidePopup : (key : string) => void
    clearAllPopup : () => void

}

const PopupContext = createContext<TPopupContext | null>(null);


export const PopupProvider = ({children}:{children:React.ReactNode}) => {
    const [popupStates, setPopupState ] = useState<TPopupStates>({});

    const showPopup = useCallback((key : string, data?: TShowpopupProps)=>{
        setPopupState((prev) => {
            const newState = {
                ...prev,
                [key]: { 
                    open: true,
                    ...(data?.data || {}) 
                }
            };
            
            return newState;
        });
    },[])
    const hidePopup = useCallback((key : string)=>{
        setPopupState(prev => ({
            ...prev,
            [key]:{ open:false }
          }));

    },[])
    const clearAllPopup = useCallback(()=>{
        setPopupState({})
    },[])
    const contextValue = useMemo(() => ({
        popupStates,
        showPopup,
        hidePopup,
        clearAllPopup,
    }), [popupStates, showPopup, hidePopup, clearAllPopup]);
    return(
        <PopupContext.Provider value={contextValue}>
            {children}
        </PopupContext.Provider>
    )
}




export const usePopup = (): TPopupContext => {
    const context = useContext(PopupContext);
    
    if (!context) {
      throw new Error("useLoading must be used within a LoadingProvider");
    }
    
    return context;
};



