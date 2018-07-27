import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginText = styled.p`
  padding: 0;
  margin: 0;
  text-align: center;
`;

export const LoginInput = styled.input`
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  background-color: transparent;
  box-shadow: none;
  border: 1px solid #ccc;
`;

export const LoginCard = styled.div`
  background-color: #fff;
  margin: 0 auto 20px;
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  box-shadow: none;
  font-size: 20px;
  cursor: pointer;
`;

export const LoginLogoWrapper = styled.div`
  margin-bottom: 20px;
`;

export const StyledLoginLogo = styled.img`
  width: 100%;
`;

export const LoginHeader = styled.div`
  font-size: 22px;
  margin-bottom: 20px;
`;

export const StyledLoginError = styled.div`
  font-size: 14px;
  margin-top: 20px;
  color: red;
  text-transform: capitalize;
  text-align: center;
`;
