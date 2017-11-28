import React from 'react';
import axios from 'axios';
import SavedRecipes from './saved-recipes';


class RecipeSelector extends React.Component {
    constructor() {
        super()
        this.state = {
            image_url: '',
            recipe_name: '',
            recipeUrl: '',
            ingredientList: '',
            showRecipe: false,
            firebaseArray: []
        }
        this.refreshPage = this.refreshPage.bind(this);
        this.displayRecipe = this.displayRecipe.bind(this);
        this.savedRecipes = this.savedRecipes.bind(this);
        this.getNameUrl = this.getNameUrl.bind(this);
    }
 

    componentDidMount () {
        axios.get('http://api.yummly.com/v1/api/recipes', {
            params: {
                _app_key: '0827bd8424e3ad1432cc27d19823deda',
                _app_id: '051fb3a8',
                requirePictures: true,
                maxResult: '200',
                start: '0'
            }
        })
        .then((res) => {
            let randomRecipe = res.data.matches[Math.floor(Math.random() * 199)];
            let recipeId = randomRecipe.id;
            this.getRecipeInfo(recipeId);
        });
        
        var dbRef = firebase.database().ref();
        dbRef.on('value', (data) => {
            console.log(data.val());
            const dataValue = data.val();
            this.getNameUrl(dataValue);
        });
    }

    getNameUrl(recipe) {
        console.log('recipe', recipe);
        recipe = recipe.recipes;
        let newArray = [];
        for(let prop in recipe) {
            console.log('prop', recipe[prop]);
            newArray.push(recipe[prop]);
            
        }
        console.log(newArray);
        this.setState({firebaseArray: newArray});
    }

    getRecipeInfo(id) {
        axios.get(`http://api.yummly.com/v1/api/recipe/${id}`, {
            params: {
                _app_key: '0827bd8424e3ad1432cc27d19823deda',
                _app_id: '051fb3a8' 
            }
        }).then((res) => {
            // console.log(res.data.ingredientLines);
            // console.log(res.data.source.sourceRecipeUrl);
            // console.log(res.data.name);
            // console.log(res.data.images[0].hostedLargeUrl);
            let imageUrl = res.data.images[0].hostedLargeUrl;
            let recipeName = res.data.name;
            let recipeUrl = res.data.source.sourceRecipeUrl;
            let ingredientList = res.data.ingredientLines;
            this.setState({image_url: imageUrl});
            this.setState({recipe_name: recipeName});
            this.setState({recipeUrl});
            this.setState({ingredientList});
            console.log(imageUrl);
            
        })
    }

    refreshPage() {
        window.location.reload();
        console.log('This is working');
    }

    displayRecipe() {
        this.setState({showRecipe: true});
    }

    // resetRecipe() {
    //     this.setState({showRecipe: false});
    // }

    displayRecipeMarkup() {
        //if this .set state is true, return
       // <div></div>
       if(this.state.showRecipe === true) {
           return (
               <div className="selected">
                   <div className="firstDiv">
                   <h3>{this.state.recipe_name}</h3>
                   {<img src={this.state.image_url} alt=""/>}
                   <p>Link to recipe instructions:</p>
                   <a href="{this.state.recipeUrl}">{this.state.recipeUrl}</a>
                   
                   <button onClick={this.savedRecipes}>Save this recipe</button>
                   <button onClick={this.refreshPage}>Go back</button>

                   </div>
                   <div className="secondDiv">
                    <ul>
                        {this.state.ingredientList.map((ingredient) => {
                            return <li>{ingredient}</li>
                        })}
                    </ul>

                   </div>
                   {/* push this state to firebase, create a seperate method that takes info and pushes it to firebase on click of save this recipe */}
               </div>
           )
       }
    }

    savedRecipes() {
        var dbRef = firebase.database().ref('/recipes');
        dbRef.push({
            name: this.state.recipe_name,
            image: this.state.image_url,
            url: this.state.recipeUrl,
            ingredients: this.state.ingredientList
        })
    }


    
    render() {
        // return (
        //     console.log('hi', this.state.firebaseArray)
        // )
        console.log(this.state);
        const items = this.state.firebaseArray;
        
        if(this.state.showRecipe === false) {
            // console.log('hi', this.state.firebaseArray)
            return (
                <div className="parent">

                    <input type="checkbox" id="toggle" className="toggle" />
                    <aside class="saved">
                        {<SavedRecipes nameUrl={this.state.firebaseArray} />}
                        {items.map((item, i) => {
                            return (
                                <div key={i}>
                                    <p className="name">{item.name}</p>
                                    <a href="{item.url}">{item.url}</a>
                                </div>
                            )
                        })}
                    </aside>    
                    <label for="toggle"><img src="images/arrow_off_state.png"/>Recipe List</label>
                    <div className="main">
                        <h1>Hungry?</h1>
                        <p>Browse our selection of recipes and save your favourites so you can get cooking!</p>
                        <h3>{this.state.recipe_name}</h3>
                        <div className="image-button">
                            {<img src={this.state.image_url} alt="" />}
                            <div className="button-wrapper">
                            <button onClick={this.refreshPage}>Get different recipe</button>
                            <button onClick={this.displayRecipe}>Select this recipe</button>
                            </div>
                        </div>
                        {this.displayRecipeMarkup()}
                    </div>


                </div>
            )
        } else {
            return (
                <div className="parent">
                    <input type="checkbox" id="toggle" className="toggle" />
                    <aside class="saved">
                        {<SavedRecipes nameUrl={this.state.firebaseArray} />}
                        {items.map((item, i) => {
                            return (
                                <div key={i}>
                                    <p>{item.name}</p>
                                    <p>{item.url}</p>
                                </div>
                            )
                        })}
                    </aside>  
                    {this.displayRecipeMarkup()}
                    {/* <SavedRecipes nameUrl={this.state.firebaseArray} /> */}
                    
                </div>
            )
        }
    }
}

export default RecipeSelector;