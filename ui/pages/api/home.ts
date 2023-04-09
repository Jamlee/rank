import fs from 'fs'

export default function handler(req: any, res: any) {
    const content = fs.readFileSync('README-UI.md')
    res.status(200).json({ content: content.toString() })
}