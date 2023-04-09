import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import instance from '../lib/axios'

export default function Index({content}: any) {
    return <div style={{marginTop: '20px'}}>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </div>
}

export async function getServerSideProps() {
    const res: any = await instance.get('/home')
    console.log(res)
    return {
        props: { 
          content: res?.data.content,
        },
    }
}
