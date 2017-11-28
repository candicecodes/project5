import React from 'react';

class SavedRecipes extends React.Component {
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    // }
    render() {
        // console.log('props', this.props);
        //loop through the props array with map and print each one/put each in p or li tag?
        // console.log(this.props.firebaseArray);
        
        return (
            <aside>
                <h3>Saved Recipes</h3>
                <ul>
                    {/* {const items = this.state.firebaseArray;
                    items.map((item, i) => {
                        return (
                            <li key={i}>
                                <p>{item.name}</p>
                                <p>{item.url}</p>
                            </li>
                        )
                        })} */}
                    
                    {/* display saved recipes in li */}
                </ul>
            </aside>
        )
    }
}

export default SavedRecipes;