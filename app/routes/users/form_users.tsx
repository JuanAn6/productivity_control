import { useEffect, useMemo, useState, type ChangeEvent, type SubmitEvent } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"

import { formatRoleLabel, getInitialUserFormValues, getMockUserById, roleOptions, type UserFormValues } from "./users.data"

type SaveUserPayload = UserFormValues & {
  id: string | null
}

async function saveUser(payload: SaveUserPayload) {
  console.log("save user request", payload)
  return { ok: true }
}

export default function UserForm() {
  const navigate = useNavigate()
  const { id = "new" } = useParams()
  const isNewUser = id === "new"

  const currentUser = useMemo(() => {
    return isNewUser ? null : getMockUserById(id)
  }, [id, isNewUser])

  const [formValues, setFormValues] = useState<UserFormValues>(() =>
    getInitialUserFormValues(currentUser)
  )
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setFormValues(getInitialUserFormValues(currentUser))
  }, [currentUser])

  const handleChange =
    (field: keyof UserFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }))
    }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    setIsSaving(true)

    await saveUser({
      id: isNewUser ? null : id,
      ...formValues,
    })

    setIsSaving(false)
    navigate("/users/list")
  }

  if (!isNewUser && !currentUser) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>User not found</CardTitle>
            <CardDescription>
              The selected user does not exist in the current mock data.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to="/users/list">
              <Button variant="outline" size="sm">
                <ArrowLeft className="size-4" />
                Back to users
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            {isNewUser ? "Create user" : "Edit user"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isNewUser
              ? "Fill in the form to create a new user."
              : "Update the selected user information."}
          </p>
        </div>

        <Link to="/users/list">
          <Button variant="outline" size="sm">
            <ArrowLeft className="size-4" />
            Back to users
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isNewUser ? "User details" : `User #${id}`}</CardTitle>
          <CardDescription>
            This form currently uses a placeholder save function for the final
            persistence step.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="john.doe"
                required
                value={formValues.username}
                onChange={handleChange("username")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={formValues.email}
                onChange={handleChange("email")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="firstName">Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                required
                value={formValues.firstName}
                onChange={handleChange("firstName")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                required
                value={formValues.lastName}
                onChange={handleChange("lastName")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={
                  isNewUser
                    ? "Create a password"
                    : "Leave blank to keep the current password"
                }
                required={isNewUser}
                value={formValues.password}
                onChange={handleChange("password")}
              />
              {!isNewUser ? (
                <p className="text-xs text-muted-foreground">
                  Leave this field empty if you do not want to change the
                  password.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formValues.role}
                onValueChange={(value) =>
                  setFormValues((currentValues) => ({
                    ...currentValues,
                    role: value as UserFormValues["role"],
                  }))
                }
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {formatRoleLabel(role)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button asChild variant="outline">
              <Link to="/users/list">Cancel</Link>
            </Button>
            <Button disabled={isSaving} type="submit">
              <Save className="size-4" />
              {isSaving ? "Saving..." : "Save user"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
