import Home from "../components/layout/Home";
import Link from "next/link";

import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchposts, sendToFiltered } from "../store/actions/postAction";
import { genreList } from "../store/actions/genreAction";

const Index = () => {
  const dispatch = useDispatch();

  const { posts, filteredList } = useSelector((state) => state.post);
  const { genres } = useSelector((state) => state.genre);  

  useEffect(() => {
    dispatch(fetchposts());
    dispatch(genreList());
  }, []);  

  function toggler(e){
    e.preventDefault();
    const name = e.target.innerText
    console.log(name)
    const id = e.target.value

    dispatch(sendToFiltered(id, name))
  }

  return (
    <Layout>
    
      <div>
      {filteredList && filteredList.map(cada => {
        return <button onClick={toggler} value={cada.id}>{cada.name}</button>
      })}
        <h4>CATEGORIAS</h4>
        {genres.genres &&
          genres.genres.map((genre) => {
            return (
              <div>
                <button onClick={toggler} value={genre.id}>{genre.name}</button>
              </div>
            );
          })}
        <h4>FILMES</h4>
        {posts.results &&
          posts.results.map((post) => {
            return (
              <div key={post.id}>
                <Link href="/movie/[id]" as={`/movie/${post.id}`}>
                  <a>
                    <h2>{post.title}</h2>
                  </a>
                </Link>
                {post.genre_ids &&
                  post.genre_ids.map((id) => {
                    return <h4>{id}</h4>;
                  })}
                <div>{post.overview}</div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Index;
