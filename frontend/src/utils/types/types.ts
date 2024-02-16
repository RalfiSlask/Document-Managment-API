export interface ICreateAccountFormInputValues {
  name: string;
  email: string;
  password: string;
}

export interface ILoginFormInputValues {
  email: string;
  password: string;
}

export interface INewDocumentFormInputValues {
  title: string;
  description: string;
  content: string;
}

export interface IDocumentObjectType {
  content: string;
  createData: Date;
  deleted: number;
  description: string;
  document_id: number;
  title: string;
  user_id: number;
}

export interface ISectionsOpenType {
  start: boolean;
  create: boolean;
  wysiwyg: boolean;
}
