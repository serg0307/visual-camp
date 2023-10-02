export interface RegisterRequestInterface {
  name: RegisterFieldValue[];
  pass: RegisterFieldValue[];
  mail: RegisterFieldValue[];
}

export interface RegisterFieldValue {
  value: string;
}
