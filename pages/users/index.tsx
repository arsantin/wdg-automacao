import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Layout from "../../components/Layout";

const Users = () => {
  const { users, modifiedUsers } = useSelector((state: RootState) => state.user);

  return (
    <Layout>
      <h1>USUÁRIOS</h1>
      {users.data &&  modifiedUsers.length === 0 &&
        users.data.map((user) => {
          return <Card user={user} key={user.id} />;
        })}
     {modifiedUsers && modifiedUsers.map((user) => {
          return <Card user={user} key={user.id} />;
        })}
        {!users.data && modifiedUsers.length === 0 && <p>fazer login</p>}
      
    </Layout>
  );
};

export default Users;
