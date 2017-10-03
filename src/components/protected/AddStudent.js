import React, { Component } from "react";
import { hashHistory } from 'react-router-dom'
import { FormGroup, Label, Input, Button, Alert } from "reactstrap";
import firebase from "firebase";
import FontAwesome from 'react-fontawesome';

export default class AddStudent extends Component {
	 constructor(props) {
    super(props);
		this.state = {
			name: '',
			grade: '',
			accessability: '',
			school: '',
			panel1: '',
			panel2: '',
			panel3: '',
			panel4: '',
			panel5: '',
			panel6: '',
			panel: [],
			showForm: false,
			addedAlert: false,
		};

		var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId + '/info/').once('value', (snapshot) => this.setState({
      school: snapshot.val().school,
    }));

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeGrade = this.handleChangeGrade.bind(this);
		this.handleChangeAccessability = this.handleChangeAccessability.bind(this);
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

	handleChangeAccessability(event) {
   this.setState({
     accessability: event.target.value,
   });
  }

	handleChangePanel1(event) {
   this.setState({
     panel1: event.target.value,
   });
	 this.state.panel.push('1');
  }
	handleChangePanel2(event) {
   this.setState({
     panel2: event.target.value,
   });
	 this.state.panel.push('2');
  }
	handleChangePanel3(event) {
   this.setState({
     panel3: event.target.value,
   });
	 this.state.panel.push('3');
  }
	handleChangePanel4(event) {
   this.setState({
     panel4: event.target.value,
   });
	 this.state.panel.push('4');
  }
	handleChangePanel5(event) {
   this.setState({
     panel5: event.target.value,
   });
	 this.state.panel.push('5');
  }
	handleChangePanel6(event) {
   this.setState({
     panel6: event.target.value,
   });
	 this.state.panel.push('6');
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
			 this.state.accessability,
			 this.state.panel
		 );
		 this.setState({
       showForm: false,
			 addedAlert: true,
     });
   }

	 writeStudentData(name, school, grade, accessability, panel) {
		 var userId = firebase.auth().currentUser.uid;
     firebase.database().ref('users/' + userId + '/students/').push({
			 name: name,
			 school: school,
			 grade: grade,
			 accessability: accessability,
			 panel: panel
     });
   }

	render () {
		return (
				<div className="col">
					<br/>
					{this.state.showForm
						? <div className="card">
								<div className="card-block">
									<form onSubmit={this.handleSubmitStudent}>
										<div className="form-group">
											<FormGroup onChange={this.handleChangeName}>
							          <Label for="studentName">Name</Label>
							          <Input type="text" name="name" id="studentName" placeholder="Student Name" />
							        </FormGroup>
											<FormGroup onChange={this.handleChangeGrade}>
									      <Label for="exampleSelect">Grade</Label>
									      <Input type="select" name="select" id="exampleSelect">
									        <option>8</option>
									        <option>9</option>
									        <option>10</option>
									        <option>11</option>
									        <option>12</option>
									      </Input>
									    </FormGroup>
											<FormGroup onChange={this.handleChangeAccessability}>
							          <Label for="accessability">Accessability Issues</Label>
							          <Input type="text" name="name" id="accessability" placeholder="If so, please describe." />
							        </FormGroup>
											{/* {this.state.panel} */}
											<FormGroup check>
												<Label>Choose plenaries (pick 4 of the 6) </Label>
							        </FormGroup>
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
											 <button type="submit" className="btn btn-primary" onClick={() => hashHistory.push(`/dashboard`)}>Add Student</button>
										</div>
									</form>
								</div>
							</div>
						: <div><Button color="success" onClick={this.handleShowCard}>
							<FontAwesome
		            name='plus'
		            size='1x'
		            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', padding: '0px 10px 0px 0px' }}
		          />
						Add new student</Button>{' '}</div>
					 }
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
