import Card from "../Card";
import Link from "next/link";
import CategoriasEscolhidas from "../CategoriasEscolhidas";
import styled from "styled-components";

const MeusFiltrosWrapper = styled.div`  
background-color: #131313;
padding: 5px;
border-radius: 5px;
.wrap-cat{
  display: flex;
  flex-wrap: wrap;
}
  h6 {
    flex-basis: 100%;
    margin: 10px 0px;
  }
  button {    
    background-color: #1b1b1b;
    border-radius: 5px;
    margin: 3px;
    border: none;
    color: #fff;
    padding: 5px;
    &:hover {
      cursor: pointer;
      background-color: orange;
    }
  }
`;

const MeusFiltros = (props) => {
  return (
    <MeusFiltrosWrapper>
      <h6>MEUS FILTROS</h6>      
      {props.filteredList &&
        props.filteredList.map((cats) => {
          return (
            <CategoriasEscolhidas
              className="wrap-cat"
              cats={cats}
              removeFromChoices={props.removeFromChoices}
            />
          );
        })}
      <button>LIMPAR FILTROS</button>
    </MeusFiltrosWrapper>
  );
};

export default MeusFiltros;
