# CBP Design System - React Components

## Example

```javascript
import { CbpApp, CbpButton, defineCustomElements } from '@cbpds/react-components';

defineCustomElements();

function App() {

  return (
    <>
      <CbpApp>
        <CbpButton>Hello</CbpButton>
      </CbpApp>
    </>
  )
}

export default App
```