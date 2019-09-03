// const food=["BLT", "hamburger", "salad", "hot dog", "cheesecake"]

// food.forEach(singlefoods => {
//     console.log(singlefoods)
// });

// console.log(food)

// console.log("food")

const foodContainer = (document.querySelector(
	"body"
).innerHTML = `<section id="foodContainer"></section>`);

fetch("http://localhost:8088/food")
	.then(foods => foods.json())
	.then(parsedFoods => {
		const buildHTML = (elementParam, classParam, stringParam) =>
			`<${elementParam} class="${classParam}">${stringParam}</${elementParam}>`;

        let foodListString = ``;
        let ingredientString = ``;

		parsedFoods.forEach(food => {
			foodListString = buildHTML(
				"ul",
				"foodList",
				`
            <li class="foodItem">
            ${food["name"]}
            <br>
            <br>
            ${food["category"]}
            <br>
            ${food["ethnicity"]}
            <br>
            ${food["barcode"]}
            </li>
            `
            );
            
			fetch(
				`https://world.openfoodfacts.org/api/v0/product/${food["barcode"]}.json`
			)
				.then(response => response.json())
				.then(productInfo => {

                    ingredientString = buildHTML("div", "ingredientList", 
                    `
                    <p class="ingredientItem">
                    ${productInfo.product.ingredients_text}
                    </p>
                    `)

					if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text;
					} else {
						food.ingredients = "no ingredients listed";
                    }
                    
                    document.querySelector("#foodContainer").innerHTML += foodListString + ingredientString
				});
		});
	});
