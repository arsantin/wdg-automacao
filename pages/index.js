import Home from "../components/layout/Home";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchposts, sendToFiltered, removeFromFiltered } from "../store/actions/postAction";
import { genreList } from "../store/actions/genreAction";

const Index = () => {
  const dispatch = useDispatch();

  const [butClass, setButClass] = useState(false);
  const { posts, filteredList } = useSelector((state) => state.post);
  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchposts());
    dispatch(genreList());
  }, []);

  function toggler(e) {
    e.preventDefault();    
    const name = e.target.innerText;
    console.log(name);
    const id = e.target.value;
    const buttonStatus = 'active';
    setButClass(true);
    dispatch(sendToFiltered(id, name, buttonStatus));
  }

  function removeFromChoices(e) {
    e.preventDefault();    
    const name = e.target.innerText;
    console.log(name);
    const id = e.target.value;
    const buttonStatus = 'inactive';
    dispatch(removeFromFiltered(id, name, buttonStatus));
  }

  const divStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const checked = {
    backgroundColor: "green",
  };

  const notchecked = {
    backgroundColor: "red",
  };

  return (
    <Layout>
      <div>
        <div style={divStyle}>
          <h3>Meus filtros</h3>
          {JSON.stringify(filteredList)}
          {filteredList &&
            filteredList.map((cada) => {
              return (
                <button
                  style={checked}
                  className={cada.buttonStatus}
                  key={cada.id}
                  onClick={removeFromChoices}
                  value={cada.id}
                >
                  {cada.name}
                </button>
              );
            })}
          
        </div>
        <h4>CATEGORIAS</h4>
        <div style={divStyle}>
          {genres.genres &&
            genres.genres.map((genre) => {
              return (
                <div key={genre.id}>
                  <button className={butClass ? "red" : "green"} onClick={toggler} value={genre.id}>
                    {genre.name}
                  </button>
                </div>
              );
            })}
        </div>
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
                    return <h4 key={id}>{id}</h4>;
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
