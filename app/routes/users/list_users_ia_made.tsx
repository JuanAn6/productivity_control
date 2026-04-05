import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Pencil, Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CustomPagination } from "~/components/pagination"

import { formatRoleLabel, mockUsers, type UserRecord } from "./users.data"

const ITEMS_PER_PAGE = 10

export default function UserList() {
  const [items, setItems] = useState<UserRecord[]>([])
  const [page, setPage] = useState(1)

  const fetchData = (nextPage: number) => {
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE

    setItems(mockUsers.slice(startIndex, endIndex))
  }

  const onPageChange = (nextPage: number) => {
    setPage(nextPage)
    fetchData(nextPage)
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  return (
    <div className="space-y-6">

      <Button asChild>
        <Link to="/users/edit/new">
          <Plus className="size-4" />
          New user
        </Link>
      </Button>
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Full name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="w-14 p-2">
                <Avatar>
                  {user.profile ? (
                    <AvatarImage src={user.profile} alt={user.username} />
                  ) : null}
                  <AvatarFallback>
                    {user.firstName.slice(0, 1)}
                    {user.lastName.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {formatRoleLabel(user.role)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="sm" variant="outline">
                  <Link to={`/users/edit/${user.id}`}>
                    <Pencil className="size-4" />
                    Edit
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination
        itemsLength={mockUsers.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={page}
        onPageChange={onPageChange}
      />
        
    </div>
  )
}
