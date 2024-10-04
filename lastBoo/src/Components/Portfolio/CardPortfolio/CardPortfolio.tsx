import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link } from 'react-router-dom';
import { PortfolioGet } from '../../../Models/Portfolio';
import { Button, Card } from 'react-bootstrap';

interface Props {
    portfolioValue:PortfolioGet;
    onPortfolioDelete:(e:SyntheticEvent)=>void
}

const CardPortfolio = ({portfolioValue, onPortfolioDelete}: Props) => {
  return (
    <>
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={portfolioValue.photo} />
      <Card.Body>
        <Card.Title>{portfolioValue.name} </Card.Title>
        <Card.Text>

          {portfolioValue.description}
        </Card.Text>
        {portfolioValue.category}
        <DeletePortfolio
         portfolioValue={portfolioValue.name}
         onPortfolioDelete={onPortfolioDelete}/>
      </Card.Body>
    </Card>
    </>
    
  )
}
export default CardPortfolio