import { useState } from 'react';
import { AngleDoubleLeft } from '@primeicons/react/angle-double-left';
import { AngleDoubleRight } from '@primeicons/react/angle-double-right';
import { AngleLeft } from '@primeicons/react/angle-left';
import { AngleRight } from '@primeicons/react/angle-right';
import { DataTable } from '@primereact/ui/datatable';
import type { DataTablePaginationInstance } from '@primereact/ui/datatable';
import { EllipsisH } from '@primeicons/react';
import { Paginator } from '@primereact/ui/paginator';
import type { PaginatorPagesInstance } from '@primereact/ui/paginator';
import type { PaginatorRootChangeEvent } from '@primereact/ui/paginator';
import { ToggleSwitch } from '@primereact/ui/toggleswitch';
import { type ToggleSwitchRootChangeEvent } from '@primereact/ui/toggleswitch';
import './App.css'

export interface Product {
    id?: number,
    code?: string;
    name?: string;
    quantity?: number;
}

const products: Product[] = [
    { id: 0, code: 'f230fh0g3', name: 'Bamboo Watch', quantity: 24 },
    { id: 1, code: 'nvklal433', name: 'Black Watch', quantity: 61 },
    { id: 2, code: 'zz21cz3c1', name: 'Blue Band', quantity: 2 },
    { id: 3, code: '244wgerg2', name: 'Blue T-Shirt', quantity: 25 },
    { id: 4, code: 'h456wer53', name: 'Bracelet', quantity: 73 },
    { id: 5, code: 'av2231fwg', name: 'Brown Purse', quantity: 0 },
    { id: 6, code: 'bib36pfvm', name: 'Chakra Bracelet', quantity: 5 },
    { id: 7, code: 'mbvjkgip5', name: 'Galaxy Earrings', quantity: 23 },
    { id: 8, code: 'vbb124btr', name: 'Game Controller', quantity: 2 },
    { id: 9, code: 'cm230f032', name: 'Gaming Set', quantity: 63 },
    { id: 10, code: 'plb34234v', name: 'Gold Phone Case', quantity: 0 }
];

export default function App() {
    const [paginator, setPaginator] = useState<boolean>(true);

    return (
        <>
            <h1>PrimeReact (DataTable Demo)</h1>
            <div className="flex justify-center items-center gap-2 py-3">
                <label htmlFor="switch">Off</label>
                <ToggleSwitch.Root
                    inputId="switch" checked={paginator}
                    onCheckedChange={(event: ToggleSwitchRootChangeEvent) => setPaginator(event.checked)}
                >
                    <ToggleSwitch.Control>
                        <ToggleSwitch.Handle />
                    </ToggleSwitch.Control>
                </ToggleSwitch.Root>
                <label htmlFor="switch">On</label>
            </div>
            <div className="flex justify-center pb-3">
                paginator: {String(paginator)}
            </div>
            <DataTable.Root data={products} showGridlines stripedRows paginator={paginator} defaultRows={5}>
                <DataTable.TableContainer>
                    <DataTable.Table>
                        <DataTable.THead>
                            <DataTable.THeadRow>
                                <DataTable.THeadCell>
                                    <DataTable.THeadTitle>Id</DataTable.THeadTitle>
                                </DataTable.THeadCell>
                                <DataTable.THeadCell>
                                    <DataTable.THeadTitle>Code</DataTable.THeadTitle>
                                </DataTable.THeadCell>
                                <DataTable.THeadCell>
                                    <DataTable.THeadTitle>Name</DataTable.THeadTitle>
                                </DataTable.THeadCell>
                                <DataTable.THeadCell>
                                    <DataTable.THeadTitle>Quantity</DataTable.THeadTitle>
                                </DataTable.THeadCell>
                            </DataTable.THeadRow>
                        </DataTable.THead>
                        <DataTable.TBody>
                            {({ item }: { item: Product }) => (
                                <DataTable.Row key={item.id}>
                                    <DataTable.Cell>{item.id}</DataTable.Cell>
                                    <DataTable.Cell>{item.code}</DataTable.Cell>
                                    <DataTable.Cell>{item.name}</DataTable.Cell>
                                    <DataTable.Cell>{item.quantity}</DataTable.Cell>
                                </DataTable.Row>
                            )}
                        </DataTable.TBody>
                    </DataTable.Table>
                </DataTable.TableContainer>
                <DataTable.Pagination>
                    {({ page, rows, totalRecords, onPageChange }: DataTablePaginationInstance) => (
                        <Paginator.Root
                            className="py-3 px-3.5 border-t border-surface-200"
                            page={page + 1}
                            total={totalRecords}
                            itemsPerPage={rows}
                            onPageChange={(e: PaginatorRootChangeEvent) => {
                                if (e.originalEvent) onPageChange(e.originalEvent, e.value - 1);
                            }}
                        >
                            <Paginator.Content>
                                <Paginator.First>
                                    <AngleDoubleLeft />
                                </Paginator.First>
                                <Paginator.Prev>
                                    <AngleLeft />
                                </Paginator.Prev>
                                <Paginator.Pages>
                                    {({ paginator }: PaginatorPagesInstance) =>
                                        paginator?.pages.map((p, index) =>
                                            p.type === 'page' ? (
                                                <Paginator.Page key={index} value={p.value} />
                                            ) : (
                                                <Paginator.Ellipsis key={index}>
                                                    <EllipsisH />
                                                </Paginator.Ellipsis>
                                            )
                                        )
                                    }
                                </Paginator.Pages>
                                <Paginator.Next>
                                    <AngleRight />
                                </Paginator.Next>
                                <Paginator.Last>
                                    <AngleDoubleRight />
                                </Paginator.Last>
                            </Paginator.Content>
                        </Paginator.Root>
                    )}
                </DataTable.Pagination>
            </DataTable.Root>
        </>
    );
}
