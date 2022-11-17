const request = require("request");
const cheerio = require("cheerio");

module.exports.getMatchForFlipkart = (req , res) => {
    


    (async () => {
        let word = req.params.search.split(" ") ;
        const search = req.params.search.replaceAll(" " , "%20") ;
        const url = `https://www.flipkart.com/search?q=${search}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`
        console.log(url);

        let data;

        request(url, cb);

        async function cb(error, response, html) {
            if (error) {
                console.error("Error: " + error);
            }
            else {
                await handleHTML(html);
                console.log(data) ;
                res.render("trend-on-flipkart" , {
                    data : data ,
                    layout: "trend-on-flipkart.ejs" , 
                    title : "Flipkart Results | FAssit"
                }) ; 
            }
            return;
        }

        async function handleHTML(html) {
            let $ = cheerio.load(html);
            
            let imageURLs = $("._2r_T1I");
            let companyNames = $("._2WkVRV");
            let prizes = $("._30jeq3");
            let nameAndHref = $(".IRpwTa");
            let subcategory = $("._3eWWd-");
            let flipMap = $("._2whKao");

            let brands = [];



            for (let i = 0; i < imageURLs.length; i += 1) {
                var result = {
                    imageURL: $(imageURLs[i]).attr("src").replace("/0/0/" ,"/452/542/"),
                    companyName: $(companyNames[i]).text(),
                    prize: $(prizes[i]).text(),
                    name: $(nameAndHref).text(),
                    href: "https://www.flipkart.com" + $(nameAndHref[i]).attr("href"),
                    subcategory: $(subcategory[i]).text()
                }

                brands.push(result);
            }
             
            data = {
                category: $(flipMap[1]).text().toUpperCase(),
                subcategory: $(flipMap[2]).text().toUpperCase(),
                vertical: $(flipMap[3]).text().toUpperCase(),
                attributetype:  word[word.length-1].toUpperCase(),
                attributeValue:  req.params.search.toUpperCase(),
                brands: brands
            }


            return;
        }


    })();
}