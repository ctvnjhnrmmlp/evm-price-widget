'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConversionService from '@/services/coingecko/conversion';
import AssetService from '@/services/energi/assets';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CopyIcon,
  Dot,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount, useBalance, useEnsName } from 'wagmi';

type Asset = {
  address: string;
  name: string;
  symbol: string;
  last_price: number;
};

function DataTable({
  columns,
  data,
}: {
  columns: ColumnDef<Asset>[];
  data: Asset[];
}) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'last_price', desc: true },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='sticky top-0 bg-background'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex items-center cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowUp className='ml-2 h-4 w-4' />,
                          desc: <ArrowDown className='ml-2 h-4 w-4' />,
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() && (
                            <ArrowUpDown className='ml-2 h-4 w-4' />
                          ))}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  table.getCanPreviousPage() && table.previousPage()
                }
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={table.getState().pagination.pageIndex === i}
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )).slice(
              Math.max(0, table.getState().pagination.pageIndex - 1),
              Math.min(
                table.getPageCount(),
                table.getState().pagination.pageIndex + 3
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                aria-disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-8 w-[250px]' />
        <Skeleton className='h-8 w-[200px]' />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='sticky top-0 bg-background'>
            <TableRow>
              <TableHead className='w-[100px]'>
                <Skeleton className='h-6 w-12' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-24' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-24' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-6 w-24' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='h-6 w-12' />
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-2'>
                      <Skeleton className='h-6 w-6 rounded-full' />
                      <Skeleton className='h-6 w-24' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-16' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-16' />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex justify-end'>
        <Skeleton className='h-10 w-[200px]' />
      </div>
    </div>
  );
}

export default function Page() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balanceData, isLoading } = useBalance({ address });
  const { setTheme } = useTheme();

  const {
    data: assetsServer,
    status: assetsServerStatus,
    isLoading: assetsServerLoading,
  } = useQuery({
    queryKey: ['getAssets'],
    queryFn: async () => await AssetService.findAssets(),
  });

  const { data: ethUsdPriceServer } = useQuery({
    queryKey: ['getethUsdPrice'],
    queryFn: async () => await ConversionService.findEthUsdPrice(),
  });

  useEffect(() => {
    if (assetsServer && assetsServerStatus === 'success') {
      setAssets(() => {
        const assets = Object.entries(assetsServer).map(([address, info]) => ({
          address,
          name: info.name,
          symbol: info.symbol,
          last_price: info.last_price,
        }));

        return assets;
      });
    }
  }, [assetsServer]);

  const columns: ColumnDef<Asset>[] = [
    {
      accessorFn: (_, index) => index + 1,
      header: '#',
      cell: ({ row }) => <div className='font-medium'>{row.index + 1}</div>,
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: 'Coin',
      cell: ({ row }) => {
        const asset = row.original;
        return (
          <div className='flex items-center space-x-2'>
            <Image
              src={`/images/icons/${asset.symbol}.svg`}
              alt={asset.name}
              width={25}
              height={25}
            />
            <span>{asset.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'symbol',
      header: 'Symbol',
    },
    {
      accessorKey: 'last_price',
      header: 'Price',
      cell: ({ row }) => (
        <div>
          $
          {row.original.last_price
            ? row.original.last_price.toFixed(2)
            : row.original.last_price}
        </div>
      ),
    },
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(address || '');
  };

  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  console.log(assetsServer);

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <Tabs defaultValue='assets'>
            <TabsList className='bg-background flex w-full gap-4 h-full'>
              <TabsTrigger value='assets' className='h-full'>
                Assets
              </TabsTrigger>
              <TabsTrigger value='wallet' className='h-full'>
                Wallet
              </TabsTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='icon'>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsList>
            <TabsContent value='assets'>
              <Card className='w-full bg-background min-h-[600px] min-w-[640px]'>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                  <CardDescription>
                    A list of all assets coming from EnergiSwap.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='max-h-[600px] overflow-auto'>
                    {assetsServerLoading ? (
                      <TableSkeleton />
                    ) : (
                      <DataTable columns={columns} data={assets} />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='wallet' className='bg-background'>
              <Card className='w-full bg-background min-h-[600px] min-w-[640px]'>
                <CardHeader>
                  <CardTitle>Wallet</CardTitle>
                  <CardDescription>
                    Connect your wallet to view your assets.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>
                      Wallet Information
                    </h2>
                    {isConnected && (
                      <div className='flex'>
                        <Dot className='text-green-500' />
                        <p className='text-green-500'>Connected</p>
                      </div>
                    )}
                    {!isConnected && (
                      <div className='flex'>
                        <Dot className='text-red-500' />
                        <p className='text-red-500'>Not Connected</p>
                      </div>
                    )}
                    <ConnectButton />
                  </div>
                  {isConnected && (
                    <div className='space-y-2 bg-background outline p-4 rounded-md text-sm'>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-foreground'>ENS</span>
                        <span className='text-foreground'>
                          {ensName || 'Not available'}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-foreground'>
                          Address
                        </span>
                        <span className='font-mono text-foreground'>
                          {shortenAddress(address!)}
                        </span>
                        <button
                          onClick={copyAddress}
                          className='text-blue-500 hover:text-blue-700'
                          title='Copy address'
                        >
                          <CopyIcon size={14} />
                        </button>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold text-foreground'>
                          Balance
                        </span>
                        {isLoading ? (
                          <span className='text-foreground'>Loading...</span>
                        ) : (
                          <div className='flex space-x-2'>
                            <div className='flex items-center space-x-2'>
                              <Image
                                src={`/images/icons/${balanceData?.symbol}.svg`}
                                alt={`${balanceData?.symbol}`}
                                width={15}
                                height={15}
                              />
                              <span className='text-foreground'>
                                {Number(balanceData?.value).toFixed(2)}
                              </span>
                            </div>
                            <div className='flex items-center space-x-1'>
                              <span className='text-foreground'>
                                💲{' '}
                                {ethUsdPriceServer && balanceData?.value
                                  ? (
                                      Number(balanceData.value) *
                                      ethUsdPriceServer
                                    ).toFixed(2)
                                  : 0}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
