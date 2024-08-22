
     
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentInvoice } from '../../utils/api';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Invoice = () => {
    const { subscriptionId } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        paymentInvoice(subscriptionId)
            .then(response => {
                setInvoiceData(response.data);
            })
            .catch(error => {
                setError('Failed to load invoice details.');
            });
    }, [subscriptionId]);

    const handleButtonClick = () => {
        navigate('/listedproperties');
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const rows = invoiceData ? [
        { label: 'Amount Paid', value: `₹ ${invoiceData.amount_paid}` },
        { label: 'Status', value: invoiceData.status },
        { label: 'Payment Date', value: new Date(invoiceData.payment_date * 1000).toLocaleDateString() },
        { label: 'Customer Name', value: invoiceData.customerName },
        { label: 'Customer Email', value: invoiceData.customerEmail },
    ] : [];

    if (error) return <p>{error}</p>;

    return (
        <div>
            {invoiceData ? (
                <div className="flex w-full h-screen justify-center gap-10 flex-col">
                    <div className="w-full absolute top-10">
                        <img
                            src="/images/REAL-TY.png"
                            alt="Realty Logo"
                            className="w-24 mx-auto h-24"
                        />
                        <h1 className='text-red-800 text-xl font-semibold justify-center text-center'>Payment Details</h1>
                    </div>
                    <div>
                    <TableContainer component={Paper} style={{ width: '100%', maxWidth: '700px',  margin: '0 auto' }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Field</StyledTableCell>
                                    <StyledTableCell align="right">Details</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.label}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.label}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.value}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></div>
                    {invoiceData.invoice_url && (
                        <a href={invoiceData.invoice_url} target="_blank" rel="noopener noreferrer" className='text-blue-600 text-center'>
                            Download Invoice
                        </a>
                    )}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Button 
                            variant="contained" 
                            color="error" 
                            onClick={handleButtonClick}
                            style={{ fontWeight: 'bold' }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                <p>Loading invoice details...</p>
            )}
        </div>
    );
};

export default Invoice;



