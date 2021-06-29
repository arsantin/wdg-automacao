import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser} from "../store/actions/UserAction";
import IndexWrapper from "./styles";
import Layout from "../components/Layout";


const Index = () => {  
  const dispatch = useDispatch(); 
  const { register, handleSubmit, formState: { errors }, } = useForm();
  function loginApp(data) {
    dispatch(loginUser(data));    
  }

  return (    
      <Layout>
        <IndexWrapper>          
        <form onSubmit={handleSubmit(loginApp)}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true })}            
          />
          {errors.email && <span>Este campo é obrigatório</span>}
          <input
            type="text"
            placeholder="Senha"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Este campo é obrigatório</span>}
          <input type="submit" />
        </form>
        </IndexWrapper>
      </Layout>    
  );
};

export default Index;
