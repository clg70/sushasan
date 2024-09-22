import HashMap "mo:base/HashMap";

module {
  public type Users = HashMap.HashMap<Text, User>;
  public type Budgets = HashMap.HashMap<Text, Budget>;
  public type Properties = HashMap.HashMap<Text, Property>;

  public type Property = {
    id : Text;
    regNo : Text;
    owner : User;
    valuation : Int;
    lat : Int;
    lon : Int;
    propertyType : Text;
    transactionReceipt : Text;
    createdAt : Text;
  };

  public type User = {
    id : Text;
    username : Text;
    password : Text;
    name : Text;
    nid : Text;
    czid : Text;
    role : Text;
    balance : Int;
    transactions : [(Text, Transaction)];
    budgets : [(Text, Budget)];
    properties: [(Text, Property)];
    createdAt : Text;
  };

  public type Transaction = {
    id : Text;
    from : User;
    to : User;
    amount : Int;
    purpose : Text;
    date : Text;
  };

  public type Budget = {
    fiscalYear : Text;
    totalAmt : Int;
    remAmt : Int;
    createdAt : Text;
  };
};
