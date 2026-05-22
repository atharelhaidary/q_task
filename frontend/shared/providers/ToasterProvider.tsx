import { Toaster } from "sonner"

const ToasterProvider = () => {
    return  <Toaster
                  position="top-right"
                  closeButton={false}
                  expand
                  richColors
                  theme="dark"
                  // icons={{
                  //   success:<p>+</p>
                  // }}
                  toastOptions={{
                    duration: 6000,
                    classNames: {
                      toast: 'flex flex-row !gap-3 !items-start rounded-lg',
                      icon: '!mt-1.5 !w-2 !h-2 ',
                      success: '!border-green-500/70',
                      error: `!border-red-500/70`,
                      title: '!font-bold !text-white'
                    },
                  }}
              />
}
export default ToasterProvider;