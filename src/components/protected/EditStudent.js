import React, { Component } from "react";
import { hashHistory } from 'react-router-dom'
import { Card, Badge, Row, Col, Form, Container, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import firebase from "firebase";
import FontAwesome from 'react-fontawesome';

export default class EditStudent extends Component {
	 constructor(props) {
    super(props);
		this.state = {
			name: '',
			grade: '',
			accessibility: '',
			school: '',
			panel1: false,
			panel2: false,
			panel3: false,
			panel4: false,
			panel5: false,
			panel6: false,
			numPanelChoosen: 0,
			addedAlert: false,
		};

		var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId + '/info/').once('value', (snapshot) => this.setState({
      school: snapshot.val().school,
    }));

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeGrade = this.handleChangeGrade.bind(this);
		this.handleChangeAccessibility = this.handleChangeAccessibility.bind(this);
		this.handleChangePanel1 = this.handleChangePanel1.bind(this);
		this.handleChangePanel2 = this.handleChangePanel2.bind(this);
		this.handleChangePanel3 = this.handleChangePanel3.bind(this);
		this.handleChangePanel4 = this.handleChangePanel4.bind(this);
		this.handleChangePanel5 = this.handleChangePanel5.bind(this);
		this.handleChangePanel6 = this.handleChangePanel6.bind(this);
		this.handleShowCard = this.handleShowCard.bind(this);

		this.handleSubmitStudent = this.handleSubmitStudent.bind(this);
    this.writeStudentData = this.writeStudentData.bind(this);
  }

	handleChangeName(event) {
   this.setState({
     name: event.target.value,
   });
  }

	handleChangeGrade(event) {
   this.setState({
     grade: event.target.value,
   });
  }

	handleChangeAccessibility(event) {
   this.setState({
     accessibility: event.target.value,
   });
  }

	handleChangePanel1(event) {
	 if (this.state.panel1){
		 this.state.numPanelChoosen -= 1;
	 } else {
		 this.state.numPanelChoosen += 1;
	 }
   this.setState({
     panel1: !this.state.panel1,
   });
  }
	handleChangePanel2(event) {
	 if (this.state.panel2){
 		 this.state.numPanelChoosen -= 1;
 	 } else {
 		 this.state.numPanelChoosen += 1;
 	 }
   this.setState({
     panel2: !this.state.panel2,
   });
  }
	handleChangePanel3(event) {
		if (this.state.panel3){
  		 this.state.numPanelChoosen -= 1;
  	 } else {
  		 this.state.numPanelChoosen += 1;
  	 }
   this.setState({
     panel3: !this.state.panel3,
   });
  }
	handleChangePanel4(event) {
		if (this.state.panel4){
  		 this.state.numPanelChoosen -= 1;
  	 } else {
  		 this.state.numPanelChoosen += 1;
  	 }
   this.setState({
     panel4: !this.state.panel4,
   });
  }
	handleChangePanel5(event) {
		if (this.state.panel5){
  		 this.state.numPanelChoosen -= 1;
  	 } else {
  		 this.state.numPanelChoosen += 1;
  	 }
   this.setState({
     panel5: !this.state.panel5,
   });
  }
	handleChangePanel6(event) {
		if (this.state.panel6){
  		 this.state.numPanelChoosen -= 1;
  	 } else {
  		 this.state.numPanelChoosen += 1;
  	 }
   this.setState({
     panel6: !this.state.panel6,
   });
  }
	handleShowCard(event) {
		this.setState({
      showForm: true,
			addedAlert: false,
    });
	}
	handleSubmitStudent(event) {
     event.preventDefault();
     this.writeStudentData(
			 this.state.name,
			 this.state.school,
			 this.state.grade,
			 this.state.accessibility,
			 this.state.panel1,
			 this.state.panel2,
			 this.state.panel3,
			 this.state.panel4,
			 this.state.panel5,
			 this.state.panel6,
		 );
		 this.setState({
       showForm: false,
			 addedAlert: true,
     });
   }

	 writeStudentData(name, school, grade, accessibility, panel1, panel2, panel3, panel4, panel5, panel6) {
		 var userId = firebase.auth().currentUser.uid;
     firebase.database().ref('users/' + userId + '/students/').push({
			 name: name,
			 school: school,
			 grade: grade,
			 accessibility: accessibility,
			 panel1: panel1,
			 panel2: panel2,
			 panel3: panel3,
			 panel4: panel4,
			 panel5: panel5,
			 panel6: panel6,
     });
   }

	render () {
		return (
				<div className="col">
					<br/>
							<Card>
								<Container>
									<br />
									<Form onSubmit={this.handleSubmitStudent}>
										<Row>
											<Col>
												<FormGroup onChange={this.handleChangeName}>
								          <Label for="studentName">Name</Label>
								          <Input type="text" name="name" id="studentName" placeholder="Student Name" />
													{this.state.name === ''
													? <Badge color="danger">Please enter a student Name</Badge>
													: null
													}
								        </FormGroup>
												<FormGroup onChange={this.handleChangeGrade}>
										      <Label for="exampleSelect">Grade</Label>
										      <Input type="select" name="select">
														<option>Please Select Grade</option>
										        <option>8</option>
										        <option>9</option>
										        <option>10</option>
										        <option>11</option>
										        <option>12</option>
										      </Input>
													{this.state.grade === '' || this.state.grade === 'Please Select Grade'
													? <Badge color="danger">Please select a grade</Badge>
													: null
													}
										    </FormGroup>
												<FormGroup onChange={this.handleChangeAccessibility}>
								          <Label for="accessibility">Accessibility Issues</Label>
								          <Input type="text" name="name" id="accessibility" placeholder="If so, please describe." />
								        </FormGroup>
											</Col>
											{/* {this.state.panel} */}
											<Col>
												<FormGroup check>
													<Label>Choose plenaries (pick 4 of the 6) </Label>
								        </FormGroup>
												{/* <FormGroup check>
													 <Label check>
														 <Input type="checkbox" onChange={ () => { this.setState({ panel1: !this.state.panel1 }); }} />{' '}
														 	Test
													 </Label>
												 </FormGroup> */}
												{this.state.numPanelChoosen === 4
												? null
												: <Badge color="danger">Please select four plenaries.</Badge>
												}
												<br />
												<FormGroup check onChange={this.handleChangePanel1}>
													 <Label check>
														 <Input type="checkbox" />{' '}
														 	Panel 1
													 </Label>
												 </FormGroup>
												 <FormGroup check onChange={this.handleChangePanel2}>
			 										 <Label check>
			 											 <Input type="checkbox" />{' '}
			 											 	Panel 2
			 										 </Label>
			 									 </FormGroup>
												 <FormGroup check onChange={this.handleChangePanel3}>
			 										 <Label check>
			 											 <Input type="checkbox" />{' '}
			 											 	Panel 3
			 										 </Label>
			 									 </FormGroup>
												 <FormGroup check onChange={this.handleChangePanel4}>
			 										 <Label check>
			 											 <Input type="checkbox" />{' '}
			 											 	Panel 4
			 										 </Label>
			 									 </FormGroup>
												 <FormGroup check onChange={this.handleChangePanel5}>
			 										 <Label check>
			 											 <Input type="checkbox" />{' '}
			 											 	Panel 5
			 										 </Label>
			 									 </FormGroup>
												 <FormGroup check onChange={this.handleChangePanel6}>
			 										 <Label check>
			 											 <Input type="checkbox" />{' '}
			 											 	Panel 6
			 										 </Label>
			 									 </FormGroup>
											 </Col>
										 </Row>
										 {this.state.name === '' || this.state.grade === '' || this.state.numPanelChoosen != 4
										 ? <center><button type="submit" className="btn btn-primary" disabled>Add Student</button></center>
										 : <center><button type="submit" className="btn btn-primary" onClick={() => hashHistory.push(`/dashboard`)}>Add Student</button></center>
									 	 }
										 <br />
									</Form>
							</Container>
						</Card>
					 <br />
					 {this.state.addedAlert
						 ?  <Alert color="success">
									 <center>{this.state.name} has been registered</center>
								</Alert>
						 : null
					  }
				</div>
		)
	}
}