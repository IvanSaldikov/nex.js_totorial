import Head from 'next/head'
import Layout, {siteTitle} from "../components/layout"
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from "../lib/posts"
import useSWR from 'swr'
import Link from 'next/link'
import Date from '../components/date'

//If you set function getStaticProps which returns props then you can use it later in Home function
//https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops
//This getStaticProps is run on the server, so you can use any secret information here
export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

//For getting context from the request you need to use this instea of getStaticProps
//https://nextjs.org/learn/basics/data-fetching/request-time
// export async function getServerSideProps(context) {
//     return {
//         props: {
//             // props for your component
//         }
//     }
// }

//Есть ещё метод Client-Side rendering, когда сначала подгружается страница, у пользователя считываются данные
//и затем, используя эти данные, считываются данные с сервера именно для этого пользователя
//Хорошо подходит для Дашбордов как раз
//https://nextjs.org/learn/basics/data-fetching/request-time

function Profile() {
    const { data, error } = useSWR('/api/user', fetch)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div>hello {data.name}!</div>
}

export default function Home({allPostsData}) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Hello, its me!</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>
                Blog
            </h2>
            <ul className={utilStyles.list}>
                {allPostsData.map(({id, date, title}) => (
                    <li className={utilStyles.listItem} key={id}>
                        <Link href={`/posts/${id}`}>
                            <a>{title}</a>
                        </Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={date} />
                        </small>
                    </li>
                  )
                )}
            </ul>
        </section>
      </Layout>
  )
}
