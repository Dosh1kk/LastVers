import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { PortfolioGet } from '../../Models/Portfolio';
import { StockGet } from '../../Models/Stock';
import { CompanySearch } from '../../company';
//import { searchCompanies } from '../../api';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';

interface Props {}

const SearchPage = (props: Props) => {
    const [search,setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
      []
    );
      const [searchResult, setSearchResult]= useState<CompanySearch[]>([]);
  const [serverError, setServerError] =useState<string| null>(null);
  useEffect(() => {
    getPortfolio();
  }, []);
  
  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value);
    //console.log(e);
}

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
      getPortfolio();
    }
  });
}




  return (
    <div className='App'>
      
      {serverError&& <h1>Unable to connect to api</h1>}

    </div>
  )
}

export default SearchPage