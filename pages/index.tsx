// /pages/index.tsx
import { gql, useQuery } from '@apollo/client';
import { Container, Card, Grid, Text } from '@nextui-org/react';
import { IDevice } from 'local-devices';

const AllWifiDevices = gql`
  query {
    wifiDevices {
      ip
      name
      mac
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(AllWifiDevices);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Container>
      <Grid.Container gap={2}>
        {data.wifiDevices.map((wifiDevice: IDevice) => (
          <Grid xs={6} key={wifiDevice.ip}>
            <Card css={{ mw: '400px' }} variant="bordered">
              <Card.Header>
                <Text b>{wifiDevice.name}</Text>
              </Card.Header>

              <Card.Divider />

              <Card.Body>
                <Text>{wifiDevice.ip}</Text>
                <Text>{wifiDevice.mac}</Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}
