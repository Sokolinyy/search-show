import React from 'react';

interface Props {
  searchResults: string[];
}

const Main = ({ searchResults }: Props) => {
  return (
    <main className="main">
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
