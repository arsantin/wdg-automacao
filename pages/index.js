import Home from "../components/layout/Home";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchposts,
  sendToFiltered,
  removeFromFiltered,
} from "../store/actions/postAction";
import { genreList } from "../store/actions/genreAction";
import styled from "styled-components";

const Index = () => {
  const dispatch = useDispatch();

  const [butClass, setButClass] = useState(false);
  const [filmesFiltrados, setfilmesFiltrados] = useState([]);
  const { posts, filteredList } = useSelector((state) => state.post);
  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchposts());
    dispatch(genreList());
    if(filteredList.length < 0){
      alert(filteredList.length)
    }else{
      filteredMovies();
    }
  }, []);

  

  function filteredMovies() {
    const initialState = posts.results;
    let filtroDeGeneros = [];
    filteredList.map((eachCat) => {
      filtroDeGeneros.push(parseInt(eachCat.id));
    }); 
    const filterByTagSet = new Set(filtroDeGeneros);
    const result = initialState.filter((o) =>
      o.genre_ids.some((tag) => filterByTagSet.has(tag))
    );
    setfilmesFiltrados(result);
  }

  function toggler(e) {
    e.preventDefault();
    const name = e.target.innerText;   
    const id = e.target.value;
    const buttonStatus = "active";
    setButClass(true);
    dispatch(sendToFiltered(id, name, buttonStatus));
  }

  function removeFromChoices(e) {
    e.preventDefault();
    const name = e.target.innerText;  
    const id = e.target.value;
    const buttonStatus = "inactive";
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
      <button onClick={filteredMovies}>carrega filmes selecionados</button>
      <div style={divStyle}>
          <h3 style={{ flexBasis: "100%" }}>Meus filtros</h3>

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
                  <button
                    className={butClass ? "red" : "green"}
                    onClick={toggler}
                    value={genre.id}
                  >
                    {genre.id} - {genre.name}
                  </button>
                </div>
              );
            })}
        </div>
        {filmesFiltrados &&
          filmesFiltrados.map((filme) => {
            return (
              <div key={filme.id}>
                <Link href="/movie/[id]" as={`/movie/${filme.id}`}>
                  <a>
                    <h2>{filme.title}</h2>
                  </a>
                </Link>
                {filme.genre_ids &&
                  filme.genre_ids.map((id) => {
                    return <h4 key={id}>{id}</h4>;
                  })}
                <div>{filme.overview}</div>
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
