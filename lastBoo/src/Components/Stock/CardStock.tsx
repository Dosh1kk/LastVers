import React, { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import hero from "./hero.jpg"
import Button from 'react-bootstrap/esm/Button';
import { StockGet } from '../../Models/Stock';
import DeletePortfolio from '../Portfolio/DeletePortfolio/DeletePortfolio';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';



interface Props {
  stockValue:StockGet;
  onPortfolioCreate:(e:SyntheticEvent)=>void
}

 const CardStock = ({stockValue, onPortfolioCreate}: Props) => {
  
 return (<>
 <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={hero} />
      <Card.Body>
        <Card.Title>
        <Link
        to={`/company/${stockValue.name}/company-profile`}
        className="pt-6 text-xl font-bold"
      >
        {stockValue.name}
        
      </Link>
        </Card.Title>
        <Card.Text>
        {stockValue.description}
        {stockValue.category}
        </Card.Text>
        <Button variant="primary">Add</Button>
         <AddPortfolio
         symbol={stockValue.name}
         onPortfolioCreate={onPortfolioCreate}
       /> 
      </Card.Body>
    </Card>
 </>

)
}
export default CardStock