import {
  fetchUserDetails,
  atualizaUsuario,
} from "../../../store/actions/UserAction";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../store/store";
import styled from "styled-components";
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
  a{
    color: #fff;
  }
  form{
    background-color: #fff;
    padding: 25px;
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    label{
      color: #182f40;
    }
    h2{
      flex-basis: 100%;
      color: #424242;
    }
    input{
      flex-basis: 100%;
      margin: 10px 0px;
      padding: 5px;
    }
    span{
      color: red;
    }
    a{
      color: #fff;
    }
`;

const userDetails = () => {
  const { userdetails, modifiedUsers } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const id = router.query;

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, []);

  function updateUser(data) {
    console.log(data);
    dispatch(atualizaUsuario(id, data));
  }

  return (
    <Suspense fallback={renderLoader()}>
      <Layout>
        <DetailsWrapper>
          {userdetails && userdetails.data ? (
            <form onSubmit={handleSubmit(updateUser)}>
              <label>First Name:</label>
              <input type="firstname" {...register("firstname")} />
              <label>Email:</label>
              <input
                type="email"
                value={userdetails.data.email}
                {...register("email")}
              />
              <label>Avatar:</label>
              <input
                type="avatar"
                value={userdetails.data.avatar}
                {...register("avatar")}
              />
              <label>Last Name:</label>
              <input type="lastname" {...register("lastname")} />
              <input type="submit" />
            </form>
          ) : (
            <p>
              {" "}
              Você está deslogado. Por favor, faça seu login através do link
            </p>
          )}

          <Link href="/users">
            <a className="back">voltar</a>
          </Link>
        </DetailsWrapper>
      </Layout>
    </Suspense>
  );
};

export default userDetails;
