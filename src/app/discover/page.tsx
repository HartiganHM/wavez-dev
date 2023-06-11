'use client';

import { useLazyQuery } from '@apollo/client';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import { IDevice } from 'local-devices';
import { tw } from 'typewind';

import { DeviceType } from 'definitions/types';
import { GET_WIFIF_DEVICES_BY_TYPE } from 'definitions/graphql';
import copy from 'definitions/copy/discover';

import styles from './styles.module.css';

export default function Home() {
  const [getWifiDevicesByType, { data, loading, error }] = useLazyQuery(
    GET_WIFIF_DEVICES_BY_TYPE,
  );

  const handleGetWifiDevices = (type: DeviceType) => {
    getWifiDevicesByType({ variables: { type } });
  };

  const renderWifiDevices = () => (
    <section className={styles.wifiDevicesContainer}>
      {data.wifiDevicesByType.map((wifiDevice: IDevice) => (
        <Card
          className={tw.w_full}
          radius="xl"
          key={wifiDevice.ip}
          isHoverable
          isPressable
          onPress={() => console.log(wifiDevice.ip)}
        >
          <CardHeader>
            <p>{wifiDevice.name}</p>
          </CardHeader>

          <Divider />

          <CardBody>
            <p>{wifiDevice.ip}</p>
            <p>{wifiDevice.mac}</p>
          </CardBody>
        </Card>
      ))}
    </section>
  );

  const renderWifiLoader = () => (
    <section className={styles.wifiDevicesContainer}>
      <Skeleton className={tw.h_36.w_full.rounded_xl} />

      <Skeleton className={tw.h_36.w_full.rounded_xl} />
    </section>
  );

  return (
    <main className={styles.wifiContainer}>
      <h2 className={tw.text_4xl.text_center}>{copy.heading}</h2>

      <ButtonGroup size="xl" color="secondary" variant="ghost">
        <Button
          disabled={loading}
          onPress={() => handleGetWifiDevices(DeviceType.NANOLEAF)}
        >
          {copy.nanoleafButtonValue}
        </Button>
        <Button
          disabled={loading}
          onPress={() => handleGetWifiDevices(DeviceType.LIFX)}
        >
          {copy.lifxButtonValue}
        </Button>
      </ButtonGroup>

      {loading && renderWifiLoader()}
      {!!data?.wifiDevicesByType.length && renderWifiDevices()}
    </main>
  );
}
