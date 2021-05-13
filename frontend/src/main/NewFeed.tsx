import { useEffect, useState } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';

import parse from 'html-react-parser';
import './newfeed.css';

export interface NewFeed {
  id: number;
  nf_title: string;
  nf_type: string;
  nf_image: string;
  nf_brief_content: string;
  nf_content: string;
  nf_language: string;
  nf_date_created: string;
  nf_post_like: number;
  nf_post_share: number;
  nf_post_clicked: number;
}

const NewFeeds = () => {
  const [newfeeds, setNewfeeds] = useState([]);
  const [, setIsLoading] = useState(false);
  const [, setErrorMsg] = useState('');

  useEffect(() => {
    const loadNewFeed = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/newfeed`);

        const result: never[] = await response.json();
        setNewfeeds([...newfeeds, ...result]);
        setErrorMsg('');
      } catch (error) {
        setErrorMsg('Error while loading data. Try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadNewFeed();
  }, []);

  return (
    <div className="newfeed-container">
      {newfeeds.map((nf: NewFeed) => {
        return (
          <div className="col-md-12">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="row">
                <div className="col p-4 d-flex flex-column position-static">
                  <div className="media">
                    <div className="media-left media-top">
                      <img
                        src={'http://localhost:8000' + nf.nf_image}
                        className="media-object media-user"
                      />
                    </div>
                    <div className="media-body">
                      <h5 className="mb-1">Fr. Nguyen Huu Hien</h5>
                      <div className="mb-1 text-muted">
                        {nf.nf_date_created}
                      </div>
                      <h3 className="mb-0">{nf.nf_title}</h3>
                      <p className="card-text mb-auto">
                        {parse(nf.nf_brief_content)}
                      </p>
                      <a href="/" className="stretched-link">
                        Đọc tiếp...
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <img
                    className="media-image"
                    src={'http://localhost:8000' + nf.nf_image}
                  />
                </div>
              </div>
              <div className="row media-footer">
                <div className="col-4 col-md-4 media-child">
                  {nf.nf_post_clicked}
                  <VisibilityIcon fontSize="large" color="primary" />
                </div>
                <div className="col-4 col-md-4 media-child">
                  {nf.nf_post_like}
                  <FavoriteIcon fontSize="large" color="secondary" />
                </div>
                <div className="col-4 col-md-4 media-child">
                  {nf.nf_post_share}
                  <ShareIcon fontSize="large" color="primary" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewFeeds;
