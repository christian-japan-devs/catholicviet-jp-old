import * as React from 'react';
import { Helmet } from 'react-helmet';

interface ContentItem {
  summary: string;
  smallIconUrl: string;
  title: string;
  contentUrl: string;
}

interface Props {
  title: string;
  description?: string;
  contentItem?: ContentItem | null;
}

export const PageTitle: React.FC<Props> = ({ title, description, contentItem }) => {
  return (
    <Helmet>
      <title itemProp="name">{title}</title>
      {description && !contentItem && (
        <meta name="description" content={description} />
      )}
      {contentItem && [
        <meta
          key="description"
          name="description"
          content={contentItem.summary}
        />,
        <meta
          key="og:description"
          property="og:description"
          content={contentItem.summary}
        />,
        <meta
          key="og:image"
          property="og:image"
          content={contentItem.smallIconUrl}
        />,
        <meta key="og:title" property="og:title" content={contentItem.title} />,
        <meta key="og:type" property="og:type" content="website" />,
        <meta key="twitter:site" name="twitter:site" content="@react-test" />,
      ]}
    </Helmet>
  );
};

