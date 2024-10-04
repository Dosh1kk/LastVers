import React, { SyntheticEvent } from 'react'
import Card from '../Card/Cardd'
import {v4 as uuidv4} from "uuid";
import { CompanySearch } from '../../company';
import { StockGet } from '../../Models/Stock';
import { Container } from 'react-bootstrap';
import { Grid } from '@mui/material';
import Cardd from '../Card/Cardd';


type Props = {
  searchResults:StockGet[];
  onPortfolioCreate:(e:SyntheticEvent)=>void;
}

const CardList:React.FC<Props> = ({searchResults, onPortfolioCreate}: Props):JSX.Element => {
  return (
    <>

       
        {searchResults.length>0?(
          <Grid container spacing={3}>
            {searchResults?.map((result)=>
  
              <Grid key ={result.id} item xs={6} md={4}>
                  <Cardd id={result.id}
                   searchResult={result}
                   onPOrtfolioCreate={onPortfolioCreate}> 


                  </Cardd>
              </Grid>
            
            )}
          </Grid>
          
         
        ):(
<p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
        )}
    </>
  )
}
export default CardList;