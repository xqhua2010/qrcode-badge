import React , { useState } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from './Badge'


const FormAttendee = () => {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const formValue = event.currentTarget
    if (formValue.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault();
      const firstName = formValue[0].value
      const lastName = formValue[1].value
      const twitter = formValue[2].value
      const github = formValue[3].value
      const email = formValue[4].value
      let person = {'First name': firstName,
              'Last name': lastName,
              'Email': email}
      if (twitter) {
          person['Twitter'] = twitter
      }
      if (github) {
          person['Github'] = github
      }
      ReactDOM.render(<Badge person={person} />, document.getElementById('badge'))
      ReactDOM.render(<Button variant="primary"
              onClick={() => printImg(person)}>Print</Button>,
              document.getElementById('print'))
    }
    setValidated(true)
  }
  const printImg = (person) => {
    const win = window.open('', 'Print badge', 'width=600, height=400, left=200, top=200')
    const badge = document.getElementById('badge').cloneNode(true)
    win.document.body.appendChild(badge)
    win.document.head.appendChild(document.getElementsByTagName('link')[2].cloneNode())
    win.print() 
    win.close()
  }
  const handleCancelClick = (event) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('badge'))
      ReactDOM.unmountComponentAtNode(document.getElementById('print'))
  }

  return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}> 
        <Form.Row > 
          <Form.Group as={Col} lg={6} controlId="first-name">
            <Form.Label>First name</Form.Label>
            <Form.Control required
              type="text"
              placeholder="First name"
              defaultValue="Qianghua"
            />
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              First name is a required field
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} lg={6} controlId="last-name">
            <Form.Label>Last name</Form.Label>
            <Form.Control required
              type="text"
              placeholder="Last name"
              defaultValue="Xiong"
            />
             <Form.Control.Feedback type="invalid">
              First name is a required field
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg={6} controlId="twitter">
            <Form.Label>Twitter</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
              />
            </InputGroup>
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} lg={6} controlId="github">
            <Form.Label>Github</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg={12} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="Email" required />
            <Form.Control.Feedback type="invalid">
              Email is a required field
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button type="reset" onClick={handleCancelClick}>Cancel</Button>{' '}
        <Button type="submit">Create</Button>
      </Form>
  )
}

export default FormAttendee
