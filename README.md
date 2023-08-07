# Encryption Module

A simple TypeScript module to encrypt data using a private key and send it to a specified API endpoint.

## Features

- Generates a private key if not already present.
- Encrypts data using the private key.
- Sends encrypted data to a specified API endpoint.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/encryption-module.git
cd encryption-module
```

Install the dependencies:

```bash
npm install
```

## Configuration

Create a `config.json` in the root directory with the following structure:

```json
{
  "privateKeyPath": "./privateKey.pem",
  "apiAccessKey": "YOUR_API_ACCESS_KEY",
  "apiEndpoint": "https://api.example.com/endpoint"
}
```

- `privateKeyPath`: Path to the private key. If the key doesn't exist, one will be generated.
- `apiAccessKey`: Access key for the API.
- `apiEndpoint`: API endpoint to send encrypted data.

## Usage

To use this module in another application:

```typescript
import EncryptionModule from './path-to-encryption-module';

const module = new EncryptionModule('./config.json');
module.encryptAndSend('Hello, World!', 'YOUR_EXTERNAL_ID')
    .then(refrenceId => {
        console.log('Received refrenceId:', refrenceId);
    })
    .catch(error => {
        console.error('Failed to send data:', error);
    });
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
