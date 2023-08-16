function populateBluetoothDevices() {
    const devicesSelect = document.querySelector('#devicesSelect');
    console.log('Getting existing permitted Bluetooth devices...');
    navigator.bluetooth.getDevices()
    .then(devices => {
      console.log("device numbers",devices.length);
      devicesSelect.textContent = '';
      for (const device of devices) {
        const option = document.createElement('option');
        option.value = device.id;
        option.textContent = device.name;
        devicesSelect.appendChild(option);
      }
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }
  

function onRequestBluetoothDeviceButtonClick() {
    log('Requesting any Bluetooth device...');
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    .then(device => {
      console.log("device names", device.name );
      populateBluetoothDevices();
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }

  log = ChromeSamples.log;

  function isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
      return true;
    } else {
      ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
          'Please make sure the "Experimental Web Platform features" flag is enabled.');
      return false;
    }
  }

  if (isWebBluetoothEnabled()) {
    document.querySelector('#requestBluetoothDevice').addEventListener('click', function() {
        onRequestBluetoothDeviceButtonClick();
    });
    document.querySelector('#forgetBluetoothDevice').addEventListener('click', function() {
        onForgetBluetoothDeviceButtonClick();
    });
  }