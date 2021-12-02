export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AcademicSubject = {
  __typename?: 'AcademicSubject';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  subSubjects?: Maybe<Array<Maybe<SubSubject>>>;
  title: Scalars['String'];
};

export type AcademicSubjectInput = {
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAcademicSubject: AcademicSubject;
  createNewSubSubject: SubSubject;
  createNewTask: Task;
  createNewUser: User;
  deleteSubSubject?: Maybe<Result>;
  editSubSubject?: Maybe<Result>;
};


export type MutationCreateAcademicSubjectArgs = {
  data: AcademicSubjectInput;
};


export type MutationCreateNewSubSubjectArgs = {
  data: SubSubjectInput;
};


export type MutationCreateNewTaskArgs = {
  data: TaskInput;
};


export type MutationCreateNewUserArgs = {
  data?: InputMaybe<UserInput>;
};


export type MutationDeleteSubSubjectArgs = {
  id: Scalars['ID'];
};


export type MutationEditSubSubjectArgs = {
  data: SubSubjectInput;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  academicSubject?: Maybe<AcademicSubject>;
  academicSubjects?: Maybe<Array<AcademicSubject>>;
  getUserInfo?: Maybe<User>;
  subSubjects?: Maybe<Array<SubSubject>>;
  taskInfo?: Maybe<Task>;
};


export type QueryAcademicSubjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserInfoArgs = {
  id: Scalars['ID'];
};


export type QuerySubSubjectsArgs = {
  parentID: Scalars['ID'];
};


export type QueryTaskInfoArgs = {
  id: Scalars['ID'];
};

export type Result = {
  __typename?: 'Result';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type SubSubject = {
  __typename?: 'SubSubject';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  parentID?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type SubSubjectInput = {
  description?: InputMaybe<Scalars['String']>;
  parentID: Scalars['ID'];
  title: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  academicSubject?: Maybe<AcademicSubject>;
  createdAt: Scalars['String'];
  creatorID?: Maybe<User>;
  description: Scalars['String'];
  files?: Maybe<Array<Maybe<Scalars['String']>>>;
  taskExecutor?: Maybe<User>;
  taskStatus: Scalars['String'];
  title: Scalars['String'];
  toDate: Scalars['Int'];
};

export type TaskInput = {
  academicSubject?: InputMaybe<Scalars['ID']>;
  description: Scalars['String'];
  files?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subSubjects?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title: Scalars['String'];
  toDate: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  surname: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  surname: Scalars['String'];
};
