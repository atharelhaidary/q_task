import { ErrorModal, LoadingModal } from '../components'
import { QueryClientProviderr, ContextProvider, ToasterProvider, AntdProvider, ModalsProvider } from './index'

const AppProvider = ({children}:{children: React.ReactNode}) => {
    return(
        <QueryClientProviderr>
                <ContextProvider>
                    <AntdProvider>
                            {children}
                            <LoadingModal />
                            <ErrorModal/>
                            <ModalsProvider/>
                    </AntdProvider>
                </ContextProvider>
                <ToasterProvider/>
        </QueryClientProviderr>
    )
}

export default AppProvider



