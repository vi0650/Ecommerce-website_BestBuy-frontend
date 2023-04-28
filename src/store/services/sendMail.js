import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mailService = createApi({
  reducerPath: "mail",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://better-ring-toad.cyclic.app/api/",
  }),
  endpoints: (builder) => {
    return {
      mailsend: builder.mutation({
        query: (email) => {
          return {
            url: "sendmail",
            method: "POST",
            body: email,
          };
        },
      }),
    };
  },
});
export const { useMailsendMutation } = mailService;
export default mailService;
