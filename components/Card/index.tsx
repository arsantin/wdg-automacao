import styled from "styled-components";
import Link from 'next/link'
import Image from 'next/image'


const MainCard = styled.div`
  margin: 5px;
  padding: 20px;
  background-image: linear-gradient(to top,#070c10 0%,#2a4961 100%);
  max-width: 200px;
  color: #fff;
  position: relative;
  h3{
    color: orange;
  }
  a {
    text-decoration: none;
    color: orange;
    text-align: center;   
    width: 100%; 
  }
  .avatar{
    border-radius: 125px;
    border: solid 5px orange;
  }
`;

const Card = (props) => {  
 
  return (
    <MainCard>      
        <div className="card_pic" key={props.user.id}>
          
            <Image            
            alt=""
            width={120}
            height={120}
            className="avatar" 
            src={props.user.avatar}
          />
          <h3>{props.user.first_name} {props.user.last_name}</h3>
         <Link href="/users/[id]" as={`/users/${props.user.id}`}>
            <a>editar</a></Link> 
        </div>               
    </MainCard>
  );
};

export default Card;
