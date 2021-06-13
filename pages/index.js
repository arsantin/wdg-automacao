import Home from '../components/layout/Home'
import Link from 'next/link';

import Layout from '../components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {fetchposts} from '../store/actions/postAction'
import { genreList } from '../store/actions/genreAction';


const Index = ()=> {

  const dispatch = useDispatch()

  const {posts} = useSelector(state=>state.post)
  const {genres} = useSelector(state=>state.genre)
  

  useEffect(() => {
    dispatch(fetchposts())  
    dispatch(genreList())   
  },[])
  
  return(
  <Layout>
    <Home />
    <div>
      <h4>CATEGORIAS</h4>
     {genres.genres && genres.genres.map((genre)=> {
       return <div><p>{genre.name}</p></div>
     })}
      <h4>FILMES</h4>
      {posts.results && posts.results.map((post) => {
        return <Link href="/movie/[id]" as={`/movie/${post.id}`} ><a><div key={post.title}>
          <h2>{post.title}</h2>
          <div>{post.overview}</div>
          </div></a></Link>
      })}
    </div>
  </Layout>
  )
}


export default Index;