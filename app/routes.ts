import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route("", "routes/_layout.tsx", [
    route("home", "routes/demo/home.tsx"),
    route("reservas", "routes/demo/reservas.tsx"),
    route("tabla", "routes/demo/tabla.tsx"),
    route("cards", "routes/demo/cards.tsx"),
    route("calendario", "routes/demo/calendario.tsx"),
    route("notion", "routes/demo/notion.tsx"),
    route("tasks", "routes/demo/tasks.tsx"),
    route("users/list", "routes/users/list_users.tsx"),
  ]),
] satisfies RouteConfig
