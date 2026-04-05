import { Filter, Plus, EllipsisVerticalIcon, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomPagination } from "~/components/pagination";
import { Link } from "react-router"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { formatRoleLabel, mockUsers, type UserRecord } from "./users.data"

export default function UserList() {

  const headers = [
    {title: 'Profile', class: ''},
    {title: 'Name', class: ''},
    {title: 'Email', class: ''},
    {title: 'Role', class: ''},
    {title: 'Actions', class: 'flex justify-center items-center'},
  ];

  const [items, setItems] = useState<UserRecord[]>([])
  const [page, setPage] = useState(1)
  const [itemsXPage, setItemsXPage] = useState(10);

  const statusVariant = (status: string) => {
    if (status === "Paid") return "secondary"
    if (status === "Pending") return "muted"
    return "outline"
  }



  const onPageChange = (newPage: number) => {
    setPage(newPage);
    //TODO:Change this for ajax

    fetchData(newPage);

  };

  const fetchData = (newPage: number) =>{
    let startPage = (newPage-1)*itemsXPage;
    let endPage = startPage+itemsXPage;
    setItems(mockUsers.slice(startPage, endPage));
  }


  useEffect(()=>{ 
    fetchData(1)
  },[]);


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Users list</h2>
          <p className="text-sm text-muted-foreground">
            Example data table using the UI components.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" type="button">
            <Filter className="size-4" />
            Filter
          </Button>
          <Link to="/users/edit/new">
            <Button size="sm" type="button" >
              <Plus className="size-4" />
              New user
            </Button>
          </Link>
        </div>
      </div>

      <Table>
        {/* <TableCaption>Latest orders processed by the team.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {headers.map((head) => (
              <TableHead key={head.title} className={head.class}>{head.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="p-1">
                <Avatar>
                  {row.profile && <AvatarImage src={row.profile} sizes="small"/>}
                  <AvatarFallback>{row.lastName.slice(0,1)}{row.firstName.slice(0,1)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{row.lastName}, {row.firstName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {formatRoleLabel(row.role)}
                </Badge>
              </TableCell>
              <TableCell className="p-1">
                <div className="flex column justify-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon"><EllipsisVerticalIcon/></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <Link to={`/users/edit/${row.id}`}>
                        <DropdownMenuItem>
                          Profile
                          <DropdownMenuShortcut><Pencil className="size-4" /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>More...</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuItem disabled>API</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination 
        itemsLength={mockUsers.length}
        itemsPerPage={itemsXPage}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  )
}
