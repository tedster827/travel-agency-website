# Travel Agency Website

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The Tech Stack is as Follows
- Next.JS (Server-side Rendering SSR)
  - https://nextjs.org/
- React.JS
  - https://reactjs.org/docs/getting-started.html
- Typescript (Type Enforcement!)
  - https://www.typescriptlang.org/docs/handbook/intro.html
- AWS Amplify (Cloud Resource Management and Deployment for mobile and web applications)
  - [AWS Amplify Docs](https://docs.aws.amazon.com/amplify/index.html)
- GraphQL (Query Language For APIs)
  - https://graphql.org/learn/
- Jest (JS Testing Framework)
  - https://jestjs.io/docs/en/getting-started
- React Testing Library (Testing React Components and user interactions)
  - https://testing-library.com/docs/react-testing-library/intro/
- Tailwinds CSS (Utility-First CSS Framework for rapid UI development)
  - https://tailwindcss.com/docs

## Getting Started (Local Testing)

### Prerequisites

- Node.js
- npm or yarn (This README Follows npm)

Clone the repository (Via GitHub SSH):
 ```bash
 git clone git@github.com:tedster827/travel-agency-website.git
````
⚠️ Note! Pushing to the repository will trigger a rebuild of the development (main) and feature Hosting and Backend 
environments (More on this under deployment)

First, install the needed project dependencies handled by Node Package Manager (NPM) using the Continuous 
Integration (CI) command so npm installs to version locked package-lock.json
```bash
npm ci
```

Next, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Testing (TODO)

```bash
npm test
```

# Contributing

Contributions to this project are welcome and appreciated. Here are the guidelines for contributing:

## Commit Message Convention

When committing changes, please follow this commit message format:

`<type>(<scope>): <subject>`

- **Type**: Type of change (e.g., feat, fix, docs, style, refactor, test, chore)

  - feat: A new feature for the user, not a new feature for a build script.
  - fix: A bug fix for the user, not a fix to a build script.
  - docs: Changes to the documentation.
  - style: Formatting, missing semi-colons, etc.; no production code change.
  - refactor: Refactoring production code, e.g., renaming a variable.
  - test: Adding missing tests, refactoring tests; no production code change.
  - chore: Updating build tasks, package manager configs, etc.; no production code change.
- **Scope**: A brief scope or context of the change (optional)
- **Subject**: A succinct description of the change

Example:
`feat(header): add responsive navigation`


### Steps to Contribute

1. **Fork the Repository**: Create a fork of this repository.
2. **Create a Feature Branch**: `git checkout -b feature/YourFeature`
3. **Make Your Changes**: Add your changes to the branch.
4. **Commit Your Changes**: Follow the commit message convention.
5. **Push to Your Fork**: `git push origin feature/YourFeature`
6. **Open a Pull Request**: Go to the original repository and open a pull request from your feature branch.

### Code Review

- Pull requests will be reviewed by maintainers and feedback may be given.
- After approval, changes will be merged into the main branch.

We thank you for your contributions and look forward to seeing your ideas and improvements!

# Deployment on AWS Amplify

## Managing AWS Credentials

### Setting Up AWS Credentials

To deploy and manage resources on AWS Amplify, you need to set up AWS credentials. This involves configuring access keys which allow your local environment to communicate with AWS services.

### Steps to Configure AWS Credentials (Ask Tedster for your credentials)

1. **Create an IAM User:**
   - Log in to the AWS Management Console.
   - Go to the IAM (Identity and Access Management) service.
   - Create a new IAM user with programmatic access and assign the necessary permissions.

2. **Configure Access Keys:**
   - After creating the IAM user, you will receive an Access Key ID and Secret Access Key.
   - Install the AWS CLI tool and run `aws configure` to set up your access keys.

3. **Using AWS Credentials with Amplify:**
   - When setting up or managing AWS Amplify from the command line, it will use these credentials to authenticate your requests.

### Security Considerations

- **Never commit your AWS access keys to your Git repository.**
- **Use IAM roles and policies to restrict access to the minimum required permissions.**
- **Regularly rotate your access keys and monitor IAM user activity.**

For detailed instructions and best practices, refer to the [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).


## AWS Amplify Setup and Deployment

- This project is configured for deployment on AWS Amplify, which automates the deployment process and provides a scalable cloud environment.
- ⚠️ NOTE! Every push to the repository triggers an CI/CD action that will rebuild the hosted/backend environment on 
  AWS Amplify for the main (development environment) and feature environments. 

### ⚠️ Workaround for Node.js Version

- Due to a specific requirement for Node.js version 18.2.0, we used a custom image in the AWS Amplify build settings.
- The build settings were configured to use `public.ecr.aws/t7o4u3y2/node-18.2.0:latest` as the custom image. 
  - `This 
    configuration is updated via the AWS console
    under AWS Amplify > App Settings > Build settings > Build image settings > Edit Build image`
- This workaround ensured compatibility with the project’s Node.js version requirements and resolved issues related to GLIBC incompatibility.

### Deployment Steps

1. Assess you local AWS Amplify Environment
```bash
amplify status
```
2. Open a Pull Request with Github
(TODO npm pr)
3. Push the code to your GitHub repository linked with AWS Amplify. Following the source control convention!
3. AWS Amplify automatically detects the push and starts the build and deployment process.
4. Monitor the deployment process in the AWS Amplify console.

Ensure that your AWS Amplify project settings are correctly configured to use the specified custom image for a successful deployment.

## Known Issues

Issue: AWS Amplify Node.JS Version Mismatch
- Refer to Workaround for Node.js Version above

Issue: Webpack Cache Error in Next.js

Description:
The warning [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT: no such file or directory indicates a problem with the webpack cache in a Next.js project. This typically occurs when the system attempts to access a cache file (like 0.pack.gz) that is either missing or inaccessible in the designated directory.

Steps to Troubleshoot & Resolve:

Clearing the Webpack Cache
a. Delete the .next Folder:
Stop the Development Server: Ensure that your development server is not running.
Delete the .next Directory: Locate and remove the .next directory in your project. This directory contains Next.js build files, including the webpack cache.
Restart the Development Server: Use npm run dev or yarn dev to restart your development server. This process will rebuild the necessary files, including a fresh webpack cache.

## Versioning

### Current Version
- **0.0.1**

### Version History
- **0.0.1** (Date: 2023-11-17)
  - Initial development release with the first successful deployments to AWS Amplify and construction of the README
