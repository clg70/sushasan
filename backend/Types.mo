import HashMap "mo:base/HashMap";

module {
  public type Users = HashMap.HashMap<Text, User>;
  public type Budgets = HashMap.HashMap<Text, Budget>;
  public type User = {
    id : Text;
    username : Text;
    password : Text;
    name : Text;
    nid: Text;
    czid: Text;
    role : Text;
    balance : Nat;
    transactions : [(Text, Transaction)];
    budgets : [(Text, Budget)];
    createdAt : Text;
  };

  public type Transaction = {
    id : Text;
    from : User;
    to : User;
    amount : Nat;
    purpose: Text;
    date : Text;
  };

  public type Budget = {
    fiscalYear : Text;
    totalAmt : Nat;
    remAmt : Nat;
    createdAt : Text;
  };
};
