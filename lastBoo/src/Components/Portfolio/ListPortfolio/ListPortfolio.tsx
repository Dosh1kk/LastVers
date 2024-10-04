import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';
import { PortfolioGet } from '../../../Models/Portfolio';
import { alignPropType } from 'react-bootstrap/esm/types';
import { Grid } from '@mui/material';

interface Props {
    portfolioValues:PortfolioGet[];
    onPortfolioDelete:(e:SyntheticEvent)=>void;
}

const ListPortfolio = ({portfolioValues,onPortfolioDelete}: Props) => {
  return (
    <>
          <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My favorite
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {portfolioValues.length > 0 ? (
            <Grid container spacing={3}>
            {portfolioValues?.map((result)=>
  
              <Grid key ={result.id} item xs={6} md={4}>
                  <CardPortfolio
                 key={result.id}
                   portfolioValue={result}
                   onPortfolioDelete={onPortfolioDelete}
                 />
                 
              </Grid>
            
            )}
            
          </Grid>
            
          ) : (
            <h5  style={{textAlign:"center"}}>
              Nothing here
            </h5>
          )}
        </>
      </div>
    </section>

    </>  
)
}
export default ListPortfolio