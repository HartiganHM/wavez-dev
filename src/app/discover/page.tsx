'use client';

import { useLazyQuery } from '@apollo/client';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from '@nextui-org/react';
import { IDevice } from 'local-devices';
import { tw } from 'typewind';

import { DeviceType } from 'definitions/types';
import { GET_WIFIF_DEVICES_BY_TYPE } from 'definitions/graphql';
import copy from 'definitions/copy/discover';

import styles from './styles.module.css';
import { useState } from 'react';

const defaultDevice = {
  ip: '',
  mac: '',
  name: '',
};

export default function Home() {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [newDeviceName, updateNewDeviceName] = useState<string>('');
  const [shouldSyncPalettes, toggleShouldSyncPalettes] =
    useState<boolean>(true);
  const [selectedDevice, updateSelectedDevice] =
    useState<IDevice>(defaultDevice);
  const [getWifiDevicesByType, { data, loading, error }] = useLazyQuery(
    GET_WIFIF_DEVICES_BY_TYPE,
  );

  const handleGetWifiDevices = (type: DeviceType) => {
    getWifiDevicesByType({ variables: { type } });
  };

  const handleSelectDevice = (device: IDevice) => {
    updateSelectedDevice(device);
    updateNewDeviceName(device.name);
    onOpen();
  };

  const handleCloseModal = () => {
    updateSelectedDevice(defaultDevice);
    updateNewDeviceName('');
    onClose();
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
          onPress={() => handleSelectDevice(wifiDevice)}
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
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          <ModalHeader>{copy.nanoleafModal.header}</ModalHeader>

          <ModalBody>
            <p>{copy.nanoleafModal.body}</p>

            <div className={styles.deviceInfoContainer}>
              <div className={styles.deviceInputContainer}>
                <Input
                  label="Name"
                  value={newDeviceName}
                  onChange={({ target: { value } }) =>
                    updateNewDeviceName(value)
                  }
                />
                <Checkbox
                  defaultSelected
                  color="secondary"
                  isSelected={shouldSyncPalettes}
                  onChange={() => toggleShouldSyncPalettes(!shouldSyncPalettes)}
                >
                  <p className={tw.text_sm}>
                    {copy.nanoleafModal.syncPalettesLabel}
                  </p>
                </Checkbox>
              </div>

              <div className={styles.deviceInputContainer}>
                <Input
                  label="IP Address"
                  isDisabled
                  isReadOnly
                  value={selectedDevice.ip}
                />
                <Input
                  label="MAC Address"
                  isDisabled
                  isReadOnly
                  value={selectedDevice.mac}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="secondary"
              variant="shadow"
              onPress={handleCloseModal}
            >
              {copy.nanoleafModal.connectButtonValue}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
    </>
  );
}
