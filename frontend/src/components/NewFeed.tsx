import React from 'react';

interface ContentItem {
  summary: string;
  smallIconUrl: string;
  title: string;
  contentUrl: string;
}

interface Props {
  title?: string;
  description?: string;
  contentItem?: ContentItem | null;
}

const NewFeed: React.FC<Props> = ({
  title,
  description,
  contentItem,
}: Props) => {
  return (
    <div>
      {description}
    </div>
  );
};

export default NewFeed;
