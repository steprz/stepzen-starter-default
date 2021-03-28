import { gql, useQuery } from '@apollo/client';

const GET_STEPZEN = gql`
  query MyHelloWorldQuery {
    helloWorld {
      message
    }
  }
`;

function HelloWorld() {
  const { loading, error, data } = useQuery(GET_STEPZEN);

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (loading) return <p>Loading ...</p>;

  return (
    <>
      <p>StepZen says: "{data.helloWorld.message}"</p>
      <a
        className="App-link"
        href="https://stepzen.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn StepZen
      </a>
    </>
  );
}

export default HelloWorld;
