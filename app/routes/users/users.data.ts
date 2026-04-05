export type UserRole =
  | "superadmin"
  | "admin"
  | "teacher"
  | "parent"
  | "student"
  | "user"

export type UserRecord = {
  id: string
  profile: string | null
  username: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

export type UserFormValues = {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
}

export const roleOptions: UserRole[] = [
  "superadmin",
  "admin",
  "teacher",
  "parent",
  "student",
  "user",
]

export const mockUsers: UserRecord[] = [
  {
    id: "1",
    profile: null,
    username: "jgarcia",
    firstName: "Juan",
    lastName: "Garcia",
    email: "juan.garcia@example.com",
    role: "superadmin",
  },
  {
    id: "2",
    profile: null,
    username: "amartinez",
    firstName: "Ana",
    lastName: "Martinez",
    email: "ana.martinez@example.com",
    role: "admin",
  },
  {
    id: "3",
    profile: null,
    username: "clopez",
    firstName: "Carlos",
    lastName: "Lopez",
    email: "carlos.lopez@example.com",
    role: "teacher",
  },
  {
    id: "4",
    profile: null,
    username: "lsanchez",
    firstName: "Lucia",
    lastName: "Sanchez",
    email: "lucia.sanchez@example.com",
    role: "parent",
  },
  {
    id: "5",
    profile: null,
    username: "dperez",
    firstName: "David",
    lastName: "Perez",
    email: "david.perez@example.com",
    role: "student",
  },
  {
    id: "6",
    profile: null,
    username: "mgomez",
    firstName: "Marta",
    lastName: "Gomez",
    email: "marta.gomez@example.com",
    role: "user",
  },
  {
    id: "7",
    profile: null,
    username: "lfernandez",
    firstName: "Luis",
    lastName: "Fernandez",
    email: "luis.fernandez@example.com",
    role: "teacher",
  },
  {
    id: "8",
    profile: null,
    username: "eruiz",
    firstName: "Elena",
    lastName: "Ruiz",
    email: "elena.ruiz@example.com",
    role: "parent",
  },
  {
    id: "9",
    profile: null,
    username: "jdiaz",
    firstName: "Jorge",
    lastName: "Diaz",
    email: "jorge.diaz@example.com",
    role: "student",
  },
  {
    id: "10",
    profile: null,
    username: "lmoreno",
    firstName: "Laura",
    lastName: "Moreno",
    email: "laura.moreno@example.com",
    role: "admin",
  },
  {
    id: "11",
    profile: null,
    username: "pmunoz",
    firstName: "Pablo",
    lastName: "Munoz",
    email: "pablo.munoz@example.com",
    role: "teacher",
  },
  {
    id: "12",
    profile: null,
    username: "salvarez",
    firstName: "Sara",
    lastName: "Alvarez",
    email: "sara.alvarez@example.com",
    role: "parent",
  },
  {
    id: "13",
    profile: null,
    username: "dromero",
    firstName: "Diego",
    lastName: "Romero",
    email: "diego.romero@example.com",
    role: "student",
  },
  {
    id: "14",
    profile: null,
    username: "calonso",
    firstName: "Carmen",
    lastName: "Alonso",
    email: "carmen.alonso@example.com",
    role: "user",
  },
  {
    id: "15",
    profile: null,
    username: "rnavarro",
    firstName: "Raul",
    lastName: "Navarro",
    email: "raul.navarro@example.com",
    role: "admin",
  },
  {
    id: "16",
    profile: null,
    username: "ptorres",
    firstName: "Paula",
    lastName: "Torres",
    email: "paula.torres@example.com",
    role: "teacher",
  },
  {
    id: "17",
    profile: null,
    username: "idominguez",
    firstName: "Ivan",
    lastName: "Dominguez",
    email: "ivan.dominguez@example.com",
    role: "parent",
  },
  {
    id: "18",
    profile: null,
    username: "nvazquez",
    firstName: "Natalia",
    lastName: "Vazquez",
    email: "natalia.vazquez@example.com",
    role: "student",
  },
  {
    id: "19",
    profile: null,
    username: "hramos",
    firstName: "Hugo",
    lastName: "Ramos",
    email: "hugo.ramos@example.com",
    role: "user",
  },
  {
    id: "20",
    profile: null,
    username: "cgil",
    firstName: "Claudia",
    lastName: "Gil",
    email: "claudia.gil@example.com",
    role: "teacher",
  },
]

export function getMockUserById(id: string) {
  return mockUsers.find((user) => user.id === id) ?? null
}

export function getInitialUserFormValues(
  user?: UserRecord | null
): UserFormValues {
  return {
    username: user?.username ?? "",
    email: user?.email ?? "",
    password: "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    role: user?.role ?? "user",
  }
}

export function formatRoleLabel(role: UserRole) {
  return role === "superadmin"
    ? "Superadmin"
    : role.charAt(0).toUpperCase() + role.slice(1)
}
