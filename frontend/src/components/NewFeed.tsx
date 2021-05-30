import React, { useEffect, useState } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

const PageTitle: React.FC<Props> = ({
  title,
  description,
  contentItem,
}: Props) => {
  return <>aa</>;
};
