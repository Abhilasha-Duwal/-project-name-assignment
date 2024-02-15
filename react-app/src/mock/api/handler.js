import { rest } from "msw";

export const handlers = [
  // Handler for GET method
  rest.get("http://localhost:3500/tasks", (req, res, ctx) => {
    // successful response
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: "delectus aut autem",
          description: "description",
          completed: true,
        },
        {
          id: 2,
          title: "Your Second Task to be done",
          description: "description",
          completed: false,
        },
        {
          id: 3,
          title: "Your Third Task to be done",
          description: "description",
          completed: false,
        },
      ]),
      ctx.delay(30)
    );
  }),

  // Handler for POST method
  rest.post("http://localhost:3500/tasks", async (req, res, ctx) => {
    const { title, description } = await req.json();
    // Return a successful response with the newly created task
    return res(
      ctx.status(201), // 201 Created status code
      ctx.json({
        id: 1,
        title: title,
        description: description,
        completed: false,
      })
    );
  }),

  // Handler for PATCH method (Partial Update)
  rest.patch("http://localhost:3500/tasks/:id", async (req, res, ctx) => {
    const { id, title, description, completed } = await req.json();

    // Return a successful response with the updated task data
    return res(
      ctx.status(200), // 200 OK status code
      ctx.json({
        id,
        title,
        description,
        completed,
      })
    );
  }),

  // Handler for DELETE method
  rest.delete("http://localhost:3500/tasks/:id", (req, res, ctx) => {
    const { id } = req.params;

    // Return a successful response
    return res(
      ctx.status(200),
      ctx.json({
        id: id,
      })
    );
  }),
];
