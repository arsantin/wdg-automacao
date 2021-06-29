import styled from "styled-components";

const IndexWrapper = styled.div`
form{
  background-color: #fff;
  padding: 25px;
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
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
}
`;

export default IndexWrapper;