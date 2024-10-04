import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../Portfolio/CardPortfolio/CardPortfolio';
import CardStock from './CardStock';
import { StockGet } from '../../Models/Stock';
import CardList from '../CardList/CardList';
import Cardd from '../Card/Cardd';
import { Grid } from '@mui/material';

interface Props {
    portfolioValues:StockGet[];
    onPortfolioCreate:(e:SyntheticEvent)=>void;
}

const ListStock = ({portfolioValues,onPortfolioCreate}: Props) => {
  return (
    <>
          <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        Shop
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
        {portfolioValues.length>0?(
          <Grid container spacing={3}>
            {portfolioValues?.map((result)=>
  
              <Grid key ={result.id} item xs={6} md={4}>
                  <Cardd
                 id={result.id}
                   searchResult={result}
                   onPOrtfolioCreate={onPortfolioCreate}
                 />
              </Grid>
            
            )}
          </Grid>

          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>

    </>  
)
}
export default ListStock