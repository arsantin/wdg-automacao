import Card from "../Card";
import Link from "next/link";
import styled from "styled-components";

const FiltradosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  h4 {
    flex-basis: 100%;
  }
  .count {
    flex-basis: 100%;
    text-align: center;
    color: color;
    span {
      color: orange;
      font-size: 24px;
    }
  }
`;

const Filtrados = (props) => {
  return (
    <FiltradosWrapper>      
      <div className="count">
        Foram encontrados{" "}
        <span>
          {props.filmesFiltrados &&
            JSON.stringify(props.filmesFiltrados.length)}
        </span>{" "}
        filme(s).
      </div>
      {props.filmesFiltrados &&
        props.filmesFiltrados.map((filme) => {
          return (
            <Link href="/movie/[id]" as={`/movie/${filme.id}`}>
              <a>
                <Card filme={filme} />
              </a>
            </Link>
          );
        })}
    </FiltradosWrapper>
  );
};

export default Filtrados;
