export class TokenBoundaryError extends Error {
  constructor(message, stack?: string) {
    super(message);
    this.stack = stack;
    this.name = "TokenBoundaryError";
  }
}

export class ContractError extends Error {
  constructor(message: string, stack?: string) {
    super(message);
    this.name = "ContractError";
    this.stack = stack;
  }
}

export class UploadError extends Error {
  constructor(message: string, stack?: string) {
    super(message);
    this.name = "UploadError";
    this.stack = stack;
  }
}

export class FileNotExistError extends Error {
  constructor(message: string, stack?: string) {
    super(message);
    this.name = "FileNotExistError";
    this.stack = stack;
  }
}
