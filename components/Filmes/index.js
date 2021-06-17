import Card from '../Card'
import Link from 'next/link'
import styled from "styled-components";

const FilmesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  h1 {
    flex-basis: 100%;
  }  
`;

const Filmes = (props) => {
console.log("kkkk", props.data)
  return(
    <FilmesWrapper>
    
    {props.data &&
          
              <Link href="/movie/[id]" as={`/movie/${props.data.id}`}>
                <a>
                  <Card filme={props.data} />
                </a>
              </Link>
}
        </FilmesWrapper>
  )
}

export default Filmes