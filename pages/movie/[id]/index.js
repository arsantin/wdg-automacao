import {fetchpostdetails} from '../../../store/actions/postAction'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
    <Link href="/"><a>voltar</a></Link>
<h1>{postdetails.original_title}</h1> 
<p>{postdetails.overview}</p>
<p><strong>Categorias:</strong></p>
<ul>
  {postdetails.genres && postdetails.genres.map(genre => {
    return <li key={genre.id}>{genre.name}</li>
  })}
</ul>
</>
);
}





export default movieDetails