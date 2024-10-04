import React, {ChangeEvent  , useState, MouseEvent, SyntheticEvent } from 'react'
import { Form, InputGroup } from 'react-bootstrap';

interface Props  {
  onSearchSubmit:(e: SyntheticEvent)=>void;
  search:string|undefined;
  handleSearchChange:(e:ChangeEvent<HTMLInputElement>)=>void;
}

const Search :React.FC<Props>= ({onSearchSubmit,search,handleSearchChange}: Props) : JSX.Element=> {

    
  return (
  
      <section className="relative bg-gray-100">

        <Form onSubmit={onSearchSubmit}>
        <InputGroup id="search-input"
            
            onChange={handleSearchChange}>
          <Form.Control
            placeholder="Write"
            aria-label=""
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form>
      
    </section>
    

  )
}
export default Search;