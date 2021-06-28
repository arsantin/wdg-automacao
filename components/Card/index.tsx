import styled from "styled-components";
import Link from 'next/link'


const MainCard = styled.div`
  margin: 5px;
  padding: 20px;
  background: #131313;
  max-width: 200px;
  color: #fff;
  position: relative;
  a {
    text-decoration: none;
    color: orange;
  }
  
  img {
    max-width: 250px;
    width: 100%;
    height: auto;
  }
  .card_name {
    color: #000;
    font-weight: 700;
  }
  .average{
    background-color: #154052;
    border-radius: 0px 0px 0px 10px;
    padding: 8px;
    position: absolute;
    z-index: 100;
    right: 20px;
    top: 0px;
  }
  input{
    width: 30px;
    text-align: center;
    margin: 5px;
  }
  button:hover{
    cursor: pointer;
  }
  .ativo{
    border: none;
    background-color: #440b3a;
    padding: 10px;
    color: #ebecd0;

  }  
`;

const Card = (props) => {  
 
  return (
    <MainCard>      
        <div className="card_pic" key={props.user.id}>
          <Link href="/users/[id]" as={`/users/${props.user.id}`}>
            <a>
          <h3>{props.user.first_name} {props.user.last_name}</h3></a></Link> 
        </div>               
    </MainCard>
  );
};

export default Card;
