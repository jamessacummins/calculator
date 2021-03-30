function a(){};
let Results = {
    
    data: [
        {
            name:"Scissorlift 3.0 m (10 ft) Manual",
            category:"Scissor Lifts",
            rate:250,
            rateUnit:"day",
            delivery:233,
            cost:1000,
        },
        {
            name:"Pressure Washer - Electric 415",
            category:"Water Blasters",
            rate:414,
            rateUnit:"day",
            delivery:134,
            cost:2000,
        },
        {
            name:"Air Needle Gun",
            category:"Air Tools",
            rate:144,
            rateUnit:"day",
            delivery:228,
            cost:903469,
        },
        {
            name:"Concrete Grinder - Planetary 500 Series",
            category:"Concrete Floors",
            rate:359,
            rateUnit:"day",
            delivery:189,
            cost:4000,
        },
        {
            name:"Concrete Grinder - Single Head Heavy Duty 240V",
            category:"Concrete Floors",
            rate:59,
            rateUnit:"day",
            delivery:157,
            cost:400,
        },
    ],
    currentSelection: -1,
    currentCategory: "",
    categories:[],
    days: new Number(),
    searchInput: "",
    daysInputHTML: document.querySelector("#days-input"),
    searchInputHTML: document.querySelector("#search-input"),
    resultsHTML: document.querySelector("#results"),
    totalsHTML: document.querySelector(".total-container"),
    calculationsDefaultHTML: document.querySelector("#calculations-default"),
    calculationsHTML: document.querySelector("#calculations"),
    fillCategories: function() {
        this.data.forEach(
            (datum) => {
                let toBeAdded = datum.category;
                if(!this.categories.includes(toBeAdded)){
                    this.categories.push(toBeAdded);
                };
                
            }
        )
    },
    updateResultsHTML: function() {
        this.resultsHTML.innerHTML = "";
        this.data.forEach(
            (datum) => {
                let isCurrentCategory = 
                    this.currentCategory == "" ||
                    this.currentCategory == datum.category;
                ;

                let isMatchingSearch = 
                    datum.name.toLowerCase().includes(this.searchInput)
                    || 
                    this.searchInput == "";
                

                
                if(isCurrentCategory && isMatchingSearch){
                    let tempResultHTML = document.createElement("div");
                    tempResultHTML.innerHTML = `
                        <p>${datum["name"]}<p>
                    `;
                    tempResultHTML.setAttribute("index",`${this.data.indexOf(datum)}`);
                    tempResultHTML.setAttribute("onclick","Results.updateCurrentSelection(this)");
                    tempResultHTML.classList.add("result");
                    this.resultsHTML.appendChild(tempResultHTML);
                };
            }
        );
        if(this.currentSelection != -1){
            let currentIndex = this.currentSelection.getAttribute("index");
            let newSelection = document.querySelector(`div[index="${currentIndex}"]`);
            console.log(newSelection)
            if(newSelection != null)
              this.currentSelection = newSelection;
            this.currentSelection.classList.add("selected-result");
            console.log(this.currentSelection);
        };
    },
    validateDaysAreNumbers: function(days){
        for (var i = 0; i < days.length; i++) {
            day = days.charAt(i);
            if(isNaN(day))
                return false;
          }
        return true;
    },
    startListening: function(){
        this.daysInputHTML.addEventListener(
            "keyup", 
            (e) => {
                if( this.validateDaysAreNumbers(e.target.value) ){
                    this.days = e.target.value;
                    if(this.currentSelection != -1)
                        this.updateCalculationsHTML();
                        
                } else {
                    alert("Please only enter numerical values!");
                };
                
            }
        );
        this.searchInputHTML.addEventListener(
            "keyup", 
            (e) => {
                this.searchInput = e.target.value.toLowerCase();
                this.updateResultsHTML();  
            }
        );
    },
    updateCurrentSelection: function(justClicked) {
        if(this.currentSelection != -1){
            this.currentSelection.classList.remove("selected-result");
        }
        justClicked.classList.add("selected-result");
        this.currentSelection = justClicked;
        this.updateCalculationsHTML();
    },
    updateCalculationsHTML: function() {
        let currentIndex = this.currentSelection.getAttribute("index");
        this.calculationsDefaultHTML.style.display = "none";
        
        let {name, rate, rateUnit, delivery, cost} = this.data[currentIndex];
        let timeQuantity = this.days == 0 ? 30 : this.days;
        let timeUnit = rateUnit;
        if(timeQuantity != 1)
            timeUnit = timeUnit.concat("s");
        let hireCost = rate * timeQuantity;
        hireCost += delivery;
        let breakPoint = cost / timeQuantity;
        breakPoint = Math.round(breakPoint);
       
        let calculationsString = `
            The cost of renting a <strong> ${name} </strong> for ${timeQuantity} ${timeUnit} is $${hireCost}.
            <br><br>
            The cost of buying it is $${cost}.
            <br><br>
            It would take ${breakPoint} days of use before buying becomes a worthwhile economic decision.
        `;
        this.calculationsHTML.innerHTML = calculationsString;

    },
};

Results.fillCategories();
Results.updateResultsHTML();
Results.startListening();