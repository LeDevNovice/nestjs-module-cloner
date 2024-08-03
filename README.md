# Nestjs Module Cloner

A command-line tool for cloning and renaming NestJS modules and their associated resources. This tool helps streamline the development process by automating the copying and renaming of modules, resources, and their references within a NestJS project.

## Table of Contents

- [Nestjs Module Cloner](#nestjs-module-cloner)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)

## Features

- Clone existing NestJS modules and their resources.
- Automatically rename files and update references.
- Recursively handles nested directories and files.
- Simple command-line interface.

## Installation

To install the package, run the following command:

```bash
npm install nestjs-module-cloner -g
```

## Usage

To use the tool, navigate to the root of your NestJS project in the terminal and run the following command:

```bash
nmc <sourceModule> <sourceResourceName> <newModule> <newResourceName>
```

- <sourceModule>: The name of the existing module you want to clone.
- <sourceResourceName>: The name of the resource you want to rename.
- <newModule>: The name for the new module being created.
- <newResourceName>: The new name for the resource.

```bash
nmc products product articles article
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch.
- Make your changes and commit them.
- Push to the branch.
- Open a pull request on the develop branch.
