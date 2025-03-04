import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

type Props = {
  next?: string
  prev?: string
  onPageChange: (type: 'next' | 'prev') => void
  currentPage: number
  total: number
  pageSize: number
}

export const PagePagination: React.FC<Props> = ({
  next,
  prev,
  onPageChange,
  currentPage,
  total,
  pageSize,
}) => {
  const totalPages = Math.ceil(total / pageSize)
  const isPrevDisabled = !prev
  const isNextDisabled = !next

  return (
    <Pagination className="mt-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => !isPrevDisabled && onPageChange('prev')}
            className={isPrevDisabled ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        <PaginationItem className="flex items-center">
          <span>
            Page{' '}
            <span className="font-bold text-purple-400">{currentPage}</span> of{' '}
            {totalPages || 1}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => !isNextDisabled && onPageChange('next')}
            className={isNextDisabled ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
