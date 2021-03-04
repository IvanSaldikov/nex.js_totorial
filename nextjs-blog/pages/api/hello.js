//https://nextjs.org/learn/basics/api-routes/creating-api-routes
export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' })
}
