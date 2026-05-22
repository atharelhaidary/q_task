import { ConfigProvider} from 'antd'

export default function AntdProvider({ children }: { children:React.ReactNode }) {

  return (
    <ConfigProvider
      // theme={{
      //   token: {
      //     colorPrimary: '#096dd9',
      //     colorPrimaryActive: '#0050b3',
      //     colorPrimaryHover: '#1890ff',
      //   },
      //   components: {
      //     Button: {
      //       colorPrimary: '#096dd9',
      //       colorPrimaryHover: '#1890ff',
      //       colorPrimaryActive: '#0050b3',
      //       primaryShadow: '0 2px 0 rgba(5, 145, 255, 0.1)',
      //     },
      //   },
      // }}
    >
      {children}
   </ConfigProvider>
  )
}