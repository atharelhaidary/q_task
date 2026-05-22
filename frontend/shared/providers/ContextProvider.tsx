import { PopupProvider, PaginationProvider } from "../context"

type TContextProviderProps = {
    children : React.ReactNode
}
const ContextProvider = ({children} : TContextProviderProps) => {
    return(
        <PaginationProvider>
            <PopupProvider>
                    {children}
            </PopupProvider>
        </PaginationProvider>

    )

}
export default ContextProvider