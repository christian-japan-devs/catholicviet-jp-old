import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

interface INewFeed {
  id: number;
  nf_title: string;
  nf_type: string;
  nf_image: string;
  nf_brief_content: string;
  nf_user_created: string;
  nf_content: string;
  nf_language: string;
  nf_date_created: string;
  nf_post_like: number;
  nf_post_share: number;
  nf_post_clicked: number;
}

export default function Home({
  allFeedsData
}: {
  allFeedsData: INewFeed[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Header </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allFeedsData.map(({ id, nf_title,nf_type,nf_image, nf_brief_content,nf_user_created,nf_language,nf_date_created}) => (
            <li className={utilStyles.listItem} key={id}>
              <article>
                <Link href={`/feeds/${id}`}>
                  <a><h1 className={utilStyles.headingXl}>{nf_title}</h1></a>
                </Link>
                <br />
                <div className={utilStyles.lightText}>
                  <h5>{nf_user_created}</h5>
                  <Date dateString={nf_date_created} />
                </div>
                <div dangerouslySetInnerHTML={{__html: nf_brief_content}}/>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //const allFeedsData = getSortedFeedsData()
  const res = await fetch(`http://localhost:8000/api/newfeed`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json charset=utf-8",
    }
  });
  const allFeedsData = await res.json();
  //console.log(allFeedsData);
  return { props: { allFeedsData } };
}