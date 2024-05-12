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
  width: calc(100% - 40px);
  position: relative;
  background: var(--bg-color);
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

  border-radius: 8px;

  @media screen and (min-width: 375px) and (max-width: 767px) {
    max-width: 335px;
  }

  @media screen and (min-width: 768px) {
    width: 400px;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 14px;
  top: 14px;
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
  &:hover {
    stroke: var(--bg-button-active);
  }
`;
