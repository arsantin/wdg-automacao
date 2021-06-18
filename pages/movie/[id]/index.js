import {fetchpostdetails} from '../../../store/actions/postAction'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from "styled-components";
import Head from 'next/head'

const DetailsWrapper = styled.div`
  max-width: 600px;
  text-align: center;
  margin: auto;
  img{
  max-width: 350px;
  margin: auto;
  text-align: center;
  border: solid 20px #f1f1f1;
  width: 100%;
  height: auto;
  }
`;


const movieDetails = () => { 

  const {postdetails} = useSelector(state=>state.post)
  
  const router = useRouter()
  
  const dispatch = useDispatch()
  const id = router.query;

  useEffect(() => {
    dispatch(fetchpostdetails(id))   
  },[])

 
  return (
    <>
    <Head>
      <title>PromobitFlix - {postdetails.title}</title>

      </Head>
  <Link href="/"><a>voltar</a></Link> 
    <DetailsWrapper>
    
    <img
            src={`https://image.tmdb.org//t//p//w1280//${postdetails.poster_path}`}
            alt=""
          />
<h1>{postdetails.original_title}</h1> 
<p>{postdetails.overview}</p>
<p><strong>Categorias:</strong></p>
<ul>
  {postdetails.genres && postdetails.genres.map(genre => {
    return <li key={genre.id}>{genre.name}</li>
  })}
</ul>
</DetailsWrapper>
</>
);
}





export default movieDetails