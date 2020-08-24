const apiKey = "NCwySbnJ2-POULIhvZVTRJqyabpFvqbQhkN8ChA7AVlt0cx5ftg7fT1pfBEdG9ZKgj3yFzxd7hpW3wSscKL7BCgs5adHke6DSXvdo5rY1cnckMnGeXCMv8wDrYJDX3Yx"

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            if (jsonResponse.businesses) {
                //console.log(jsonResponse.businesses)
                return jsonResponse.businesses.map((business)=> {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                })
            }
            throw new Error(Error.message)
        });
    }
}

export default Yelp