import * as React from 'react';
import { ProfileDetail } from '../components/common';

export interface SWRPageProps {}

function SWRPage(props: SWRPageProps) {
  const [number, setNumber] = React.useState(3);

  const handleAddClick = () => {
    setNumber(prevNum => prevNum + 1);
  };

  return (
    <div>
      <h1>SWR Page</h1>
      <button onClick={handleAddClick}>Add detail</button>

      <ul>
        {Array.from(Array(number).keys()).map(value => (
          <li key={value}>
            <ProfileDetail userId="lea2aa9l7x3a5v2" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SWRPage;
