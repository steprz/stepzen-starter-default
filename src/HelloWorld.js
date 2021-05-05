import { gql, useQuery } from "@apollo/client";

const GET_STEPZEN = gql`
  query MyHelloWorldQuery {
    location(ip: "8.8.8.8") {
      city
      weather {
        temp
        units
        feelsLike
        description
      }
    }
  }
`;

const styles = {
  table: {
    borderLeft: "1px solid #ccc",
    borderTop: "1px solid #ccc",
    textAlign: "left",
  },
  tbody: {
    verticalAlign: "top",
  },
  td: {
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    padding: "10px",
  },
  span: {
    padding: "5px 10px",
  },
  link: {
    margin: "30px 0 50px",
  },
};

const StepZenResults = (props) => {
  const { data } = props;
  return (
    <div>
      <table style={styles.table}>
        <tbody style={styles.tbody}>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              {!Array.isArray(data) && (
                <td style={styles.td}>
                  <span>{key}</span>
                </td>
              )}
              {(() => {
                if (data[key] && typeof data[key] === "object") {
                  return (
                    <td style={styles.td}>
                      <StepZenResults data={data[key]} />
                    </td>
                  );
                }
                return (
                  <td style={styles.td}>
                    <span>{data[key]}</span>
                  </td>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function HelloWorld() {
  const { loading, error, data } = useQuery(GET_STEPZEN);

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (loading) return <p>Loading ...</p>;

  return (
    <>
      <a
        className="App-link"
        href="https://stepzen.com"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        Learn StepZen
      </a>
      <pre style={{ textAlign: "left" }}>
        {`{
  location(ip: "8.8.8.8") {
    city
    weather {
      temp
      units
      feelsLike
      description
    }
  }
}`}
      </pre>
      <StepZenResults data={data} />
    </>
  );
}

export default HelloWorld;
