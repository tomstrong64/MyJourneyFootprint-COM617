export const proxyRequest = async (req, res) => {
  console.log(req.body);
  const query = req.body.query;
  const response = await fetch('http://com617-hasura:8080/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  console.log(data);
  return res.status(response.status).json(data);
};
