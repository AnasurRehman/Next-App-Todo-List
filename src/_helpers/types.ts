export interface TodosProps {
  id: number;
  todo: string;
  completed: boolean;
  userId: string;
}

export interface GetTodosProps {
  todos: TodosProps[];
  total: number;
  skip: number;
  limit: number;
}

export interface DeleteTodoProps extends TodosProps {
  isDeleted: boolean;
  deletedOn?: string;
}

export interface LoggedInUserProps {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface SignInProps {
  username: string;
  password: string;
}

export interface SignUpProps {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface ListItemProps {
    title: string;
    id: number;
    status: boolean;
  }
  