import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Types "Types";
import User "mods/User";
import Budget "mods/Budget";

actor class Backend() {
  let users = HashMap.HashMap<Text, Types.User>(0, Text.equal, Text.hash);
  let budgets = HashMap.HashMap<Text, Types.Budget>(0, Text.equal, Text.hash);
  let transactions = HashMap.HashMap<Text, Types.Transaction>(0, Text.equal, Text.hash);

  //Registering user
  public func register(username : Text, password : Text, name : Text, nid : Text, czid : Text, role : Text, createdAt : Text) : async Text {
    let newUser = await User.register(users, username, password, name, nid, czid, role, createdAt);
    users.put(newUser.id, newUser);
    return newUser.id;
  };

  //Login user
  public func login(username : Text, password : Text) : async Text {
    let response = await User.login(users, username, password);
    return response;
  };

  // Getting the user
  public func getUser(token : Text) : async ?Types.User {
    switch (await User.getUser(users, token)) {
      case (?value) {
        ?value;
      };
      case (null) {
        null;
      };
    };
  };

  //Budget Allocation
  public func addBudget(token : Text, fiscalYear : Text, totalAmt : Nat, createdAt : Text) : async Text {
    switch (await Budget.add(users, token, fiscalYear, totalAmt, createdAt)) {
      case (?response) {
        budgets.put(fiscalYear, response.budget);
        users.put((response.user).id, response.user);
        "200";
      };
      case (null) {
        "404";
      };
    };
  };

  //Get current Budget
  public func getCurrentBudget(year : Text) : async ?Types.Budget {
    switch (await Budget.getCurrentBdget(budgets, year)) {
      case (?value) { ?value };
      case (null) { null };
    };
  };

  //Allocate Budget
  public func allocateBudget(from : Text, to : Text, amount : Nat, fiscalYear : Text, date : Text, id : Text) : async ?Text {
    switch (await Budget.allocateBudget(budgets, users, from, to, amount, fiscalYear, date, id)) {
      case (?response) {

        budgets.put(fiscalYear, response.budget);
        users.put((response.to).id, response.to);
        users.put((response.from).id, response.from);
        transactions.put((response.transaction).id, response.transaction);

        return ?"200";
      };
      case (null) { null };
    };
  };

  //Geting all users
  public func getAllDepts() : async [(Text, Types.User)] {
    return Iter.toArray(users.entries());
  };

  //Performing Transactions
  public func perFormTransaction(from : Text, to : Text, amount : Nat, purpose : Text, fiscalYear : Text, date : Text, id : Text) : async ?Text {
    let response = await Budget.budgetToProvince(users, to, from, amount, purpose, fiscalYear, date, id);

    switch (response) {
      case (?value) {
        users.put((value.from).id, value.from);
        users.put((value.to).id, value.to);
        transactions.put((value.transaction).id, value.transaction);
        return ?"200";
      };
      case (null) { null };
    };
  };

};
