import { Form, Input, Button, Select, Table, Tag } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import Keyevent from "react-keyevent"


import clientPromise from '../lib/mongo'

export default function Home({ langs, rawRecords }: any) {
  const [form] = Form.useForm()
  const [records, setRecords] = useState(rawRecords)

  const tableRef = useRef<any>(null);
  const searchRef = useRef<any>(null);

  const onAltJ = () => {
    const left = tableRef?.current?.getElementsByClassName("anticon-left");
    left[0].click();
  }
  const onAltK = () => {
    const right = tableRef?.current?.getElementsByClassName("anticon-right");
    right[0].click();
  }

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
          <div style={{ maxWidth: '500px' }}>
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
          <div className='topics-hover' style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'scroll', paddingBottom: '5px' }}>
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
          <div style={{ maxWidth: '60px' }}>
            {lang}
          </div>
        </>
      ),
    },
  ];


  return (
    <>
      <div style={{ marginTop: '20px' }} id="dummy">
        快捷键:  上一页  Alt + J, 下一页Alt + K
      </div>
      <div style={{ marginTop: '20px', position: 'relative' }}>
        <div>
          <Form form={form} name="query" layout="inline">
            <Form.Item
              name="lang"
              style={{ width: '100px' }}
            >
              <Select
                options={langs}
              />
            </Form.Item>
            <Form.Item
              name="name"
            >
              <Input placeholder="项目" ref={searchRef} />
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
        <Keyevent
          events={{
            onAltJ,
            onAltK,
          }}
        >
          <Table className='github-rank' ref={tableRef}
            pagination={{ position: ['topRight'] }}
            dataSource={records} columns={columns} />
        </Keyevent>
      </div>
    </>
  )
}

export async function getStaticProps() {
  try {
    const client = await clientPromise
    const db = client.db("github")
    const langs: any[] = []
    await db.listCollections({}, { nameOnly: true })
      .forEach(name => langs.push({ value: name.name, label: name.name }) > 0)
    const colls = langs.map(ele => db.collection(ele.value))
    const results = await Promise.all(colls.map(ele => ele.find({}).sort({stars: -1})))
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
