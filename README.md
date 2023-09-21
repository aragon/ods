![Aragon](https://res.cloudinary.com/duvrxe0m9/image/upload/v1686656588/aragon-sdk_tjosse.png)

<p align="center">
  <a href="https://aragon.org/">Aragon website</a>
  •
  <a href="https://devs.aragon.org/">Developer Portal</a>
  •
  <a href="http://eepurl.com/icA7oj">Join our Developer Community</a>
  •
  <a href="https://aragonproject.typeform.com/dx-contribution">Contribute</a>
</p>

<br/>

# Aragon ODS test

Aragon Open Design System (Aragon ODS) is an open source and human-centric design system specifically designed for the Aragon App.
It provides a unified and easy-to-use framework for creating visually consistent and engaging interfaces that prioritize
user experience throughout the Aragon ecosystem. Aragon ODS is currently in alpha version, with documentation updates planned for Q2.
The developed components are expected to be available in the coming months.

## Installation

Install the `@aragon/ods` library and using yarn or npm:

Yarn:

```shell
yarn add @aragon/ods
```

Npm:

```shell
npm install @aragon/ods
```

## Usage

Import the `@aragon/ods` library on your application and use the components:

```typescript
import React from 'react';
import { Tag } from '@aragon/ods';

export default function App() {
    return (
        <div>
            <Tag colorScheme="primary">My label</Tag>
        </div>
    );
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GPL-V3](./LICENSE)
