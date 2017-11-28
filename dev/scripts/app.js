import React from 'react';
import ReactDOM from 'react-dom';
import RecipeSelector from './recipe-selector';




class App extends React.Component {
    render() {
      return (
        <div>
          <RecipeSelector />
          {/* <SavedRecipes /> */}
        </div>
      )
    }
}

//create three sections, one to toggle through random recipes, one to have the user check off ingredients, and one to display the recipe + grocery list
//create a sidebar that allows the user to store their recipe + grocery list, must be deletable/expandable
//on the first section, the user needs to be able to toggle through the recipes, probably with a flickity slider?
//have a button that allows the user to select a recipe and proceed to the second section
//on the second section, have a checkbox with all the ingredients so user can select which ones that have, have a submit button so that on section three it can generate a grocery list, also have a go back button if the user decides they want a different recipe
//upon submit of the previous section, generate a grocery list as well as the recipe + photo, give the user the option to save this list+recipe, on click of save button a link appears in the left hand column that the user can later click on that will bring up the list and recipe
//have a button that has a "choose another recipe" option to discard the list and bring the user back to section one

ReactDOM.render(<App />, document.getElementById('app'));
