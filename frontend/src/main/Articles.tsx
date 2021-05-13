import 'axios';

export interface Article {
  id: number;
  article_title: string;
  article_writer: string;
  article_date: string;
  article_bref: string;
  article_content: string;
  article_liked: number;
  article_shared: number;
  article_image: string;
  article_category: string;
}

const Article = () => {
  return <div>Article</div>;
};

export default Article;
