import Link from 'next/link'
import Image from 'next/image'
import styled from "styled-components";


const HeaderWrapper = styled.div`
  text-align: lert;
  font-size: 36px;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
 
`


const Header = () => {
  return(
    <HeaderWrapper>
    <Image            
            alt=""
            width={85}
            height={85}
            className="logo" 
            src="/img/logo.png"
          /> 
    </HeaderWrapper>
  )
}

export default Header