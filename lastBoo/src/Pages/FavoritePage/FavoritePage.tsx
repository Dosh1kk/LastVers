import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { PortfolioGet } from '../../Models/Portfolio';

import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';

import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';


interface Props {}

const FavoritePage = (props: Props) => {
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
      []
    );
  useEffect(() => {
    getPortfolio();
  }, []);
  


const getPortfolio = () => {
  portfolioGetAPI()
    .then((res) => {
      if (res?.data) {
        setPortfolioValues(res?.data);
      }
    })
    .catch((e) => {
      setPortfolioValues(null);
    });
};



const onPortfolioDelete = (e:any)=> {
  e.preventDefault();
  portfolioDeleteAPI(e.target[0].value).then((res) => {
    if (res?.status == 200) {
      //toast.success("Stock deleted from portfolio!");
      getPortfolio();
    }
  });
}




  return (
    <div className='App'>
      <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete}/>
       
    </div>
  )
}

export default FavoritePage