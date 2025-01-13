# Email Parser API

## Description

This API, developed with [NestJS](https://nestjs.com/), allows parsing emails to extract structured information. It uses the `mailparser` library to decompose emails and provides endpoints to upload, analyze, and retrieve data from emails in structured formats.

## Important Libraries

- **NestJS**: A framework for building scalable server-side applications.
- **Mailparser**: A library for parsing email messages.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Class-validator**: A library for validation using TypeScript decorators.
- **Class-transformer**: A library for transforming plain objects into class instances using decorators.

## Project Structure

```plaintext
email-parser-api-nest/
├── src/
│   ├── app.module.ts          # Root module of the application
│   ├── main.ts                # Entry point of the application
│   ├── email-parser/
│   │   ├── email-parser.module.ts     # Module for email parsing
│   │   ├── email-parser.controller.ts # Controller for email parsing endpoints
│   │   ├── email-parser.service.ts    # Service with the business logic for email parsing
│   ├── records/
│   │   ├── records.module.ts          # Module for handling records
│   │   ├── records.controller.ts      # Controller for records endpoints
│   │   ├── records.service.ts         # Service with the business logic for records
│   ├── common/
│   │   ├── utils/
│   │   │   ├── file.ts                # Utility functions for file handling
│   │   │   ├── url.ts                 # Utility functions for URL handling
│   │   ├── pipes/
│   │       └── url-eml-validation.pipe.ts # Custom validation pipe for URLs and EML files
├── test/
│   ├── app.e2e-spec.ts       # End-to-end tests
│   └── jest-e2e.json         # Jest configuration for e2e tests
├── .env.template             # Template for environment variables
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── nest-cli.json             # Nest CLI configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## APIs

### 1. Parse Email by URL

**GET** `/email-parser`

- **Description**: Parses an email from a given URL or local file path.
- **Query Parameters**:
  - `url` (string): The URL or local file path of the email to be parsed.
- **Response**:
  - **Success**: Returns the parsed JSON data from the email.
  - **Error**: Returns an error message if the email could not be parsed.

### 2. Transform Record

**POST** `/records`

- **Description**: Transforms a record input into a structured output.
- **Request Body**:
  - `input` (Record): The input record to be transformed.
- **Response**:
  - **Success**: Returns the transformed record data.
  - **Error**: Returns an error message if the record could not be transformed.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/iKronyck/email-parser-api-nest.git
   cd email-parser-api-nest
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Rename the `.env.template` file to `.env` and configure the variables as needed.

4. **Start the application**:

   - **Development**:

     ```bash
     npm run start:dev
     ```

   - **Production**:

     ```bash
     npm run build
     npm run start:prod
     ```

## GitHub Workflow

This project uses GitHub Actions for continuous integration. The workflow is defined in [`.github/workflows/pr-linter.yml`](.github/workflows/pr-linter.yml) and runs on every pull request to ensure code quality by running ESLint.

## Commitlint

This project uses `commitlint` to enforce conventional commit messages. The configuration is defined in [`.commitlintrc`](.commitlintrc). The commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Example Commit Message

```
feat(email-parser): add support for parsing email attachments
```

## License

This project is licensed under the MIT License.
