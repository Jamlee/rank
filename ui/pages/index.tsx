import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import fs from 'fs'

export default function Index({content}: any) {
    return <div style={{marginTop: '20px'}}>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </div>
}

export async function getStaticProps() {
    const content = fs.readFileSync('README-UI.md')

    return {
        props: { 
          content: content.toString(),
        },
    }
}
