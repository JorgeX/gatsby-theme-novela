import addToMailchimp from 'gatsby-plugin-mailchimp';
import React, { useState } from 'react';

import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Subscription: React.FunctionComponent<{}> = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addToMailchimp(email)
      .then((data) => {
        alert(data.result);
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const Modal = styled.div`
  position: relative;
  left: 20px;
  display: flex;
  flex-direction: column;

  max-width: 640px;
  padding: 4rem;
  margin: 0 auto 6rem auto;

  ${mediaqueries.desktop`
    padding: 6rem;
  `}

  ${mediaqueries.tablet`
    padding: 4rem;
  `}

  ${mediaqueries.phablet`
    padding: 2rem;
  `}

  background: rgba(250, 251, 251, 0.75);;
  color: #2a2a2a;

  border-radius: 4px;
  box-shadow: 0 1px 20px 0 rgba(210,214,220,.4);

  h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 2rem;
    font-family: 'Merriweather',Georgia,Serif;
  }

  input {
    color: #2a2a2a;
    width: 70%;
    border: none;
    border-radius: 4px;
    margin-right: 1rem;
  }

  button,
  input {
    padding: 1rem 1.5rem;
  }

  button {
    display: inline-block;

    border: none;
    border-radius: 4px;
    background-color: #41BCBF;
    color: rgba(251,251,251,1);

    transition: all 0.1s linear;

    &:hover {
      cursor: pointer;
      background-color: #15A3A6;
    }
  }

  `

  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
  `;

  return (
    <Modal>
      <form onSubmit={handleSubmit} >
        <h2>Join my email list and get notified about new content</h2>
        <Wrapper>
          <input
            placeholder="Your email address"
            name="email"
            type="text"
            onChange={handleEmailChange}
          />
          <button type="submit">Subscribe now</button>
        </Wrapper>
      </form>
    </Modal>
  );
};

export default Subscription;
