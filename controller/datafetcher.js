const request = require("request");
const cheerio = require("cheerio");


module.exports.getDataFormFlipkart = (req, res) => {
     
    const type = req.query.product;
    const minValue = req.query.lowerlimit;
    const maxValue = req.query.upperlimit;
    const url = `https://www.flipkart.com/search?q=${type}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&as-pos=1&as-type=HISTORY&p%5B%5D=facets.fulfilled_by%255B%255D%3DPlus%2B%2528FAssured%2529&sort=popularity&p%5B%5D=facets.price_range.from%3D${minValue}&p%5B%5D=facets.price_range.to%3D${maxValue}`
    console.log(url);

    let brands = [];

    request(url, cb);




    function cb(error, response, html) {
        if (error) {
            console.error("Error: " + error);
        }
        else {
            handleHTML(html);
            console.log(brands);
            return res.render("category-analysis", {
                title: "Analysis Results | FAssist",
                fetchedData: brands,
                layout: "category-analysis.ejs"
            });;
        }
        return;
    }

    function handleHTML(html) {
        let $ = cheerio.load(html);
        let brandNames = $("._4rR01T");
        let brandsHREF = $("._1fQZEK");
        let brandsPrice = $("._30jeq3");
        let brandsDis = $("._3tbKJL");
        let brandsRating = $("._3LWZlK");
        let brandsImage = $(".CXW8mj img");
        let brandsReviews = $("._2_R_DZ span ._13vcmD+ span");




        for (let i = 0; i < brandNames.length; i += 1) {
            let brandDis = $(brandsDis[i]).find(" ._3I9_wc~._3Ay6Sb");
            let brand = {
                name: $(brandNames[i]).text(),
                href: "https://www.flipkart.com" + $(brandsHREF[i]).attr("href"),
                price: parseInt($(brandsPrice[i]).text().replace('₹', '').replaceAll(",", "")),
                discount: parseInt($(brandDis[0]).text().replace("% off", "")),
                rating: parseFloat($(brandsRating[i]).text()),
                reviews: parseInt($(brandsReviews[i]).text().replace("Reviews", "").replaceAll(",", "")),
                imageURL: $(brandsImage[i]).attr("src")
            }

            brands.push(brand);
        }
    }

}