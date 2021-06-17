import Filmes from "../components/Filmes";
import Categorias from "../components/Categorias";
import MeusFiltros from "../components/MeusFiltros";
import Filtrados from "../components/Filtrados";
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



const IndexWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  a{
    text-decoration: none;
  }
  .fixed {
    padding: 20px;
    flex-basis: 20%;
    position: fixed;
    z-index: 100%;
    top: 0px;
    left: 0px;
    width: 200px;
    background: #000000;
    height: 100%;
    font-size: 14px;
    .logo{
      max-width: 100%;
      height: auto;
    }
  }
  .content {
    flex-basis: 80%;
    padding-left: 220px;
    display: flex;
    justify-content: center;
  }
  .dataContainer{
    width: 100%;
    display: flex;
  }
`;

const Index = () => {

  function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    function goToNextPage() {
      setCurrentPage((page) => page + 1);
    }
  
    function goToPreviousPage() {
      setCurrentPage((page) => page - 1);
    }
  
    function changePage(event) {
      const pageNumber = Number(event.target.textContent);
      setCurrentPage(pageNumber);
    }
  
    const getPaginatedData = () => {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(startIndex, endIndex);
    };
  
    const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
  
    return (
      <div>
      <h1>{title}</h1>
  
      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </div>
  
      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 5 page
          numbers at a time
      */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>
  
        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
  
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </div>
    )
  }
  
  const dispatch = useDispatch();
  const [filmesFiltrados, setfilmesFiltrados] = useState([]);
  const { posts, filteredList } = useSelector((state) => state.post);
  const { genres } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchposts());
    dispatch(genreList());
  }, []);

  useEffect(() => {
    filteredMovies();
  }, [filteredList]);

  function filteredMovies() {
    const initialState = posts.results;
    let filtroDeGeneros = [];
    filteredList.map((eachCat) => {
      filtroDeGeneros.push(parseInt(eachCat.id));
    });
    const filterByTagSet = new Set(filtroDeGeneros);
    if (initialState) {
      const result = initialState.filter((o) =>
        o.genre_ids.some((tag) => filterByTagSet.has(tag))
      );
      setfilmesFiltrados(result);
    }
  }

  function toggler(e) {
    e.preventDefault();
    const name = e.target.innerText;
    const id = e.target.value;
    e.disabled = true;
    dispatch(sendToFiltered(id, name));
  }

  function removeFromChoices(e) {
    e.preventDefault();
    const name = e.target.innerText;
    const id = e.target.value;
    dispatch(removeFromFiltered(id, name));
    filteredMovies();
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
      <IndexWrapper>
        <div className="fixed">
          <img className="logo" src="/img/logo.png" />
          {filteredList.length > 0 && <MeusFiltros
            filteredList={filteredList}
            removeFromChoices={removeFromChoices}
          />}
          
          <Categorias genres={genres} toggler={toggler} />
        </div>
        <div class="content">
          {filmesFiltrados.length > 0 ? (
            <Filtrados filmesFiltrados={filmesFiltrados} />
          ) : (
            <>                
            <Pagination
            data={posts.results}
            RenderComponent={Filmes}
            title="Catálogo"
            pageLimit={5}
            dataLimit={3}
          />
          </>
          )}
        </div>
        <div>
    </div>
      </IndexWrapper>
    </Layout>
  );
};

export default Index;
