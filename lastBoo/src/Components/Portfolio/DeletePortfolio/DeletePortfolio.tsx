import React, { SyntheticEvent } from 'react'
import { Button, Form } from 'react-bootstrap';

interface Props  {
    onPortfolioDelete:(e:SyntheticEvent)=>void;
    portfolioValue:string;
}

const DeletePortfolio = ({onPortfolioDelete, portfolioValue}: Props) => {
  return (
    <>
      <Form onSubmit={onPortfolioDelete}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control value={portfolioValue} hidden={true} placeholder="Enter email" />
        
      </Form.Group>
      <Button variant="primary" type="submit">
        delete
      </Button>
      </Form>
      
    </>
  )
}

export default DeletePortfolio;