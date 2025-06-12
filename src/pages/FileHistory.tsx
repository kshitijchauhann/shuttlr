import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, fileType, size, sender, date, time) {
  return { name, fileType, size, sender, date, time };
}

const rows = [
  createData('Report_Q1_2025', '.xlsx', '2.5 MB', 'finance@shuttlr.tech', '04/15/25', '10:00 AM'),
  createData('Project_Plan_V3', '.docx', '1.2 MB', 'engineering@shuttlr.tech', '05/20/25', '2:15 PM'),
  createData('Marketing_Brief', '.pptx', '8.7 MB', 'marketing@shuttlr.tech', '06/01/25', '9:00 AM'),
  createData('Customer_Feedback', '.csv', '0.8 MB', 'support@shuttlr.tech', '03/10/25', '11:45 AM'),
  createData('HR_Policy_Update', '.pdf', '3.1 MB', 'hr@shuttlr.tech', '01/20/25', '4:30 PM'),
  createData('Meeting_Minutes_0607', '.txt', '0.1 MB', 'admin@shuttlr.tech', '06/07/25', '1:00 PM')
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">File Type</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Sender</TableCell>
            <TableCell align="right">Date</TableCell>

            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.fileType}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.sender}</TableCell>
              <TableCell align="right">{row.date}</TableCell>

              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
