import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import 'antd/dist/reset.css'
import '../styles/vars.css'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
     <Component {...pageProps} />
  </Layout>
}

export default MyApp
