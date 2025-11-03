import React from 'react';
import styled from 'styled-components';

const Button = ({ title, ...props }) => {
  return (
    <StyledWrapper>
      <button {...props}>
        <span className="transition" />
        <span className="gradient" />
        <span className="label">{title}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    font-size: 0.9rem;
    padding: 1em 2.7em;
    font-weight: 500;
    margin-top: 5px;
    background: #002E5D;
    color: white;
    border: none;
    position: relative;
    overflow: hidden;
    border-radius: 0.6em;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }
  .label {
    position: relative;
    top: -1px;
  }

  .transition {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-duration: 500ms;
    border-radius: 9999px;
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  button:hover .transition {
    width: 14em;
    height: 14em;
  }

  button:active {
    transform: scale(0.97);
  }`;

export default Button;
