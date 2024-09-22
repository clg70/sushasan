import Types "../Types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

import HashIt "HashIt";
module {
  public type Res2 = {
    user : Types.User;
    budget : Types.Budget;
  };

  public func add(users : Types.Users, token : Text, fiscalYear : Text, totalAmt : Int, createdAt : Text) : async ?Res2 {
    switch (users.get(token)) {
      case (?user) {
        if (user.role == "admin") {
          let newBudget : Types.Budget = {
            fiscalYear = fiscalYear;
            totalAmt = totalAmt;
            remAmt = totalAmt;

            createdAt = createdAt;
          };
          var preBudget = HashMap.fromIter<Text, Types.Budget>((user.budgets).vals(), 0, Text.equal, Text.hash);
          preBudget.put(fiscalYear, newBudget);
          let updatedUser : Types.User = {
            id = user.id;
            username = user.username;
            password = user.password;
            name = user.name;
            nid = user.nid;
            czid = user.czid;
            role = user.role;
            balance = user.balance + totalAmt;
            transactions = user.transactions;
            budgets = Iter.toArray(preBudget.entries());
            properties = user.properties;
            createdAt = user.createdAt;

          };
          let response : Res2 = {
            user = updatedUser;
            budget = newBudget;
          };
          return ?response;
        };
        null;
      };
      case (null) { null };
    };
  };

  public func getCurrentBdget(budgets : Types.Budgets, year : Text) : async ?Types.Budget {
    switch (budgets.get(year)) {
      case (?budget) {
        return ?budget;
      };
      case (null) { null };
    };
  };

  public type Response = {
    budget : Types.Budget;
    to : Types.User;
    transaction : Types.Transaction;
    from : Types.User;
  };

  public func allocateBudget(budgets : Types.Budgets, users : Types.Users, from : Text, to : Text, amount : Int, fiscalYear : Text, date : Text, id : Text) : async ?Response {
    switch (users.get(from)) {
      case (?from) {
        switch (users.get(to)) {
          case (?too) {
            var preBudget = HashMap.fromIter<Text, Types.Budget>((too.budgets).vals(), 0, Text.equal, Text.hash);

            switch (preBudget.get(fiscalYear)) {
              case (?value) {
                let newBudget : Types.Budget = {
                  fiscalYear = fiscalYear;
                  totalAmt = value.totalAmt + amount;
                  remAmt = value.remAmt + amount;
                  createdAt = date;
                };

                preBudget.put(fiscalYear, newBudget);

                var transactions = HashMap.fromIter<Text, Types.Transaction>((too.transactions).vals(), 0, Text.equal, Text.hash);

                var newTransactions : Types.Transaction = {
                  id = await HashIt.hash(id);
                  from = from;
                  to = too;
                  amount = amount;
                  purpose = "Budget Allocation.";
                  date = date;
                };

                transactions.put(newTransactions.id, newTransactions);

                let updatedTo : Types.User = {
                  id = too.id;
                  username = too.username;
                  password = too.password;
                  name = too.name;
                  nid = too.nid;
                  czid = too.czid;
                  role = too.role;
                  balance = too.balance + amount;
                  transactions = Iter.toArray(transactions.entries());
                  budgets = Iter.toArray(preBudget.entries());
                  properties = too.properties;
                  createdAt = too.createdAt;
                };

                preBudget := HashMap.fromIter<Text, Types.Budget>((from.budgets).vals(), 0, Text.equal, Text.hash);
                var currentBudget = budgets.get(fiscalYear);

                transactions := HashMap.fromIter<Text, Types.Transaction>((from.transactions).vals(), 0, Text.equal, Text.hash);
                transactions.put(newTransactions.id, newTransactions);

                switch (currentBudget) {
                  case (?cbudget) {

                    let budget : Types.Budget = {
                      fiscalYear = fiscalYear;
                      totalAmt = cbudget.totalAmt;
                      remAmt = cbudget.remAmt - amount;
                      createdAt = cbudget.createdAt;
                    };

                    preBudget.put(budget.fiscalYear, budget);

                    let updatedFrom : Types.User = {
                      id = from.id;
                      username = from.username;
                      password = from.password;
                      name = from.name;
                      nid = from.nid;
                      czid = from.czid;
                      role = from.role;
                      balance = from.balance;
                      transactions = Iter.toArray(transactions.entries());
                      budgets = Iter.toArray(preBudget.entries());
                      properties = from.properties;
                      createdAt = from.createdAt;
                    };


                    let response : Response = {
                      to = updatedTo;
                      budget = budget;
                      transaction = newTransactions;
                      from = updatedFrom;
                    };

                    return ?response;
                  };

                  case (null) { null };
                };
              };
              case (null) {
                let newBudget : Types.Budget = {
                  fiscalYear = fiscalYear;
                  totalAmt = amount;
                  remAmt = amount;
                  createdAt = date;
                };

                preBudget.put(fiscalYear, newBudget);

                var transactions = HashMap.fromIter<Text, Types.Transaction>((too.transactions).vals(), 0, Text.equal, Text.hash);

                let newTransactions : Types.Transaction = {
                  id = await HashIt.hash(id);
                  from = from;
                  to = too;
                  amount = amount;
                  purpose = "Budget Allocation.";
                  date = date;
                };
                transactions.put(newTransactions.id, newTransactions);

                let updatedTo : Types.User = {
                  id = too.id;
                  username = too.username;
                  password = too.password;
                  name = too.name;
                  nid = too.nid;
                  czid = too.czid;
                  role = too.role;
                  balance = too.balance + amount;
                  transactions = Iter.toArray(transactions.entries());
                  budgets = Iter.toArray(preBudget.entries());
                  properties = too.properties;
                  createdAt = too.createdAt;
                };

                preBudget := HashMap.fromIter<Text, Types.Budget>((from.budgets).vals(), 0, Text.equal, Text.hash);
                var currentBudget = budgets.get(fiscalYear);

                transactions := HashMap.fromIter<Text, Types.Transaction>((from.transactions).vals(), 0, Text.equal, Text.hash);
                transactions.put(newTransactions.id, newTransactions);

                switch (currentBudget) {
                  case (?cbudget) {

                    let budget : Types.Budget = {
                      fiscalYear = fiscalYear;
                      totalAmt = cbudget.totalAmt;
                      remAmt = cbudget.remAmt - amount;
                      createdAt = cbudget.createdAt;
                    };

                    preBudget.put(budget.fiscalYear, budget);

                    let updatedFrom : Types.User = {
                      id = from.id;
                      username = from.username;
                      password = from.password;
                      name = from.name;
                      nid = from.nid;
                      czid = from.czid;
                      role = from.role;
                      balance = from.balance - amount;
                      transactions = Iter.toArray(transactions.entries());
                      budgets = Iter.toArray(preBudget.entries());
                      properties = from.properties;
                      createdAt = from.createdAt;
                    };


                    let response : Response = {
                      to = updatedTo;
                      budget = budget;
                      transaction = newTransactions;
                      from = updatedFrom;
                    };

                    return ?response;
                  };

                  case (null) { null };
                };
              };
            };

          };
          case (null) { null };
        };
      };
      case (null) { null };
    };
  };

  public type Res1 = {
    to : Types.User;
    from : Types.User;
    transaction : Types.Transaction;
  };

  public func budgetToProvince(users : Types.Users, to : Text, from : Text, amount : Int, purpose : Text, fiscalYear : Text, date : Text, id : Text) : async ?Res1 {
    switch (users.get(from)) {
      case (?lender) {
        switch (users.get(to)) {
          case (?borrower) {
            let lBudget = HashMap.fromIter<Text, Types.Budget>((lender.budgets).vals(), 0, Text.equal, Text.hash);

            let bBudget = HashMap.fromIter<Text, Types.Budget>((borrower.budgets).vals(), 0, Text.equal, Text.hash);

            let lTransactions = HashMap.fromIter<Text, Types.Transaction>((lender.transactions).vals(), 0, Text.equal, Text.hash);

            let bTransactions = HashMap.fromIter<Text, Types.Transaction>((borrower.transactions).vals(), 0, Text.equal, Text.hash);

            switch (lBudget.get(fiscalYear)) {
              case (?lBud) {
                switch (bBudget.get(fiscalYear)) {
                  case (?bBud) {
                    if (lBud.remAmt > amount) {
                      let newTransactions : Types.Transaction = {
                        id = await HashIt.hash(id);
                        from = lender;
                        to = borrower;
                        amount = amount;
                        purpose = purpose;
                        date = date;
                      };

                      lTransactions.put(newTransactions.id, newTransactions);

                      bTransactions.put(newTransactions.id, newTransactions);

                      let updatedLenderBudget : Types.Budget = {
                        fiscalYear = lBud.fiscalYear;
                        totalAmt = lBud.totalAmt;
                        remAmt = lBud.remAmt - amount;
                        createdAt = lBud.createdAt;
                      };

                      lBudget.put(fiscalYear, updatedLenderBudget);

                      let updatedBorrowerBudget : Types.Budget = {
                        fiscalYear = bBud.fiscalYear;
                        totalAmt = bBud.totalAmt;
                        remAmt = bBud.remAmt + amount;
                        createdAt = bBud.createdAt;
                      };
                      bBudget.put(fiscalYear, updatedBorrowerBudget);

                      let updatedLender : Types.User = {
                        id = lender.id;
                        username = lender.username;
                        password = lender.password;
                        name = lender.name;
                        nid = lender.nid;
                        czid = lender.czid;
                        role = lender.role;
                        balance = lender.balance - amount;
                        transactions = Iter.toArray(lTransactions.entries());
                        budgets = Iter.toArray(lBudget.entries());
                        properties = lender.properties;
                        createdAt = lender.createdAt;
                      };

                      let updatedBorrower : Types.User = {
                        id = borrower.id;
                        username = borrower.username;
                        password = borrower.password;
                        name = borrower.name;
                        nid = borrower.nid;
                        czid = borrower.czid;
                        role = borrower.role;
                        balance = borrower.balance + amount;
                        transactions = Iter.toArray(bTransactions.entries());
                        budgets = Iter.toArray(bBudget.entries());
                        properties = borrower.properties;
                        createdAt = borrower.createdAt;
                      };

                      let response : Res1 = {
                        to = updatedLender;
                        from = updatedBorrower;
                        transaction = newTransactions;
                      };
                      return ?response;
                    };
                    return null;
                  };
                  case (null) {

                    let newBudget : Types.Budget = {
                      fiscalYear = fiscalYear;
                      totalAmt = amount;
                      remAmt = amount;
                      createdAt = date;
                    };

                    bBudget.put(fiscalYear, newBudget);

                    if (lBud.remAmt > amount) {
                      let newTransactions : Types.Transaction = {
                        id = await HashIt.hash(id);
                        from = lender;
                        to = borrower;
                        amount = amount;
                        purpose = purpose;
                        date = date;
                      };

                      lTransactions.put(newTransactions.id, newTransactions);

                      bTransactions.put(newTransactions.id, newTransactions);

                      let updatedLenderBudget : Types.Budget = {
                        fiscalYear = lBud.fiscalYear;
                        totalAmt = lBud.totalAmt;
                        remAmt = lBud.remAmt - amount;
                        createdAt = lBud.createdAt;
                      };

                      lBudget.put(fiscalYear, updatedLenderBudget);

                      let updatedLender : Types.User = {
                        id = lender.id;
                        username = lender.username;
                        password = lender.password;
                        name = lender.name;
                        nid = lender.nid;
                        czid = lender.czid;
                        role = lender.role;
                        balance = lender.balance - amount;
                        transactions = Iter.toArray(lTransactions.entries());
                        budgets = Iter.toArray(lBudget.entries());
                        properties = lender.properties;
                        createdAt = lender.createdAt;
                      };

                      let updatedBorrower : Types.User = {
                        id = borrower.id;
                        username = borrower.username;
                        password = borrower.password;
                        name = borrower.name;
                        nid = borrower.nid;
                        czid = borrower.czid;
                        role = borrower.role;
                        balance = borrower.balance + amount;
                        transactions = Iter.toArray(bTransactions.entries());
                        budgets = Iter.toArray(bBudget.entries());
                        properties = borrower.properties;
                        createdAt = borrower.createdAt;
                      };

                      let response : Res1 = {
                        to = updatedLender;
                        from = updatedBorrower;
                        transaction = newTransactions;
                      };
                      return ?response;
                    };
                    return null;
                  };
                };
              };
              case (null) { null };
            };
          };
          case (null) { null };
        };
      };
      case (null) { null };
    };
  };
};
