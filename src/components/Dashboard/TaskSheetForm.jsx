import React, { useState } from 'react'

const TaskSheetForm = () => {

    const [ingredientProfile, setIngredientProfile] = useState(false);
    const [seedkitchendate,setseedkitchendate] = useState('')

    const handleseedkitchendateChange = (e)=>{
        setseedkitchendate(e.target.value)
}
const [table,settable] = useState(false);
const handelseedKitchenselect = ()=>{
settable(true)
}


  return (
    <>
<div className="formcontains">
            <div className="recipeform_buttons_options">
              <button onClick={() => setIngredientProfile(!ingredientProfile)}>
                Seed Kitchen
              </button>
              <button>Master Kitchen</button>
              <button>Op Kitchen</button>
            </div>
            {ingredientProfile ? (
              <form className="form" id="recipe-designing">
                <div>
                  <label for="Receipe Name">date</label>
                  <input
                    type="date"
                    name="reciepeNameRD"
                    id="reciepeNameRD"
                    value={seedkitchendate}
                    onChange={handleseedkitchendateChange}
                    required
                  />
                </div>

                <div id="addmoreingredients" onClick={handelseedKitchenselect}>
                  select
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>

{table && (
  <div className="table-container">
            <h2>Task Sheet </h2>
            <br />
            <table className="recipe_table">
  <thead>
    <tr>
      <th rowspan="2">Time</th>
      <th colspan="2">Seed Kitchen</th>
      <th colspan="2">Master Kitchen</th>
      <th colspan="2">Op Kitchen</th>
    </tr>
    <tr>
      <th>Import</th>
      <th>Export</th>
      <th>Import</th>
      <th>Export</th>
      <th>Import</th>
      <th>Export</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12-1</th>
      <td>Value 1</td>
      <td>Value 2</td>
      <td>Value 3</td>
      <td>Value 4</td>
      <td>Value 5</td>
      <td>Value 6</td>
    </tr>
    <tr>
      <th>1-2</th>
      <td>Value 7</td>
      <td>Value 8</td>
      <td>Value 9</td>
      <td>Value 10</td>
      <td>Value 11</td>
      <td>Value 12</td>
    </tr>
    <tr>
      <th>2-3</th>
      <td>Value 13</td>
      <td>Value 14</td>
      <td>Value 15</td>
      <td>Value 16</td>
      <td>Value 17</td>
      <td>Value 18</td>
    </tr>
  </tbody>
</table>


            <div id="tabel_controllers">
              <div id="recipebutton_close" onClick={() => settable(false)}>
                cancel
              </div>
              <div id="recipebutton_save">Submit</div>
            </div>
          </div>
)}

    </>
  )
}

export default TaskSheetForm