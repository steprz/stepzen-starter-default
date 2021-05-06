import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";
import logo from "./light-blue.svg";

const { REACT_APP_STEPZEN_API_KEY, REACT_APP_STEPZEN_URI } = process.env;

const GET_STEPZEN = gql`
	{
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
		marginTop: "20px",
		display: "block",
		marginBottom: "1rem",
	},
	code: {
		padding: "0.8rem",
		overflow: "auto",
		display: "inline-table",
		fontSize: "0.9rem",
		lineHeight: "1.45",
		borderRadius: "0.3rem",
		marginTop: 0,
		marginBottom: "1rem",
		// font: "1rem Consolas", "Liberation Mono", "Menlo, Courier, monospace",
		color: "#567482",
		wordWrap: "normal",
		backgroundColor: "#f3f6fa",
		border: "solid 1px #dce6f0",
	},
	pre: {
		display: "grid",
		textAlign: "left",
	},
	section: {
		backgroundColor: "#ffffff",
		padding: "1rem",
		margin: "1rem",
		borderRadius: "10px",
		color: "#000000",
	},
	codetext: {
		marginTop: 0,
		marginBottom: "1rem",
		textAlign: "left",
	},
};

const StepZenResults = ({ data }) => {
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
	const [data, setData] = useState();

	useEffect(() => {
		(async () => {
			const graphQLClient = new GraphQLClient(REACT_APP_STEPZEN_URI, {
				headers: {
					Authorization: `Apikey ${REACT_APP_STEPZEN_API_KEY}`,
				},
			});
			const result = await graphQLClient.request(GET_STEPZEN);
			setData(result);
		})();
	}, []);

	if (!data) {
		return <p>Loading ...</p>;
	}

	return (
		<section style={styles.section}>
			<img
				style={{
					width: "10%",
					display: "block",
					margin: "0 auto",
					padding: "1rem",
				}}
				src={logo}
				alt="stepzen"
			/>
			<a
				className="App-link"
				href="https://stepzen.com"
				target="_blank"
				rel="noopener noreferrer"
				style={styles.link}
			>
				Learn StepZen
			</a>
			<code style={styles.code}>
				<p style={styles.codetext}>
					Your endpoint found in your .env.local folder
				</p>{" "}
				{REACT_APP_STEPZEN_URI}
			</code>
			<pre style={styles.pre}>
				<code style={styles.code}>
					<p style={styles.codetext}>
						This is the GraphQL query found in ./src/HelloWorld.js
					</p>
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
				</code>
			</pre>
			<pre style={styles.pre}>
				<code style={styles.code}>
					<p>The GraphQL Query above generates the data table below </p>
					<StepZenResults data={data} />
				</code>
			</pre>
		</section>
	);
}

export default HelloWorld;
