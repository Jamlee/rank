import { Layout, Menu, Form, Input, Button, Select, Table, Tag, theme } from 'antd'
import React, { useEffect, useState } from 'react'
const { Header, Content, Footer } = Layout

import clientPromise from '../lib/mongo'

export default function Home({ langs, rawRecords }: any) {
  const [form] = Form.useForm()
  const [records, setRecords] = useState(rawRecords)

  const columns = [
    {
      title: '项目',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (_: any, { name }: any) => (
        <>
          <div>
            <a href={'https://github.com/' + name} target="_blank">{name}</a>
          </div>
        </>
      ),
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
      width: 20,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      render: (_: any, { desc }: any) => (
        <>
          <div style={{maxWidth: '500px'}}>
            {desc}
          </div>
        </>
      ),
    },
    {
      title: '话题',
      dataIndex: 'topics',
      key: 'topics',
      render: (_: any, { topics }: any) => (
        <>
          <div style={{maxWidth: '400px'}}>
            {topics?.map((topic: any) => {
              return (
                <Tag color={'geekblue'} key={topic} style={{ cursor: "pointer" }} onClick={
                  () => {
                    open('https://github.com/topics/' + topic, '_blank')
                  }
                }>
                  {topic}
                </Tag>
              );
            })}
          </div>
        </>
      ),
    },
    {
      title: '语言',
      dataIndex: 'lang',
      width: 60,
      key: 'lang',
      render: (_: any, { lang }: any) => (
        <>
          <div style={{maxWidth: '60px'}}>
            {lang}
          </div>
        </>
      ),
    },
  ];

  return (
    <Layout className="layout main" >
      <Header style={{paddingInline: "0px"}}>
      <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[{key: "github-rank", label: "GithubRank"}]}
        />
      </Header>
      <Content style={{ padding: '0 20px', backgroundColor:'#fff' }}>
        <div style={{ marginTop: '20px', position: 'relative' }}>
          <div>
            <Form form={form} name="query" layout="inline">
              <Form.Item
                name="lang"
                style={{ width: '100px'}}
              >
                <Select
                  options={langs}
                />
              </Form.Item>
              <Form.Item
                name="name"
              >
                <Input placeholder="项目" />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    onClick={() => {
                      const data = form.getFieldsValue()
                      console.log(data);
                      const newData = rawRecords.filter((ele: any) => {
                        let result = true;
                        if (data.lang !== undefined) {
                          if (ele.lang !== data.lang) {
                            result = false
                          }
                        }
                        if (data.name !== undefined) {
                          if (ele.name.indexOf(data.name) < 0) {
                            result = false
                          }
                        }
                        return result
                      })
                      setRecords(newData)
                    }}
                    disabled={
                      !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                  >
                    查询
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
          <div style={{ position: 'absolute', top: '55px' }}>
            查询结果 {records.length} 条 
          </div>
          <Table className='github-rank'
            pagination={{ position: ['topRight'] }} 
            dataSource={records} columns={columns} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Jamlee. All Rights Reserved.</Footer>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise
    const db = client.db("github")
    const langs: any[] = []
    await db.listCollections({}, {nameOnly: true })
      .forEach(name => langs.push({value: name.name, label: name.name}) > 0)
    const colls = langs.map(ele =>  db.collection(ele.value))
    const results = await Promise.all(colls.map(ele => ele.find({})))
    const records: any[] = []
    await Promise.all(results.map((cursor) => {
      return cursor.forEach((record) => records.push(record) > 0)
    }))
    const rawRecords = records.map((ele) => {
      ele._id = ele._id.toString('utf8')
      return ele
    })
    return {
      props: { 
        isConnected: true,
        langs,
        rawRecords,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
