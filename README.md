# react-native-modal-queue

Small wrapper so that Modals are queued up. Helps with an issue on react-native IOS that stops the second modal appearing

```
npm i -s react-native-modal-queue
```

```
import Modal, {QueueProvider} from 'react-native-modal-queue';


export default () => 
  <QueueProvider>
    <Modal isVisible={true} />  // <-- This modal will show as it's registered first
    <Modal isVisible={true} />  // <-- This modal will not be visible until the first one is hidden.
  </QueueProvider>

```
