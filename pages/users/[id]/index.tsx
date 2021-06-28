import { fetchUserDetails, atualizaUsuario } from "../../../store/actions/UserAction";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../store/store";
import styled from "styled-components";
import Head from "next/head";
import React, { lazy, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";

const Layout = lazy(() => import("../../../components/Layout"));

const renderLoader = () => <p>Carregando...</p>;

const DetailsWrapper = styled.div`
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  .left {
    flex-basis: 40%;
    @media (max-width: 767px) {
      flex-basis: 100%;
    }
    .poster {
      max-width: 350px;
      margin: auto;
      text-align: center;
      border: solid 20px #f1f1f1 !important;
      width: 100%;
      height: auto;
    }
  }
  .right {
    flex-basis: calc(60% - 40px);
    padding: 0px 20px;
    @media (max-width: 767px) {
      flex-basis: calc(100% - 40px);
    }
  }
  .back {
    background: orange;
    padding: 5px;
    border-radius: 5px;
  }
  a {
    color: #000;
    text-decoration: none;
  }
`;

const movieDetails = () => {
  const { userdetails, modifiedUsers } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const dispatch = useDispatch();
  const id = router.query;

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, []);    

  function updateUser(data) {
    console.log(data)
    dispatch(atualizaUsuario(id, data));    
  }

  return (
    <Suspense fallback={renderLoader()}>
      <Layout>
        <Head>
         
        </Head>
        <DetailsWrapper>
          {userdetails && userdetails.data ? 
          <form onSubmit={handleSubmit(updateUser)}>
          <input
            type="firstname"
            placeholder={userdetails.data.first_name}
            {...register("firstname")}            
          />         
          
          <input
            type="email"
            value={userdetails.data.email}
            {...register("email")}            
          />
          <input
            type="avatar"
            value={userdetails.data.avatar}
            {...register("avatar")}            
          />
          <input
            type="lastname"
            placeholder={userdetails.data.last_name}
            {...register("lastname")}            
          />
          <input type="submit" />
        </form> : <p> Você está deslogado. Por favor, faça seu login através do link</p>
          }
        
          <div className="right">           
            <Link href="/users">
              <a className="back">voltar</a>
            </Link>           
          </div>
        </DetailsWrapper>
      </Layout>
    </Suspense>
  );
};

export default movieDetails;
