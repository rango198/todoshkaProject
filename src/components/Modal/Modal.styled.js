import styled from "styled-components";

export const StyledBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModalContent = styled.div`
  position: relative;
  background: white;
  max-height: 90vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--light-blue-4);
  }

  scrollbar thumb:hover {
    background-color: var(--dark-blue);
  }

  border-radius: 10px;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 3%;
  top: 3%;
  padding-block: 0;
  padding-inline: 0;
  border: none;
  background: transparent;
`;

export const SvgClose = styled.svg`
  width: 18px;
  height: 18px;
  stroke: var(--color);
  padding-block: 0;
  padding-inline: 0;
`;
