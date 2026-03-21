import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  itemsLength: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function CustomPagination({
  itemsLength,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // Calculate total pages
  const totalPages = Math.ceil(itemsLength / itemsPerPage)

  // Validate current page
  const activePage = Math.min(Math.max(currentPage, 1), totalPages)

  // Generate the page range to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const showPages = 5 // Maximum numbers to show
    let startPage = Math.max(1, activePage - 2)
    let endPage = Math.min(totalPages, activePage + 2)

    // Adjust range if there are few pages
    if (endPage - startPage < showPages - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + showPages - 1)
      } else {
        startPage = Math.max(1, endPage - showPages + 1)
      }
    }

    // Add first page if not included
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push("...")
      }
    }

    // Add pages from the range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add last page if not included
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...")
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  // Navigation handling
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage)
    }
  }

  if (totalPages <= 1) {
    return null // Don't show pagination if only one page
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(activePage - 1)}
            className={activePage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {pageNumbers.map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page as number)}
                isActive={page === activePage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(activePage + 1)}
            className={
              activePage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}