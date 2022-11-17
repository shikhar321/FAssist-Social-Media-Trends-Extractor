(() => {

    console.log("script loaded");


    var ratings = [];
    var products = [];
    var prices = [];

    var avgRating = 0;
    var highestRating = 0;
    var avgPrize = 0;
    var highestPirze = 0;
    var lowestPrize = 1000000000000;
    var maxDis = 0 ; 

    for (let data of dataFetched) {
        ratings.push(data.rating);
        products.push(data.name.slice(0, 20) + "...");
        prices.push(data.price);


        avgRating += data.rating;
        highestRating = Math.max(highestRating, data.rating);
        avgPrize += data.price;
        highestPirze = Math.max(highestPirze, data.price);
        lowestPrize = Math.min(lowestPrize, data.price);
        maxDis = Math.max(maxDis , data.discount) ; 

    }

    avgPrize /= dataFetched.length;
    avgPrize = avgPrize.toFixed(2)
    avgRating /= dataFetched.length;
    avgRating = avgRating.toFixed(1)

    console.log(avgPrize + " " + avgRating + " " + highestPirze + " " + highestRating + " " + lowestPrize);

    document.getElementById("avg-rating").innerHTML += avgRating;
    document.getElementById("highest-rating").innerHTML += highestRating;
    document.getElementById("avg-prize").innerHTML += avgPrize;
    document.getElementById("highest-prize").innerHTML += highestPirze;
    document.getElementById("lowest-prize").innerHTML += lowestPrize;


    var myChart1 = document.getElementById("myChart1").getContext("2d");
    var chart = new Chart(myChart1, {
        type: "line",
        data: {
            labels: products,
            datasets: [
                {
                    label: "Product Ratings",
                    data: ratings,
                    backgroundColor: "#f1c40f "
                }
            ]
        }
    });


    var myChart2 = document.getElementById("myChart2").getContext("2d");
    var chart = new Chart(myChart2, {
        type: "line",
        data: {
            labels: products,
            datasets: [
                {
                    label: "Product Prices",
                    data: prices,
                    backgroundColor: "#f15bb5"
                }
            ]
        }
    });


    function comparatorFunction(a, b) {
        if (a.rating == b.rating) {
            return b.reviews - a.reviews;
        }
        return b.rating - a.rating;
    }

    dataFetched.sort(comparatorFunction);



    for (let i = 0; i < 5; i += 1) {
        document.getElementById("top-performer-container").innerHTML +=
            `
        <a class="top-performer border border-3 border-primary rounded-2 mb-5 bg-dark" href="${dataFetched[i].href}" target ="_blank">
                <div class="product-image">
                    <div class="product-rating">
                        <i class="fas fa-star-half-alt"></i> &nbsp;${dataFetched[i].rating}
                    </div>
                    <img src="${dataFetched[i].imageURL}" height="90%" width="60%">
                </div>
                <div class="product-name text-info fw-bolder">
                    ${dataFetched[i].name}
                </div>
                <div class="product-addition-info">
                    <p class ="fs-5 fw-bolder text-warning">
                        Prize: ₹${dataFetched[i].price}
                    </p>

                    <p class ="fs-5 fw-bolder text-warning">
                        Discount: ${dataFetched[i].discount}%
                    </p>
                    
                </div>
    
            </a>
        
        
        ` ;
    }

    let topProducts = [];
    let maxPrize = 0 ; let maxIndex = 0 ; 
    let minPrize = 10000000 ; let minIndex = 0 ; 
    let index = 0 

    for (let data of dataFetched) {
        if (data.rating == highestRating) {
            topProducts.push(data);
        }
    }

    console.log(topProducts);

    for(let data of topProducts){
        if(maxPrize < data.price){
            maxPrize = data.price ; 
            maxIndex = index ; 
        }
        else if(minPrize > data.price){
            minPrize = data.price ; 
            minIndex = index ; 
        }
        index += 1 ; 
    }
    console.log(topProducts[minIndex] + " " + topProducts[maxIndex] ) ; 

    if (topProducts.length == 1) {
        document.getElementById("our-advise").innerHTML += `
            <ul class="fs-5 fw-bold text-success">
                <li>The Top Performer of this Segment is ${topProducts[0].name} with a prize of ₹${topProducts[0].price} at a discount of ${topProducts[0].discount}% with ratings of ${topProducts[0].rating}.</li><br>
                <li>According to our Algo, the only way to dominate this segment is to sell your product at a price less than the dominant product so keep prize arround: ₹${topProducts[0].price}</li><br>
                <li>Also, try to have the features that are additional for this segment or try to have similar features to the dominant product.</li><br>
                <li>Try adjusting the Marked Prize so that you are able to give the discount of ${maxDis}%(max discount among Top ${dataFetched.length} Product) and still have Cost Prize arround ₹${topProducts[0].price}</li><br>

            </ul>
        `
    }

    else{
        if(topProducts[minIndex].reviews > topProducts[maxIndex].reviews){
            document.getElementById("our-advise").innerHTML += `
            <ul class="fs-5 fw-bold text-success">
                <li>The Top Performer of this Segment is ${topProducts[minIndex].name} with a prize of ₹${topProducts[minIndex].price} at a discount of ${topProducts[minIndex].discount}% with ratings of ${topProducts[minIndex].rating}.</li><br>
                <li>According to our Algo, the only way to dominate this segment is to sell your product at a price less than or equal to the dominant product i.e. ₹${topProducts[minIndex].price} because it has Highest Projected Buying and having a affordable prize than all other products with Highest ratings.</li><br>
                <li>Also, try to have the features that are additional for this segment or try to have similar features to the dominant product as well as try to incalcate the feature of the ${topProducts[maxIndex].name} as it is the most expensive product of similar rating.</li><br>
                <li>Try adjusting the Marked Prize so that you are able to give the discount of ${maxDis}%(max discount among Top ${dataFetched.length} Product) and still have Cost Prize arround ₹${topProducts[minIndex].price}</li><br>
            </ul>
        `
        }
        else{
            let avg = (topProducts[minIndex].price + topProducts[maxIndex].price) / 2 ; 
            avg = avg.toFixed(2) ;
            document.getElementById("our-advise").innerHTML += `
            <ul class="fs-5 fw-bold text-success">
                <li>The Top Performer of this Segment is ${topProducts[maxIndex].name} with a prize of ₹${topProducts[minIndex].price} at a discount of ${topProducts[minIndex].discount}% with ratings of ${topProducts[minIndex].rating}.</li><br>
                <li>According to our Algo, the only way to dominate this segment is to sell your product at a price arround ₹${avg} which is average prize of the most expensive and affordable products with highest rating. This will attract the customer by making them believe that your product is better to buy as it is better than affordable product and also better option for the expensive one.</li><br>
                <li>Also, try to have the features that are additional for this segment or try to have similar features to the dominant product i.e. the feature of the ${topProducts[maxIndex].name} as it is the most expensive product along with Highest Projected Buying.</li><br>
                <li>Try adjusting the Marked Prize so that you are able to give the discount of ${maxDis}%(max discount among Top ${dataFetched.length} Product) and still have Cost Prize arround ₹${avg}</li><br>
            </ul>
        `

        }
    }


})()