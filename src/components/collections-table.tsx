import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Title,
    Text
} from '@tremor/react'
import Link from 'next/link'
import { Collection } from '@/interfaces/ICollection'

export default function CollectionsTable({ items }: { items: Collection[] }) {
    return (
        <>
            <Table className='mt-5'>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Symbol</TableHeaderCell>
                        <TableHeaderCell>Owner</TableHeaderCell>
                        <TableHeaderCell>Contract</TableHeaderCell>
                        <TableHeaderCell>Total Supply</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.key}>
                            <TableCell><Text>{item.name}</Text></TableCell>
                            <TableCell>
                                <Text>{item.symbol}</Text>
                            </TableCell>
                            <TableCell>
                                <Link key={item.key} as={`/profile/${item.owner_address}`} href="/profile/[address]">
                                    {item.owner_address}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link key={item.key} as={`/collections/${item.contract_address}`} href="/collections/[address]">
                                    {item.contract_address}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Text>{item.total_supply}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}