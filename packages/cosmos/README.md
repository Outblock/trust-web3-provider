# Trust Web3 Provider

```

//   __   __   __         __   __
//  /  ` /  \ /__`  |\/| /  \ /__`
//  \__, \__/ .__/  |  | \__/ .__/
//

```

### Cosmos JavaScript Provider Implementation

### Config Object

```typescript
const config: {
  disableMobileAdapter?: boolean;
  isKeplr?: boolean;
  isFlowWallet?: boolean;
} = {};
```

### Usage

```typescript
const cosmos = new CosmosProvider(config);
```
