export interface ResData<T> {
  results: T[];
  info: { seed: string; results: number; page: number; version: string };
}

export interface ResUser {
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  profileUrl: string;
}
