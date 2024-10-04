import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { StockGet, StockPost } from '../../Models/Stock';
import { stockAddAPI, stockDeleteAPI, stockGetAPI } from '../../Services/StockService';

interface Props {}


const AdminPage = (props: Props) => {

    const[nameS,setName]=useState<string>("");
    const[descriptionS,setDescription]=useState<string>('');
    const[categoryS,setCategory]=useState<string>('');
    const[photoS,setPhoto]=useState<string>('');

    const StockElement: StockPost={name:nameS,
        description:descriptionS,
        category:categoryS,
        photo:photoS
    }
    const [search,setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<StockGet[] | null>(
      []
    );
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

const onPortfolioCreate=()=>{
    console.log(StockElement)
  stockAddAPI(StockElement)
  .then((res) => {
    if (res?.status === 204) {
      //toast.success("Stock added to portfolio!");
      console.log("Stock added to portfolio!");
      getPortfolio();
    }
  })
  .catch(() => {
    console.log("some error")
    //toast.warning("Could not add stock to portfolio!");
  });
};
//console.log(StockElement)


    
  return (
    <>
         <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name </Form.Label>
        <Form.Control onChange={(e)=>setName(e.target.value)} placeholder="Введите название" />
      </Form.Group>

      <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label> Description</Form.Label>
        <Form.Control onChange={(e)=>setDescription(e.target.value)} as="textarea" rows={3} />
      </Form.Group>

      <Form.Group  className="mb-3">
        <Form.Label>Category </Form.Label>
        <Form.Control onChange={(e)=>setCategory(e.target.value)} placeholder="Введите категорию" />
      </Form.Group>

      <Form.Group  className="mb-3">
        <Form.Label>Photo </Form.Label>
        <Form.Control onChange={(e)=>setPhoto(e.target.value)} placeholder="Введите ссылку на фото" />
      </Form.Group>
      <Button onClick={onPortfolioCreate}> Save </Button>

    </Form>


    </>  
)
}

export default AdminPage