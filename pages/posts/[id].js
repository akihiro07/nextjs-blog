import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Layout from "../../components/layout";
import Date from "../../components/date";
import {getAllPostIds, getPostData} from "../../lib/posts";

// idリストを取得
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// static generation(プリレンダリング)(せい的ページ生成)
// paramsでidを受け取る
export async function getStaticProps({params}) {
  //  await は promise が確定しその結果を返すまで、JavaScript を待機させる
  // getPostDataは`async`関数を使用する為、Pomiseが返ってくる
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

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
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </article>
    </Layout>
  );
}
