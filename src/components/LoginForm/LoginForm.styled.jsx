import styled from '@emotion/styled';

export const LoginBox = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    

    width: 200px;
    height: 100%;
    background-color: aqua;

    transform: translateX(${p => p.show});

    transition: transform 300ms ease-in;
`;
