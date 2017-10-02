import React, { Component } from 'react'
import { Table } from 'reactstrap';

export function StudentRow(props) {
      const content = props.studentData.map((student) =>
      <div>
        <td>{student.name}</td>
        <td>{student.grade}</td>
        <td>{student.panel[0]}</td>
        <td>{student.panel[1]}</td>
        <td>{student.panel[2]}</td>
        <td>{student.panel[3]}</td>
        <td>{student.accessability}</td>
      </div>
     );

    return (
      <tr>
       {content}
      </tr>
    );
}