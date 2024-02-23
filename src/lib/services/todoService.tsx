import { DeleteTodoProps, GetTodosProps, TodosProps } from "@/_helpers/types";
import api from "../store/api";

export const TodoService = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTodos: build.query<GetTodosProps, { userId: string }>({
      query: ({ userId }) => ({
        url: `users/${userId}/todos`,
        method: "GET",
      }),
      providesTags: ["TODOS"],
    }),

    createTodo: build.mutation<TodosProps, Omit<TodosProps, "id">>({
      query: (body) => ({
        url: "todos/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      invalidatesTags: ["TODOS"],
    }),
    updateTodo: build.mutation<TodosProps, Omit<TodosProps, "userId">>({
      query: (body) => ({
        url: `todos/${body.id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      invalidatesTags: ["TODOS"],
    }),
    deleteTodo: build.mutation<DeleteTodoProps, number>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TODOS"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = TodoService;
