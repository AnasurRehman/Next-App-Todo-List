import api from "@/lib/store/api";

export const TodoService = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTodos: build.query<any, any>({
      query: () => ({
        url: "todos",
        method: "GET",
      }),
      providesTags: ["TODOS"],
    }),
    createTodo: build.mutation<any, any>({
      query: (body) => ({
        url: "todos/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      invalidatesTags: ["TODOS"],
    }),
    updateTodo: build.mutation<any, any>({
      query: ({ todoId, body }) => ({
        url: `todos/${todoId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      invalidatesTags: ["TODOS"],
    }),
    deleteTodo: build.mutation<any, any>({
      query: (todoId) => ({
        url: `todos/${todoId}`,
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
