import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Layout from "../../components/Layout";
import UsersWrapper from "./styles";
import Link from "next/link"

const Users = () => {
  const { users, modifiedUsers } = useSelector((state: RootState) => state.user);

  return (
    <Layout>
      <UsersWrapper>
      <h1>USUÁRIOS</h1>
      {users.data &&  modifiedUsers.length === 0 &&      
        users.data.map((user, index) => {
          return <Card user={user} key={user.id} index={index} className="card"/>;
        })}
     {modifiedUsers && modifiedUsers.map((user, index) => {
          return <Card user={user} key={user.id} index={index}/>;
        })}
        {!users.data && modifiedUsers.length === 0 && <p><Link href="/">
              <a className="back">login</a>
            </Link>  </p>}
      </UsersWrapper>
    </Layout>
  );
};

export default Users;
