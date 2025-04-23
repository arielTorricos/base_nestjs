export interface IPackageJson {
  name: string;
  version: string;
  description: string;
  author: string;
  contact: {
    name: string;
    url: string;
    email: string;
  };
  license: string;
}

export interface UserPayload {
  id: number,
  nombres: string,
  primerApellido: string,
  segundoApellido: string,
  celular: string,
  userName: string,
  iat: number,
  exp: number,
}