import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "../../components/layout";
import SampleReactFileUpload from '../../components/upload'


//https://nextjs.org/learn/basics/assets-metadata-css/assets
const YourComponent = () => (
    <Image
        src="/images/profile.jpg" //Route of the image file
        height={144}
        width={144}
        alt="Example"
    />
)


export default function FirstPost() {
    //https://nextjs.org/learn/basics/assets-metadata-css/metadata
    return (
        <Layout>
            <Head>
                <title>First post</title>
            </Head>
            <h1>First post</h1>
            <h2>
                <YourComponent/>
                <br/>
                <SampleReactFileUpload/>
                <br/>
                <Link href='/'>
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>

    )
}


