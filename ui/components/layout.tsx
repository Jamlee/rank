import { Layout, Menu, theme } from 'antd'
const { Header, Content, Footer } = Layout
import {useRouter} from 'next/router';

export default function MainLayout({ children }: any) {
    const router = useRouter()

    return (
        <Layout className="layout main" >
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