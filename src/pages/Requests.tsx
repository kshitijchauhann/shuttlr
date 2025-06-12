import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'; 
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';

const createData = (
  fileName: string,
  type: string,
  userName: string,
  size: string,
  date: string,
  time: string,
) => ({ fileName, type, size, userName, date, time });

const rows = [
  createData('Report_Q1_2025', '.xlsx', '@fijf333', '2.5 MB', '04/15/25', '10:00 AM'),
  createData('Project_Plan_V3', '.docx', '@fo034r3', '1.2 MB', '05/20/25', '2:15 PM'),
  createData('Marketing_Brief', '.pptx', '@one432', '8.7 MB', '06/01/25', '9:00 AM'),
  createData('Customer_Feedback', '.csv', '@the224', '0.8 MB', '03/10/25', '11:45 AM'),
  createData('HR_Policy_Update', '.pdf', '@gw1553', '3.1 MB', '01/20/25', '4:30 PM'),
  createData('Meeting_Minutes_0607', '.txt', '@fafo0200', '0.1 MB', '06/07/25', '1:00 PM'),
];

export default function BasicTable() {
  const handleApprove = (fileName: string) => {
    console.log(`Approved: ${fileName}`);
  };

  const handleReject = (fileName: string) => {
    console.log(`Rejected: ${fileName}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">File Type</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">File Size</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.fileName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fileName}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.userName}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">
                <IconButton
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleApprove(row.fileName)}
                  sx={{ mr: 1 }}
                >
                  <CheckBoxIcon/>
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleReject(row.fileName)}
                >
                  <CancelIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
