import styled, { css } from 'styled-components';

export const SmallButtonCss = css`
  background-color: #555;
  line-height: 1;
  font-size: 14px;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;
  margin-right: 5px;
`;

export const SmallButtonCssHover = css`
  background-color: #fff;
  border-color: #555;
  color: #555;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledHeader = styled.div`
  flex: none;
  height: 100px;
  border-bottom: 1px solid #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledBody = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px 0;
`;

export const LogoWrapper = styled.div`
  height: 100px;
`;

export const LoginLogo = styled.img`
  height: 100%;
`;

export const StyledUserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledUser = styled.div`
  font-size: 18px;
  color: #fff;
  margin-right: 20px;
`;

export const StyledLayout = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledLeftSide = styled.div`
  width: 40%;
  flex: none;
  margin-right: 40px;
`;

export const StyledCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const StyledRightSide = styled.div`
  flex: 1;
`;

export const StyledCardHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const StyledLogoutButton = styled.button`
  display: block;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
`;