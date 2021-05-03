import React, {useEffect, useState} from 'react';
import { NewFeed } from '../interfaces/newfeed';

const NewFeeds = () => {

    const [newfeeds, setNewfeeds] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect( () =>{
        const loadNewFeed = 
            async () =>{
                try{
                    setIsLoading(true);
                    const response = await fetch(
                        `http://localhost:8000/api/newfeed`
                        );

                    const result: never[]= await response.json();
                    setNewfeeds([...newfeeds, ...result]);
                    setErrorMsg('');
                }catch(error){
                    setErrorMsg('Error while loading data. Try again later.');
                }finally{
                    setIsLoading(false);
                }
            };
        loadNewFeed();
    }, []);

    const loadMore = () => {
        setPage((page) => page + 1);
    }

    return (
        
        <div className="newfeed-container">
            {newfeeds.map(
                (nf:NewFeed) =>{
                return (
                    <div className="col-md-8">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary">{nf.nf_type}</strong>
                                <h3 className="mb-0">{nf.nf_title}</h3>
                                <div className="mb-1 text-muted">{nf.nf_date_created}</div>
                                <p className="card-text mb-auto">{nf.nf_brief_content}</p>
                                <a href="#" className="stretched-link">Xem thêm</a>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img src={nf.nf_image}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default NewFeeds;