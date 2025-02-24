import { createServer, Model } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      user: Model, // Define a User model
    },

    seeds(server) {
      // Prepopulate with mock data
      server.create("user", { id: 1, name: "surya", email: "surya@gmail.com" });
      server.create("user", { id: 2, name: "ananya", email: "ananya@gmail.com" });
    },

    routes() {
      this.namespace = "api"; // Prefix for all API calls

      this.get("/users", (schema) => {
        return schema.users.all();
      });

      this.post("/users", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });
    }
  });
}
