import { useRouteError } from 'react-router-dom';

const NotFound = () => {
  interface NotFoundMsg {
    statusText: string;
    status: number;
    data: string;
  }
  const error: NotFoundMsg = useRouteError();

  return (
    <div>
      <h2>{error.statusText}</h2>
      <h3>{error.status}</h3>
      <h4>{error.data}</h4>
    </div>
  );
};

export default NotFound;
