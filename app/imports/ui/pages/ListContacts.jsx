import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../api/contact/Contact';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    const sub = Meteor.subscribe(Contacts.userPublicationName);
    const rdy = sub.ready();
    const contactItem = Contacts.collection.find({}).fetch();
    return {
      ready: rdy,
      contacts: contactItem,
    };
  });

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact) => (<Col key={contact._id}><Contact contact={contact} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;
