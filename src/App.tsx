import { useEffect, useState } from "react";
import "./App.css";
import useDeviceDetect from "./useDeviceDetect";
// import Pyscript from "./pyscript";

function App() {
  const [devices, setDevices] = useState<any>();
  const [pdaDevice, setPdaDevice] = useState<any>();

  const isWebBluetoothEnabled = () => {
    if (navigator.bluetooth) {
      return true;
    }
    console.log(
      "Web Bluetooth API is not available.\n" +
        'Please make sure the "Experimental Web Platform features" flag is enabled.'
    );
    return false;
  };

  const handleRequestConnectDevice = async () => {
    await navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        // filters: [
        //   {
        //     services: ["device_information"],
        //   },
        //   { namePrefix: "Pho" },
        // ],
      })
      .then((devices) => {
        setDevices(devices);
      });
  };

  const checkConnectToUSB = () => {
    if (!("usb" in navigator)) {
      console.log("WebUSB API is not supported!");
      return false;
    }
    return true;
  };

  const [usbDevice, setusbDevice] = useState<any>();
  const requestDeviceUSB = async () => {
    if (checkConnectToUSB()) {
      try {
        const device = await navigator.usb.requestDevice({ filters: [] });
        setusbDevice(device);
        console.log("usb device", device, device.serialNumber);
      } catch (error) {
        console.log("error usb", error);
      }
    }
  };

  const handleCopy = (message: string) => {
    navigator.clipboard.writeText(message).then(
      () => {
        // invoked if the data is copied
        alert(`${usbDevice?.serialNumber}`);
      },
      () => {
        // handle data copy error
        alert("Copying failed");
      }
    );
  };

  const isTouchDevice = useDeviceDetect();

  const getMediaDevice2 = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          console.log(
            `Device 2 ${device.kind}: ${device.label} id = ${device.deviceId}`
          );
        });
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  };

  useEffect(() => {
    if (isTouchDevice) {
      getMediaDevice2();

      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then(() => {
          return navigator.mediaDevices.enumerateDevices();
        })
        .then((devices) => {
          // const audioDevices = devices.filter(
          //   (device) => device.kind === "audioinput"
          // );
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // console.log("Audio Devices:");
          // audioDevices.forEach((device) => {
          //   setPdaDevice({ ...pdaDevice, audioDevice: device });
          //   console.log("Device ID:", device.deviceId);
          //   console.log("Device Label:", device.label);
          // });

          console.log("Video Devices:");
          videoDevices.forEach((device) => {
            setPdaDevice(device);
            console.log("Device ID:", device.deviceId);
            console.log("Device Label:", device.label);
          });
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }
  }, [isTouchDevice]);
  console.log("isTouchDevice", pdaDevice, isTouchDevice);

  return (
    <div className="App">
      <button
        style={{
          background: "blue",
          padding: "15px",
          color: "white",
          marginTop: 10,
          borderRadius: 12,
          outline: "none",
          cursor: "pointer",
          border: "none",
          margin: 30,
        }}
        onClick={() => {
          requestDeviceUSB();
        }}
      >
        Get device's infor
      </button>

      {usbDevice && (
        <div
          style={{
            textAlign: "left",
            padding: 20,
            border: "1px solid gray",
            wordWrap: "break-word",
          }}
        >
          <h5>
            Serial number of device: {usbDevice?.serialNumber}{" "}
            <span
              onClick={() => handleCopy(usbDevice?.serialNumber)}
              style={{ color: "blue" }}
            >
              copy
            </span>
          </h5>
          <h5>Manufacturer Name: {usbDevice?.manufacturerName}</h5>
          <h5>Product Name: {usbDevice?.productName}</h5>
          <h5>Serial Number: {usbDevice?.serialNumber}</h5>
        </div>
      )}

      {isTouchDevice && (
        <div
          style={{
            textAlign: "left",
            padding: 20,
            border: "1px solid gray",
            wordWrap: "break-word",
          }}
        >
          <h5>PDA Device</h5>
          <h5>Device ID: {pdaDevice?.deviceId}</h5>
          <h5>Device Name: {pdaDevice?.label}</h5>
        </div>
      )}
    </div>
  );
}

export default App;
