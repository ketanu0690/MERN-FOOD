import React, { useState,useEffect } from 'react'
import {searchPurchaseOrder} from '../../utils/ApiCall'
const PurchaseOrderForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
      };
    
      const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
      };

      const handleViewPurchaseOrder = async (event) => {

        event.preventDefault()
        setIsLoading(true)
        let bodyContent = JSON.stringify({
          "startDate": startDate,
        });
    
        const response = await searchPurchaseOrder(bodyContent);
        console.log(response)

        if(response){
          setIsLoading(false)
        }
    
        if (response.status === 401) {
          alert("Date Not Present ");
          return;
        }
    
        setShowTable(true);
        setData(response);
      };

      // useEffect(() => {
      //   if (data) {
      //     const result = data.ingredients?.reduce((acc, curr) => {
      //       curr.ingredients.forEach((ingredient) => {
      //         const name = Object.keys(ingredient)[0];
      //         const value = Object.values(ingredient)[0];
      //         if (!acc[name]) {
      //           acc[name] = { unit: curr.unit, total: 0 };
      //         }
      //         acc[name].total += value;
      //       });
      //       return acc;
      //     }, {});
      
      //     setSortedData(result);
      //     setShowTable(true);
      //   }
      // }, [data]);
      

      
  return (
    <>
<div className="formcontains">
            <h1>View Purchase Order</h1>
            <form
              action=""
              class="form"
              name="inventory-purchase-log"
              id="inventory-purchase-log"
              method="post"
              onSubmit={handleViewPurchaseOrder}
            >
              <div className="option_container">
                <label htmlFor="start-date-input">Select Date:</label>
                <input
                  type="date"
                  id="start-date-input"
                  value={startDate}
                  onChange={handleStartDateChange}
                  required
                />
              </div>

              {/* <div className="option_container">
                <label htmlFor="end-date-input">End Date:</label>
                <input
                  type="date"
                  id="end-date-input"
                  value={endDate}
                  onChange={handleEndDateChange}
                  required
                />
              </div> */}

              <div class="button-container">
                <input
                  
                  id="addmoreingredients"
                  type="submit"
                  name="submit"

                  value={"View Purchase Order"}
                >
                 
                </input>
              </div>
            </form>
          </div>
{isLoading?(<>Loading...</>):(<></>)}
<br />
          {showTable && (
          <div className="table-container"  id='yourpurchaseorder'>
            <h2>Purchase Order</h2>
            <br />
            
            <table className="recipe_table">
  <thead>
    <tr>
      {/* <th>Date</th> */}
      <th>Ingredients</th>
      <th>Quantity</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody id="purchaseorder_table">
  {Array.isArray(data.data) && data.data.map((item, index) => (
    <tr key={index}>
      <td>{item.ingredient}</td>
      <td>{item.quantity}</td>
      <td>{item.unit}</td>
    </tr>
  ))}
</tbody>


</table>


          </div>
        )}

    </>
  )
}

export default PurchaseOrderForm