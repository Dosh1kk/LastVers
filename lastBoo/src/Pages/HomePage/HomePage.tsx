import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'

import { StockGet } from '../../Models/Stock'
import ListStock from '../../Components/Stock/ListStock'
import { CompanySearch } from '../../company'
import { stockAddAPI, stockDeleteAPI, stockGetAPI } from '../../Services/StockService'
import { portfolioAddAPI } from '../../Services/PortfolioService'
import { Col, Container, Row, Stack } from 'react-bootstrap'

interface Props {}

const HomePage = (props: Props) => {
  const [search,setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<StockGet[] | null>(
      []
    );
      const [searchResult, setSearchResult]= useState<CompanySearch[]>([]);
  const [serverError, setServerError] =useState<string| null>(null);
  useEffect(() => {
    getPortfolio();
  }, []);
  


const getPortfolio = () => {
  stockGetAPI()
    .then((res) => {
      if (res?.data) {
        setPortfolioValues(res?.data);
      }
    })
    .catch((e) => {
      setPortfolioValues(null);
    });
};

const onPortfolioCreate=(e:any)=>{
  portfolioAddAPI(e.target[0].value)
  .then((res) => {
    if (res?.status === 204) {
      //toast.success("Stock added to portfolio!");
      console.log("Stock added to portfolio!");
      getPortfolio();
    }
  })
  .catch((e) => {
    console.log("some error")
    //toast.warning("Could not add stock to portfolio!");
  });
};


  return (
    <div>
      {serverError&& <h1>Unable to connect to api</h1>}
      
      <ListStock portfolioValues={portfolioValues!} onPortfolioCreate={onPortfolioCreate}/>
       
    </div>
  )
}

export default HomePage