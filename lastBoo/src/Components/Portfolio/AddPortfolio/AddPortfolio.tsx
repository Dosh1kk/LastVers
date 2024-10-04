import React, { SyntheticEvent } from 'react'
import { Button, Form } from 'react-bootstrap';

interface Props {
    onPortfolioCreate:(e:SyntheticEvent)=>void;
    symbol:string
}

const AddPortfolio = ({onPortfolioCreate,symbol}: Props) => {
  return ( 
    <Form onSubmit={onPortfolioCreate}>
      <Form.Group className="mb-3">
        
        <Form.Control value={symbol} hidden={true} />
        
      </Form.Group>
      <Button variant="primary" type="submit">
        Add
      </Button>
      </Form>
)
}

export default AddPortfolio