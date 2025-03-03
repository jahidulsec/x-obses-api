import { app } from "./app";

const PORT = 4000;

app.listen(4000, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`),
);
