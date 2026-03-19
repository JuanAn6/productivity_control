import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route("", "routes/_layout.tsx", [
    route("home", "routes/home.tsx"),
    route("reservas", "routes/reservas.tsx"),
    route("tabla", "routes/tabla.tsx"),
    route("cards", "routes/cards.tsx"),
    route("calendario", "routes/calendario.tsx"),
    route("notion", "routes/notion.tsx"),
  ]),
] satisfies RouteConfig
