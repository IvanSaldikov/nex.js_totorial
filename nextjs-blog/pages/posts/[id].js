import Layout from "../../components/layout"
import {getAllPostsIds, getPostData} from "../../lib/posts"
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

//Штуковина getStaticProps позволяет передавать в контроллер параметры (в данном случае params)
//Возвращаем данные о посте в props-е
//https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops
//https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details
export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}



//https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths
//Для того, чтобы работали роуты, нужно реализовать функцию getStaticPaths
export async function getStaticPaths() {
    const paths = await getAllPostsIds()
    return {
        paths,
        fallback: false
    }

}


//https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops
//https://nextjs.org/learn/basics/dynamic-routes/polishing-post-page
//Компонент поста
export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}
