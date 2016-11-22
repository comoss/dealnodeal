class dealOrNoDeal {
    public static main() {

        const boardsContainer = document.getElementById("boardsContainer");

        document.getElementById("newGame").addEventListener("click", () => {
            const name = (<HTMLInputElement>document.getElementById("gameName")).value.trim();
            const b = new board(name);
            b.populateValues(boardsContainer);
        });
    }
}

class briefcase {
    button: HTMLAnchorElement;
    value: number; 
    status: boolean;

    constructor(amount: number) {
        this.value = amount;

        this.button = document.createElement("a");
        this.button.innerText = formatStrings.currency(amount);
        this.button.className = "btn btn-primary";
        this.button.style.width = "102px";
        this.button.style.color = "white";
        this.button.style.borderRadius = "0px";

        this.status = true; 
    }
}

class board {
    name: string;
    dollarAmounts: number[];
    cases: briefcase[];
    boardContainer: HTMLDivElement;
    currentOffer: HTMLParagraphElement; 

    constructor(name) {
        this.name = name;

        this.boardContainer = document.createElement("div");
        this.boardContainer.className = "col-xs-12 col-md-6";

        this.dollarAmounts = [10, 20, 30, 40, 50, 60, 75, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000];
        this.cases = [];

        this.currentOffer = document.createElement("p");
        this.currentOffer.className = "text-xs-center text-success font-weight-bold";
        this.currentOffer.innerText = "$0";
    }

    populateValues(displayDiv) {
        this.boardContainer.insertAdjacentHTML("AfterBegin", `<h4 class="text-xs-center">${this.name}</h4>`); 
        for (let c of this.dollarAmounts) {
            const Briefcase = new briefcase(c);
            Briefcase.button.addEventListener("click", () => {
                if (Briefcase.status === true) {
                    Briefcase.status = false;
                    Briefcase.button.className = "btn btn-danger"
                } else {
                    Briefcase.status = true;
                    Briefcase.button.className = "btn btn-primary"
                }

                this.currentOffer.innerText = formatStrings.currency(this.calculateOffer());
            })
            this.cases.push(Briefcase);
            this.boardContainer.appendChild(Briefcase.button);
            this.boardContainer.appendChild(this.currentOffer);
        }
        
        displayDiv.appendChild(this.boardContainer)
    }

    calculateOffer(): number {
        let AmountActive: number = 0;
        let median: number = 0;

        for (let c of this.cases) {
            if (c.status === true) {
                AmountActive++
                if (AmountActive === 26) {
                    median = 0;
                } else {
                    median = median + c.value;
                }
            } 
        }

        return median / AmountActive; 
    }
}

dealOrNoDeal.main(); 

module formatStrings {
    // currency formatter: $140.23
    export function currency(currencyString: any): string {
        return currencyString.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }
};
