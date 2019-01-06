import React, { Component } from 'react'
import SerializeForm from 'form-serialize'
import { Container, ListGroup, ListGroupItem, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getUsers, deleteUser, addUser } from '../actions/userActions';
import PropTypes from 'prop-types';


class ContactList extends Component {
    state = {
        modalIsOpen: false
    }

    componentDidMount() {
        this.props.getUsers()

    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onDeleteClick = (id) => {
        this.props.deleteUser(id);
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        let values = SerializeForm(evt.target, { hash: true })
        const newUser= { name: values.name, address: values.address, email: values.email, phone: values.phone }
        this.props.addUser(newUser)
        this.closeModal()
    }

    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        const { users } = this.props.user;
        return (
            <Container>
                <Button color="dark" style={{ marginBottom: '2rem' }} onClick={this.openModal}>Add Contact</Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Add Contact</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Row form>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="User Name">Full Name</Label>
                                    <Input name="name" placeholder="Enter your full name" required />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Email">Email</Label>
                                    <Input type="email" name="email" placeholder="Enter email" required />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Phone">Phone</Label>
                                    <Input type="tel" name="phone" placeholder="Enter phone number" required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="Address">Address</Label>
                            <Input type="text" name="address" placeholder="Belgaum" required />
                        </FormGroup>
                        <Col md={12}>
                            <Button color="primary" size="sm" block>Add new User</Button>
                        </Col>
                    </Form>
                </Modal>
                <ListGroup>
                    <TransitionGroup className="contact-list">
                        {users.map(({ _id, name, email, address, phone }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Row md={12}>
                                        <Col md="2">{name}</Col>
                                        <Col md="3">{address}</Col>
                                        <Col md="2">{phone}</Col>
                                        <Col md="4">{email}</Col>
                                        <Col md="1">
                                            <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                            >
                                                &times;
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ContactList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { getUsers, deleteUser, addUser })(ContactList);
