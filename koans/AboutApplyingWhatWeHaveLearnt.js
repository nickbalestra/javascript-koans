var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var noNuts = function(pizza){
        return pizza.containsNuts === false;
      };

      var noMushroom = function(pizza) {
        return _(pizza.ingredients)
          .all( function(ingredient) {return ingredient !== "mushrooms"} );
      };


      productsICanEat = _(products).filter(noNuts).filter(noMushroom);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */
    var sum = _.range(1000)
              .reduce(function (sum, x) {
                return (x % 3 === 0 || x % 5 === 0) ? sum + x : sum;
              });

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var test = _(products).chain()
      .map( function(item){ return item.ingredients; } )
      .flatten()
      // TODO try to reduce instead as suggested
      .each(function (ingredient) {
                ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
              })
      .value();


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {

    var factors = function(compositeNumber){
      var results = [];
      var i;
      var max = compositeNumber / 2;
      for(i = 2; i <= max ; i++) {
        if (compositeNumber % i === 0) {
          results.push(i);
        }
      }
      return results;
    };

    var isPrime = function(n) {
      return factors(n).length === 0;
    }

    var largestPrime = function(n) {
      return factors(n).filter(isPrime).pop();
    }

    expect(largestPrime(21)).toBe(7);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    // A palindrome is a word, or a number, that can be read both from head to end and from end to head
    var isPalindrome = function(number) {
      var toTest = number.toString();
      for (var i = 0; i < Math.floor(toTest.length / 2); i++)
        if (toTest[i] !== toTest[toTest.length - 1 - i]) {
          return false;
        }
      return true;
    };

    var largest = function(){
      for(var i = 999; i > 99; i--) {
        for(var j = 999; j > 99; j--) {
          if (isPalindrome(i*j)){
            return {  "firstNumber" : i,
                      "secondNumber": j,
                      "palindrome": i*j
                    };
          }
        }
      }
    };

    expect(largest().palindrome).toBe(580085);
  });



  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sum = function(a,b) {
      return a + b;
    };

    var square = function(a) {
      return a * a;
    }


    var difference = function(numbers){
      var sumOfSquares = _(numbers)
        .map( function(num){return num*num} )
        .reduce(sum);

      var squareOfSums = square(_(numbers).reduce(sum));

      return squareOfSums - sumOfSquares;
    };

    expect(difference([2,3,4])).toBe(52);
  });

  it("should find the 10001st prime", function () {
  // Useful resource to have some data to check against: https://primes.utm.edu/nthprime

    var factors = function(compositeNumber){
      var results = [];
      var i;
      var max = compositeNumber / 2;
      for(i = 2; i <= max ; i++) {
        if (compositeNumber % i === 0) {
          results.push(i);
        }
      }
      return results;
    };

    var isPrime = function(n) {
      return factors(n).length === 0;
    }

    var primes = [];
    var count = 2;
    while(primes.length < 10001) {
      if (isPrime(count)) {
        primes.push(count);
      }
      count++;
    };

    expect(primes.pop()).toBe(104743);
  });

});
