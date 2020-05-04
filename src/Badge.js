import React from 'react';
import qrcode from 'qrcode-generator'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'

const Badge = ({ person }) => {
  const name = person['First name'] + ' ' + person['Last name']
  const twitter = person['Twitter']
  const github = person['Github']
  const email = person['Email']
  const qr = qrcode(0, 'L')
  let qrInfo = "Name: " + name + '\n'
  if (twitter) {
    qrInfo += "Twitter: " + twitter + '\n'
  }
  if (github) {
    qrInfo += "Github: " + github + '\n'
  }
  qrInfo += "Email: " + email

  qr.addData(qrInfo)
  qr.make()

  const showSvg = () => {
    return { __html: qr.createSvgTag({'cellsize': 4, 'scalable': true}) }
  }
  
  return (
    <Card className="align-items-center text-center" style={{ width: '18rem' }} bg={'dark'} >
      <Card.Img as='div' dangerouslySetInnerHTML={showSvg()} variant="top" style={{ width: '8rem' }}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {twitter ? <Card.Text>Twitter: {twitter}</Card.Text> : ''}
        {github  ? <Card.Text>Github: {github}</Card.Text> : ''}
        <Card.Text>Email: {email}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Badge;