let responce = {
    mainIngredients: null,
    otherIngredients: [],
    maxCookTime: undefined,
    minCalories: 0,
    maxCalories: undefined,
    servingSize: undefined,
    restrictions: {
        vegan: false,
        vegetarian: false,
        lowCarb: false,
        lowFat: false,
        peanutAlergy: false,
        nonAlcoholic: false,
    }
}

let mainIngredientCount = 0;
let otherIngredientCount = 0;

const appendIngredient = function(isMainIngredient){
    const node = document.createElement('li');
    const label = document.createElement('label');
    const labelText = document.createTextNode('Ingredients:');
    const textbox = document.createElement('input');
    textbox.type = 'textbox';
    if(isMainIngredient){
        textbox.className = 'main-ingredient';
    }else{
        textbox.className = 'other-ingredient';
    }
    label.appendChild(labelText);
    node.appendChild(label);
    node.appendChild(textbox);
    if(isMainIngredient){
        document.getElementById('main-ingredient-list').appendChild(node);
        mainIngredientCount++;
    }else{
        document.getElementById('other-ingredient-list').appendChild(node);
        otherIngredientCount++;
    }
}

const init = function(){
    document.getElementById('recipe-finder-form').addEventListener('keypress', function(e){
        if(e.key == 'Enter'){
            e.preventDefault();
        }
    })
    document.getElementById('main-ingredients').addEventListener('keypress', function(e){
        if(e.key == 'Enter'){
            e.preventDefault();
            if(document.querySelectorAll(".main-ingredient")[mainIngredientCount].value.length != 0){
                appendIngredient(true);
            }
        }
        
    }); 
    document.getElementById('other-ingredients').addEventListener('keypress', function(e){
        if(e.key == 'Enter'){
            e.preventDefault();
            if(document.querySelectorAll(".other-ingredient")[otherIngredientCount].value.length != 0){
                appendIngredient(false);
            }
        }
    }); 
    const timeIreleventBox = document.getElementById('time-does-not-matter');
    timeIreleventBox.addEventListener('click', function(e){
        if(timeIreleventBox.checked){
            document.getElementById('time-restriction').value = "";
        }
    });
    const minCaloryIreleventBox = document.getElementById('calory-min-does-not-matter');
    minCaloryIreleventBox.addEventListener('click', function(e){
        if(minCaloryIreleventBox.checked){
            document.getElementById('calory-restriction-min').value = "";
        }
    });
    const maxCaloryIreleventBox = document.getElementById('calory-max-does-not-matter');
    maxCaloryIreleventBox.addEventListener('click', function(e){
        if(maxCaloryIreleventBox.checked){
            document.getElementById('calory-restriction-max').value = "";
        }
    });
    document.getElementById('submit').addEventListener('click', submit);
}
const submit = function(event){
    event.preventDefault();
    const mainIngredients = document.querySelectorAll('.main-ingredient');
    const otherIngredients = document.querySelectorAll('.other-ingredient');
    let allMainIngredientString = '';
    for(i = 0; i < mainIngredients.length; i++){
        const ingredient = mainIngredients[i].value;
        if(ingredient.length != 0){
            allMainIngredientString += (ingredient + ', ');
        }
    }
    if(allMainIngredientString.length == 0){
        alert('please include at least one main dish');
        return;
    }
    responce.mainIngredients = allMainIngredientString;
    for(i = 0; i < otherIngredients.length; i++){
        responce.otherIngredients.push(otherIngredients[i].value);
    }
    const maxTime = document.getElementById('time-restriction').value;
    const minCalories = document.getElementById('calory-restriction-min').value;
    const maxCalories = document.getElementById('calory-restriction-max').value;
    const intendedServingSize = document.getElementById('ideal-portion-size').value;
    if(maxTime.length != 0){
        if(isNaN(maxTime)){
            alert("please enter a number for the time you are willing to take to cook");
            document.getElementById('time-restriction').value = "";
            return;
        }else{
            responce.maxCookTime = parseInt(maxTime);
        }
    }
    if(minCalories.length != 0){
        if(isNaN(minCalories)){
            alert("please enter a number for the minimum desired calories in your meal");
            document.getElementById('calory-restriction-min').value = "";
            return;
        }else{
            responce.minCalories = parseInt(minCalories);
        }
    }
    if(maxCalories.length != 0){
        if(isNaN(maxCalories)){
            alert("please enter a number for the maximum desired calories in your meal");
            document.getElementById('calory-restriction-max').value = "";
            return;
        }else{
            responce.maxCalories = parseInt(maxCalories);
        }
    }
    if(intendedServingSize.length != 0){
        if(isNaN(intendedServingSize)){
            alert("please enter a number your ideal serving size");
            document.getElementById('ideal-portion-size').value = "";
            return;
        }else{
            responce.servingSize = parseInt(intendedServingSize);
        }
    }
    const diets = document.querySelectorAll('.restriction');
    responce.restrictions.vegan = diets[0].checked;
    responce.restrictions.vegetarian = diets[1].checked;
    responce.restrictions.lowCarb = diets[2].checked;
    responce.restrictions.lowFat = diets[3].checked;
    responce.restrictions.peanutAlergy = diets[4].checked;
    responce.restrictions.nonAlcoholic = diets[5].checked; 

    location.replace('./recipes.html')
}
document.addEventListener('DOMContentLoaded', init);
