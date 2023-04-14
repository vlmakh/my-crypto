import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalWindow = styled.div`
  width: 500px;
  max-height: calc(100vh - 24px);
  overflow-y: clip;
  overflow-x: visible;  

 @media (max-width: 480px) {
    width: 100%;
  }
`;
