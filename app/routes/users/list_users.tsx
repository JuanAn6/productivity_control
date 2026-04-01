import { Filter, Icon, Plus, Pencil, EllipsisVerticalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  
} from "lucide-react"
import { CustomPagination } from "~/components/pagination";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Tabla() {
  const usersRaw = [
  { id: 1, profile: null, lastName: "García", name: "Juan", email: "juan.garcia1@example.com" },
  { id: 2, profile: null, lastName: "Martínez", name: "Ana", email: "ana.martinez2@example.com" },
  { id: 3, profile: null, lastName: "López", name: "Carlos", email: "carlos.lopez3@example.com" },
  { id: 4, profile: null, lastName: "Sánchez", name: "Lucía", email: "lucia.sanchez4@example.com" },
  { id: 5, profile: null, lastName: "Pérez", name: "David", email: "david.perez5@example.com" },
  { id: 6, profile: null, lastName: "Gómez", name: "Marta", email: "marta.gomez6@example.com" },
  { id: 7, profile: null, lastName: "Fernández", name: "Luis", email: "luis.fernandez7@example.com" },
  { id: 8, profile: null, lastName: "Ruiz", name: "Elena", email: "elena.ruiz8@example.com" },
  { id: 9, profile: null, lastName: "Díaz", name: "Jorge", email: "jorge.diaz9@example.com" },
  { id: 10, profile: null, lastName: "Moreno", name: "Laura", email: "laura.moreno10@example.com" },
  { id: 11, profile: null, lastName: "Muñoz", name: "Pablo", email: "pablo.munoz11@example.com" },
  { id: 12, profile: null, lastName: "Álvarez", name: "Sara", email: "sara.alvarez12@example.com" },
  { id: 13, profile: null, lastName: "Romero", name: "Diego", email: "diego.romero13@example.com" },
  { id: 14, profile: null, lastName: "Alonso", name: "Carmen", email: "carmen.alonso14@example.com" },
  { id: 15, profile: null, lastName: "Navarro", name: "Raúl", email: "raul.navarro15@example.com" },
  { id: 16, profile: null, lastName: "Torres", name: "Paula", email: "paula.torres16@example.com" },
  { id: 17, profile: null, lastName: "Domínguez", name: "Iván", email: "ivan.dominguez17@example.com" },
  { id: 18, profile: null, lastName: "Vázquez", name: "Natalia", email: "natalia.vazquez18@example.com" },
  { id: 19, profile: null, lastName: "Ramos", name: "Hugo", email: "hugo.ramos19@example.com" },
  { id: 20, profile: null, lastName: "Gil", name: "Claudia", email: "claudia.gil20@example.com" }
];

  const headers = [
    {title: 'Profile', class: ''},
    {title: 'Name', class: ''},
    {title: 'Email', class: ''},
    {title: 'Actions', class: 'flex justify-center items-center'},
  ]

  const [items, setItems] = useState<typeof usersRaw>([]);
  const [page, setPage] = useState(1);
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
    setItems(usersRaw.slice(startPage, endPage));
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
          <Button size="sm" type="button">
            <Plus className="size-4" />
            New user
          </Button>
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
                  <AvatarImage src={row.profile} sizes="small"/>
                  <AvatarFallback>{row.lastName.slice(0,1)}{row.name.slice(0,1)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{row.lastName}, {row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell className="p-1">
                <div className="flex column justify-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon"><EllipsisVerticalIcon/></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
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
        itemsLength={usersRaw.length}
        itemsPerPage={itemsXPage}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  )
}
