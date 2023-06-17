'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0/client';
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
import {
  ADD_NEW_NANOLEAF_DEVICE,
  GET_WIFI_DEVICES_BY_TYPE,
} from 'definitions/graphql';
import copy from 'definitions/copy/discover';

import styles from './styles.module.css';

const defaultDevice = {
  ip: '',
  mac: '',
  name: '',
};

export default function Home() {
  const { user, isLoading: loadingUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingUser) {
      router.push('/');
    }
  }, [loadingUser]);

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [newDeviceName, updateNewDeviceName] = useState<string>('');
  const [shouldSyncPalettes, toggleShouldSyncPalettes] =
    useState<boolean>(true);
  const [selectedDevice, updateSelectedDevice] =
    useState<IDevice>(defaultDevice);
  const [
    getWifiDevicesByType,
    { data: wifiDevicesData, loading: loadingDevices, error: wifiDevicesError },
  ] = useLazyQuery(GET_WIFI_DEVICES_BY_TYPE);
  const [
    addNewDevice,
    { data: newDeviceData, loading: loadingNewDevice, error: newDeviceError },
  ] = useMutation(ADD_NEW_NANOLEAF_DEVICE);

  const handleGetWifiDevices = (type: DeviceType) => {
    getWifiDevicesByType({ variables: { type } });
  };

  const handleSelectDevice = (device: IDevice) => {
    updateSelectedDevice(device);
    updateNewDeviceName(device.name);
    onOpen();
  };

  const handleConnectDevice = async () => {
    try {
      const input = {
        name: newDeviceName,
        ip: selectedDevice.ip,
        mac: selectedDevice.mac,
        shouldSyncPalettes,
      };
      const myPromise = addNewDevice({
        variables: {
          input,
        },
      });

      toast.promise(myPromise, {
        pending: `Connecting to ${newDeviceName}`,
        success: `Successfully synced with ${newDeviceName}`,
        error: `Unable to connect: ${newDeviceError?.message}`,
      });

      console.log(newDeviceError);
      console.log(newDeviceData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    updateSelectedDevice(defaultDevice);
    updateNewDeviceName('');
    onClose();
  };

  const renderWifiDevices = () => (
    <section className={styles.wifiDevicesContainer}>
      {wifiDevicesData.wifiDevicesByType.map((wifiDevice: IDevice) => (
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        onClose={handleCloseModal}
      >
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
              onPress={handleConnectDevice}
              isLoading={loadingNewDevice}
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
            disabled={loadingDevices}
            onPress={() => handleGetWifiDevices(DeviceType.NANOLEAF)}
          >
            {copy.nanoleafButtonValue}
          </Button>
          <Button
            disabled={loadingDevices}
            onPress={() => handleGetWifiDevices(DeviceType.LIFX)}
          >
            {copy.lifxButtonValue}
          </Button>
        </ButtonGroup>

        {loadingDevices && renderWifiLoader()}
        {!!wifiDevicesData?.wifiDevicesByType.length && renderWifiDevices()}
      </main>
    </>
  );
}
