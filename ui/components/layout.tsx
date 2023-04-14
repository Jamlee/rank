import { Layout, Menu, theme } from 'antd'
import Head from "next/head";

const { Header, Content, Footer } = Layout
import {useRouter} from 'next/router';

export default function MainLayout({ children }: any) {
    const router = useRouter()

    return (
        <Layout className="layout main" >
          <Head>
            <meta name="description" content="这是一个生成GitHub项目排行榜的工具，可以方便地查看最受欢迎、最火热的开源项目。" />
            <meta name="keywords" content="GitHub,项目,排行榜,C,C++,Rust" />
          </Head>
          <Header style={{paddingInline: "0px"}}>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[router.asPath]}
              items={[
                {key: "/", label: "Home"},
                {key: "/grank", label: "GithubRank"}
              ]}
              onSelect={ (item) => {
                router.push(item.key)
              } }
            />
          </Header>
          <Content style={{ padding: '0 20px', backgroundColor:'#fff' }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Jamlee. All Rights Reserved.</Footer>
        </Layout>
    )
  }