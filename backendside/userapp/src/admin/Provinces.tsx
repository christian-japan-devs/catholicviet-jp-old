import React, {useEffect, useState} from 'react';
import { IProvince } from '../interfaces/province';
import Wrapper from './Wrapper';

const Provinces = () => {

    const [provinces, setProvinces] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect( () =>{
        const loadProvince = 
            async () =>{
                try{
                    setIsLoading(true);
                    const response = await fetch(
                        `http://localhost:8000/api/province/?page=${page}&results=10`
                        );

                    const result: never[]= await response.json();
                    setProvinces([...provinces, ...result]);
                    setErrorMsg('');
                }catch(error){
                    setErrorMsg('Error while loading data. Try again later.');
                }finally{
                    setIsLoading(false);
                }
            };
        loadProvince();
    }, []);

    const loadMore = () => {
        setPage((page) => page + 1);
    }

    return (
        <Wrapper>
            <div className="load-more">
                <button onClick={loadMore} className='btn-load-more'>
                    {isLoading? 'Loading...':'Load More'}
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>International</th>
                        </tr>
                    </thead>
                    <tbody>
                        {provinces.map(
                            (p:IProvince) =>{
                            return (
                                <tr key={p.id} >
                                    <td>{p.id} </td>
                                    <td>{p.province_code} </td>
                                    <td>{p.province_en_name} </td>
                                    <td>{p.province_nation} </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Provinces;