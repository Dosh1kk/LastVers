import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { CompanySearch } from "../../company";
import { StockGet } from "../../Models/Stock";
import { Button, Card } from "react-bootstrap";
import hero from "./hero.jpg"

interface Props{
    id: number;
    searchResult:StockGet;
    onPOrtfolioCreate:(e:SyntheticEvent) => void;
    
};

const Cardd : React.FC<Props>=({id,searchResult, onPOrtfolioCreate}: Props) : JSX.Element=>{
    return (
      <>
         <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={searchResult.photo} />
      <Card.Body>
        <Card.Title>{searchResult.name}</Card.Title>
        <Card.Text>
          {searchResult.description}
        </Card.Text>
        <AddPortfolio
         onPortfolioCreate={onPOrtfolioCreate}
         symbol={searchResult.name}
       />
      </Card.Body>
    </Card>
      </>
    
    )
}
export default Cardd;