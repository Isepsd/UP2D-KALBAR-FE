import styled from 'styled-components';
import scadaroom from './scadaroom.jpeg'
const LoginFormContainer = styled.div`
  height: 100vh;
  background: 
    linear-gradient(
      135deg,
    rgba(0, 128, 128, 0.9),
     rgba(204, 153, 0, 0.9)
    ),
    url(${scadaroom});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    border-radius: 5px !important;
    border: 1px solid #ccc;
    transition: all 0.3s ease-in-out;

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 5px var(--primary);
      outline: none;
    }
  }
`;



const LoginWrapper = styled.div`
  background: linear-gradient(
    135deg,
    rgba(247, 231, 104, 0.7),
    rgba(45, 137, 255, 0.7)
  );
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 380px;
  padding: 2rem;
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px); 
`;


const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const WelcomeText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const LoginIntroText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
`;

const LabelForm = styled.label`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #aaa;
`;

const AppName = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
`;

export {
  LoginForm,
  LoginFormContainer,
  LoginIntroText,
  LoginWrapper,
  WelcomeText,
  InputIcon,
  LabelForm,
  AppName,
};
